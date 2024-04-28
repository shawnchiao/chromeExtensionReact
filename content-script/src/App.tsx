/// <reference types="chrome" />
/// <reference types="vite-plugin-svgr/client" />
// @ts-nocheck
import React, { useState, useEffect, useRef, useCallback } from "react";
import LogoButton from "./components/LogoButton";
import Modal from "./components/Modal";
import { v4 as uuidv4 } from "uuid";
import Dictionary from "./Dictionary/Dictionary";
import { getFullSentence } from "./utils/textHelpers";
import { useAuth } from "./hook/useAuth";
const Content = () => {
  const { user, isLoggedIn, token } = useAuth();
  const [selectedText, setSelectedText] = useState("");
  const [contextSentence, setContextSentence] = useState("");
  const [buttonPosition, setButtonPosition] = useState({ x: 0, y: 0 });
  const [showButton, setShowButton] = useState(false);
  const [dicData, setDicData] = useState({});
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [modalPosition, setModalPosition] = useState({ x: 0, y: 0 });
  const [draggedModalIndex, setDraggedModalIndex] = useState(null);
  const [modals, setModals] = useState([]);
  const [abortControllers, setAbortControllers] = useState({});



  const fetchData = useCallback(
    async (modalId) => {
      const controller = new AbortController();
      const updatedControllers = { ...abortControllers, [modalId]: controller };
      setAbortControllers(updatedControllers);

      try {
        const response = await fetch(
          `https://5qspuywt86.execute-api.us-west-1.amazonaws.com/Prod/get-dic-data-for-extension`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              lexicalItem: selectedText,
              contextSentence: contextSentence,
              gptProvider: "anthropic",
              translateInto: "zh-TW",
            }),
            signal: controller.signal,
          }
        );
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        const data = await response.json();
        setDicData((oldData) => ({ ...oldData, [modalId]: data }));
      } catch (error) {
        if (error.name === "AbortError") {
          console.log("Fetch aborted");
        } else {
          console.error("Error fetching data", error);
        }
      }
    },
    [abortControllers, contextSentence, selectedText, token]
  );

  const handleMouseUp = useCallback((event) => {
    if (
      event.target.id === "text-selection-button" ||
      event.target.id === "modal-header-lingofloat"
    ) {
      return;
    }

    const text = window.getSelection().toString().trim();
    const selection = window.getSelection().toString();
    if (text) {
      setSelectedText(text);
      setContextSentence(getFullSentence(selection));
      const range = window.getSelection().getRangeAt(0);
      const rect = range.getBoundingClientRect();
      setButtonPosition({ x: rect.right, y: rect.top });
      setModalPosition({ x: rect.right + 20, y: rect.top - 170 });
      setShowButton(event.target.closest("#allowSelection") ? "modal" : true);
    } else {
      setShowButton(false);
    }
  }, []);

  const closeModal = useCallback(
    (modalId) => {
      console.log("clicking close button");
      setModals((prev) => prev.filter((modal) => modal.id !== modalId));
      setDicData((prev) => {
        const newData = { ...prev };
        delete newData[modalId];
        return newData;
      });
      if (abortControllers[modalId]) {
        abortControllers[modalId].abort();
      }
      setAbortControllers((prev) => {
        const newControllers = { ...prev };
        delete newControllers[modalId];
        return newControllers;
      });
    },
    [abortControllers]
  );

  const handleButtonClick = useCallback(
    (type) => {
      const modalId = uuidv4();
      setShowButton(false);
      setDicData({ ...dicData, [modalId]: {} });
      fetchData(modalId);

      if (type === "modal") {
        if (modals.length === 0) {
          setModals([{ id: modalId, position: modalPosition }]);
        } else {
          const lastModal = modals[modals.length - 1];
          const newModalPosition = {
            x: lastModal.position.x + 370,
            y: lastModal.position.y,
          };
          setModals([...modals, { id: modalId, position: newModalPosition }]);
        }
      } else {
        setModals([{ id: modalId, position: modalPosition }]);
      }
    },
    [dicData, fetchData, modalPosition, modals]
  );

  useEffect(() => {
    document.addEventListener("mouseup", handleMouseUp);
    return () => {
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [handleMouseUp]);

  const onDragStart = useCallback(
    (index, event) => {
      setIsDragging(true);
      setDraggedModalIndex(index);
      setDragStart({
        x: event.clientX - modals[index].position.x,
        y: event.clientY - modals[index].position.y,
      });
      event.preventDefault();
    },
    [modals]
  );

  const onDrag = useCallback(
    (event) => {
      if (!isDragging || draggedModalIndex === null) return;
      const newPosition = {
        x: event.clientX - dragStart.x,
        y: event.clientY - dragStart.y,
      };
      setModals((prevModals) => {
        const updatedModals = [...prevModals];
        updatedModals[draggedModalIndex] = {
          ...updatedModals[draggedModalIndex],
          position: newPosition,
        };
        return updatedModals;
      });
    },
    [dragStart, draggedModalIndex, isDragging]
  );

  const onDragEnd = useCallback(() => {
    setIsDragging(false);
    setDraggedModalIndex(null);
  }, []);

  useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", onDrag);
      document.addEventListener("mouseup", onDragEnd);
    }
    return () => {
      document.removeEventListener("mousemove", onDrag);
      document.removeEventListener("mouseup", onDragEnd);
    };
  }, [isDragging, onDrag, onDragEnd]);

  return (
    <>
      {showButton && (
        <LogoButton
          onClick={() => handleButtonClick(showButton)}
          position={buttonPosition}
        />
      )}

      {modals.map((modal, index) => (
        <Modal
          key={modal.id}
          modalId={modal.id}
          index={index}
          position={modal.position}
          onDragStart={onDragStart}
          closeModal={closeModal}
        >
          <Dictionary
            dicData={
              dicData[modal.id] &&
              dicData[modal.id].content &&
              dicData[modal.id].content[0]
                ? JSON.parse(dicData[modal.id].content[0].text)
                : null
            }
          />
        </Modal>
      ))}
    </>
  );
};

export default Content;