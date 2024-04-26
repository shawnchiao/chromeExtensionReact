/// <reference types="chrome" />
/// <reference types="vite-plugin-svgr/client" />
// @ts-nocheck
import { useState, useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';
import './App.css';
import Test from './Test';
import Dictionary from './Dictionary/Dictionary';

function getFullSentence(selection) {
  var contextNode = window.getSelection().anchorNode.parentNode;
  console.log('contextNode', contextNode);
  var fullText = contextNode.textContent || contextNode.innerText;
  // console.log('fullText', fullText);
  var regex = /(?<=\s|^)[^.!?]+(?:\.(?!\s)[^.!?]+)*(?:[.!?](?=\s|$)|$)/g

  var sentences = fullText.match(regex) || [];
  console.log('sentences', sentences);
  for (var i = 0; i < sentences.length; i++) {
    if (sentences[i].includes(selection.trim())) {
      return sentences[i].trim();
    }
  }
  return selection.trim();
}

const Content = () => {
  const [user, setUser] = useState();
  const [isLoggedin, setIsLoggedin] = useState(false);
  const [token, setToken] = useState();
  const [selectedText, setSelectedText] = useState('');
  const [contextSentence, setContextSentence] = useState('');
  const [buttonPosition, setButtonPosition] = useState({ x: 0, y: 0 });
  const [showButton, setShowButton] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [dicData, setDicData] = useState([]);
  const modalRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [modalPosition, setModalPosition] = useState({ x: 0, y: 0 });
  const [modals, setModals] = useState([]);
  

  useEffect(() => {
    const handleMessage = (event) => {
      console.log('event in listener', event);
      if (event.origin !== "http://localhost:3000") return;

      if (event.data.type === "Auth0Login") {
        console.log("getting token", event.data.token)
        chrome.runtime.sendMessage({ type: "LOGIN", isLoggedin: event.data.user && true, token: event.data.token, user: event.data.user });
      }
    };

    window.addEventListener("message", handleMessage);
    console.log('adding listener');
    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, []);

  useEffect(() => {
    chrome.storage.local.get(null, function (result) {
      console.log('result in content', result);
      setIsLoggedin(result.isLoggedin);
      setUser(result.user);
      setToken(result.token);
    });
    const handleStorageChange = (changes, areaName) => {
      if (areaName === 'local' && changes.isLoggedin) {
        setIsLoggedin(changes.isLoggedin.newValue);
      }
      if (areaName === 'local' && changes.user) {
        setUser(changes.user.newValue);
      }
      if (areaName === 'local' && changes.token) {
        setToken(changes.token.newValue);
      }
    };
    chrome.storage.onChanged.addListener(handleStorageChange);

    return () => {
      chrome.storage.onChanged.removeListener(handleStorageChange);
    };
  }, []);

  const fetchData = async (index) => {
    try {
      const response = await fetch(`https://5qspuywt86.execute-api.us-west-1.amazonaws.com/Prod/get-dic-data-for-extension`, {
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
      });
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      const data = await response.json();
      console.log("data from server", data);
      // Set data for the specific modal index
      setDicData(oldData => {
        const newData = [...oldData];
        newData[index] = data;
        return newData;
      });
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };
  

  const handleMouseUp = (e) => {
    if (e.target.id === 'text-selection-button') {
      return;
    }

    const modalClicked = modalRef.current && modalRef.current.contains(e.target);
    if (modalClicked && !e.target.closest('#allowSelection')) {
      return;
    }
    if (modalClicked && e.target.closest('#allowSelection')) {
      const text = window.getSelection().toString().trim();
      const selection = window.getSelection().toString();
      if (text) {
        setSelectedText(text);
        setContextSentence(getFullSentence(selection));
        console.log("IM here >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>")
        // Get the bounding rectangle of the selected text
        const range = window.getSelection().getRangeAt(0);
        const rect = range.getBoundingClientRect();
        setButtonPosition({ x: rect.right, y: rect.top });
        setModalPosition({ x: rect.right + 20, y: rect.top - 170 });
        setShowButton("modal");

      } else {
        setShowButton(false);
      }
      return;
    }

    const text = window.getSelection().toString().trim();
    const selection = window.getSelection().toString();
    if (text) {
      setSelectedText(text);
      setContextSentence(getFullSentence(selection));

      // Get the bounding rectangle of the selected text
      const range = window.getSelection().getRangeAt(0);
      const rect = range.getBoundingClientRect();
      setButtonPosition({ x: rect.right, y: rect.top });
      setModalPosition({ x: rect.right + 20, y: rect.top - 170 });
      setShowButton(true);
      
    } else {
      setShowButton(false);
    }
  };

  // const handleButtonClick = (fromInsideModal = false) => {
  //   setShowButton(false);
  //   if (!fromInsideModal) {
  //     const newModalPosition = { x: modalPosition.x + 370, y: modalPosition.y };
  //     setModals([...modals, { position: newModalPosition }]);
  //     setDicData([...dicData, {}]); // Initialize new dicData entry
  //     fetchData(modals.length); // Fetch data for new modal at the end of the list
  //   } else {
  //     // Clear all existing data and set for the first modal
  //     setDicData([{}]);
  //     fetchData(0);
  //     setModals([{ position: modalPosition }]);
  //   }
  // };
  
  const handleButtonClick = (type) => {
    console.log("type", type)
    setShowButton(false);
    if (type === "modal") {
    setDicData([...dicData, {}])
    fetchData(modals.length)

    if (modals.length === 0) {
      setModals([{ position: modalPosition }]);
    } else {
      const lastModal = modals[modals.length - 1];
      const newModalPosition = {
        x: lastModal.position.x + 370,
        y: lastModal.position.y,
      };
      setModals([...modals, { position: newModalPosition }]);
    }
  } else {
    setDicData([{}]);
    fetchData(0);
    setModals([{ position: modalPosition }]);
  };
  }

  useEffect(() => {
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  const onDragStart = (e) => {
    setIsDragging(true);
    setDragStart({
      x: e.clientX - modalRef.current.offsetLeft,
      y: e.clientY - modalRef.current.offsetTop,
    });
    e.preventDefault();
  };

  const onDrag = (e) => {
    if (!isDragging) return;
    modalRef.current.style.left = `${e.clientX - dragStart.x}px`;
    modalRef.current.style.top = `${e.clientY - dragStart.y}px`;
  };

  const onDragEnd = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', onDrag);
      document.addEventListener('mouseup', onDragEnd);
    }

    return () => {
      document.removeEventListener('mousemove', onDrag);
      document.removeEventListener('mouseup', onDragEnd);
    };
  }, [isDragging, onDrag, onDragEnd]);
   console.log("selectedText", selectedText)
   console.log("contextSentence", contextSentence)
  return (
       <>
      {showButton && (
        <button
          id="text-selection-button"
          className="logo-button"
          style={{
            backgroundImage: `url(${chrome.runtime.getURL('images/logoT.png')})`,
            position: 'fixed',
            left: buttonPosition.x,
            top: buttonPosition.y,
            zIndex: 2147483648,
          }}
          onClick={()=>handleButtonClick(showButton)}
        ></button>
      )}

      {modals.map((modal, index) => (
        <div
          key={index}
          id={`text-selection-modal-${index}`}
          ref={modalRef}
          style={{
            position: 'fixed',
            top: modal.position.y,
            left: modal.position.x,
            backgroundColor: 'white',
            zIndex: 2147483646,
            cursor: 'default',
            maxWidth: '350px',
            width: '30%',
            minWidth: '280px',
            maxHeight: '50vh',
            overflow: 'auto',
            border: "5px solid #d1d1d1",
            borderRadius: "15px",
            fontFamily: `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif`,
          }}
        >
          <div
            style={{
              position: 'sticky',
              top: 0,
              width: '100%',
              height: '30px',
              borderRadius: '10px 0',
              backgroundColor: "rgb(209 209 209)",
              borderBottom: '1px solid #d1d1d1',
              display: 'flex',
              justifyContent: 'flex-end',
              alignItems: 'center',
              paddingRight: '10px',
              zIndex: 2147483649,
              cursor: 'move',
            }}
            onMouseDown={onDragStart}
          >
            <button
              style={{
                marginRight: '5px',
                padding: '2px 5px',
                fontSize: '15px',
                fontWeight: '900',
                border: 'none',
                backgroundColor: 'black',
                color: 'white',
                borderRadius: '20px',
                cursor: 'pointer',
              }}
              onClick={() => {
                const newModals = [...modals];
                newModals.splice(index, 1);
                setModals(newModals);
              }}
            >
              X
            </button>
          </div>

          {/* Content of the modal */}
          <Dictionary dicData={dicData[index] && dicData[index].content && dicData[index].content[0] ? JSON.parse(dicData[index].content[0].text) : null} />
        </div>
      ))}
    </>
  );
};

export default Content;
