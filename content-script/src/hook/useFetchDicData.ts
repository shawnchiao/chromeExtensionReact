// @ts-nocheck

import { useState, useCallback } from "react";

export const useFetchDicData = (token) => {
  const [dicData, setDicData] = useState({});
  const [abortControllers, setAbortControllers] = useState({});

  const fetchData = useCallback(
    async (modalId, selectedText, contextSentence) => {
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
    [abortControllers, token]
  );

  const abortFetch = useCallback(
    (modalId) => {
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

  const removeDicData = useCallback((modalId) => {
    setDicData((prev) => {
      const newData = { ...prev };
      delete newData[modalId];
      return newData;
    });
  }, []);
  const addDicData = useCallback((modalId) => {
    setDicData((prev) => ({ ...prev, [modalId]: {} }));
  }, []);
  return { dicData, fetchData, abortFetch, addDicData, removeDicData };
};
