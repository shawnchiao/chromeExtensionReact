// @ts-nocheck
/// <reference types="chrome" />
/// <reference types="vite-plugin-svgr/client" />
import React, { useState, useEffect, useCallback } from "react";
import LogoButton from "./components/LogoButton";
import Modal from "./components/Modal";
import { v4 as uuidv4 } from "uuid";
import Dictionary from "./Dictionary/Dictionary";
import { getFullSentence } from "./utils/textHelpers";
import { useAuth } from "./hook/useAuth";
import { useFetchDicData } from "./hook/useFetchDicData";
import {refreshTokenHandler} from "./utils/refreshTokenHandler";
const Content = () => {
  // Auth related states
  const { user, isLoggedin, refreshToken, accessToken, expiresAt } = useAuth();
  // Text selection related states
  const [selectedText, setSelectedText] = useState("");
  const [contextSentence, setContextSentence] = useState("");
  // Logo button interaction related states
  const [buttonPosition, setButtonPosition] = useState({ x: 0, y: 0 });
  const [showButton, setShowButton] = useState(false);
  // Modal interaction related states
  const [modalPosition, setModalPosition] = useState({ x: 0, y: 0 });
  const [modals, setModals] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [draggedModalIndex, setDraggedModalIndex] = useState(null);
  // Data fetching related states
  const { dicData, fetchData, abortFetch, addDicData, removeDicData } =
    useFetchDicData(accessToken);


    function fetchDataWithToken(modalId, selectedText, contextSentence) {
      chrome.runtime.sendMessage({type:"CREATE_WINDOW"}, response => {
        setTimeout(() => {
          if (response && response.status === 'success') {
            console.log("time to refresh token", new Date());
            chrome.runtime.sendMessage({type: "REFRESH_TOKEN", refreshToken: refreshToken}, response => {
              if (response && response.status === 'success') {
                fetchData(modalId, selectedText, contextSentence);
                window.postMessage({
                  type: "syncAuthData",
                  accessToken: newAuthData.access_token,
                  refreshToken: newAuthData.refresh_token,
                  expiresAt: newAuthData.expiresAt,
                }, "http://localhost:3000");
              } else if (response) {
                console.error('Error fetching token:', response.error);
              }
            });
          } else if (response) {
            console.error('Error creating window:', response.error);
          }
        }, 100);
     
      });
    }
  




  const handleMouseUp = useCallback((event) => {
    if (
      event.target.id === "text-selection-button" ||
      event.target.id === "modal-header-lingofloat"
    ) {
      return;
    }
    const text = window.getSelection().toString().trim();
    const selection = window.getSelection().toString();
    console.log("text", text);
    console.log("selection", selection);

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
      removeDicData(modalId);
      abortFetch(modalId);
    },
    [abortFetch]
  );

  const handleButtonClick = useCallback(
    async (type) => {
      if (!isLoggedin) {
        chrome.runtime.sendMessage({
          action: "toLoginFromContent",
        });
        return;
      }

      const modalId = uuidv4();
      setShowButton(false);
      addDicData(modalId);
      const currentTime = Date.now();
      // console.log("check time", new Date(currentTime), new Date(expiresAt), currentTime > expiresAt);
      // console.log("expiresAt", expiresAt);
      if (/*currentTime >*/ expiresAt*1000) {
        fetchDataWithToken(modalId, selectedText, contextSentence);
      } else {
      fetchData(modalId, selectedText, contextSentence);
      }
      const initialX = modalPosition.x + 20; // offset from the logo button
      const initialY = Math.max(0, modalPosition.y - 170); // offset upward, but not beyond the top of the viewport

      // Ensure the modal does not open beyond the right edge of the screen
      const constrainedX = Math.min(initialX, window.innerWidth - 370); // Assuming the modal width is 370px
      const constrainedPosition = {
        x: constrainedX,
        y: initialY
      };

      if (type === "modal") {
        if (modals.length === 0) {
          setModals([{ id: modalId, position: constrainedPosition }]);
        } else {
          const lastModal = modals[modals.length - 1];
          const newModalPosition = {
            x: Math.min(lastModal.position.x + 370, window.innerWidth - 370),
            y: lastModal.position.y
          };
          setModals([...modals, { id: modalId, position: newModalPosition }]);
        }
      } else {
        setModals([{ id: modalId, position: constrainedPosition }]);
      }
    },
    [dicData, fetchData, modalPosition, modals, selectedText, contextSentence]
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
    <div style={{all:"initial"}}>
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
                ? {...JSON.parse(dicData[modal.id].content[0].text), audioData: dicData[modal.id].audioData}
                : null
            }
          />
        </Modal>
      ))}
    </div>
  );
};

export default Content;
