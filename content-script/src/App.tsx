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
  const [dicData, setDicData] = useState({});
  const modalRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

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

  const fetchData = async () => {
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
        }
      );
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      const data = await response.json();
      console.log("data from server", data);
      setDicData(data);
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };

  const handleMouseUp = (e) => {
    if (e.target.id === 'text-selection-button' || e.target.closest('#text-selection-modal')) {
      return;
    }

    const text = window.getSelection().toString().trim();
    const selection = window.getSelection().toString();
    if (text && document.getElementById('text-selection-button') === null) {
      setSelectedText(text);
      setContextSentence(getFullSentence(selection));
      setButtonPosition({ x: e.pageX, y: e.pageY });
      setShowButton(true);
    } else {
      setShowButton(false);
    }
  };

  const handleButtonClick = () => {
    setShowModal(true);
    setShowButton(false);
    fetchData();
  };

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
          className='logo-button'
          style={{
            backgroundImage: `url(${chrome.runtime.getURL('images/logoT.png')})`,
            position: 'absolute',
            left: `${buttonPosition.x + 15}px`,
            top: `${buttonPosition.y + 15}px`,
            zIndex: 2147483648,
          }}
          onClick={handleButtonClick}
        ></button>
      )}

      {showModal && (
        <div
          id="text-selection-modal"
          ref={modalRef}
          onMouseDown={onDragStart}
          style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: 'white',
            // padding: '20px',
            zIndex: 2147483647,
            cursor: 'move',
            maxWidth: '350px', 
            width: '30%', 
            minWidth: '280px', 
            maxHeight: '50vh', 
            overflow: 'auto', 
            border: "5px dashed #d1d1d1",
            borderRadius: "15px",
          }}
        >
          {/* <Test dicData={dicData && dicData.content && dicData.content[0] && JSON.parse(dicData.content[0].text)}/> */}
          <Dictionary dicData={dicData && dicData.content && dicData.content[0] ? JSON.parse(dicData.content[0].text): null} />
          {/* <ReactMarkdown
             components={{
              blockquote: ({node, ...props}) => <blockquote className="blockquoteStyle" {...props} />,
              li: ({node, ...props}) => <li className="liStyle" {...props} />,
            }}
            remarkPlugins={[gfm]}>{dicData && dicData.content && dicData.content[0] ? dicData.content[0].text : "loading..."}</ReactMarkdown> */}
          <button onClick={() => setShowModal(false)}>Close</button>
        </div>
      )}
    </>
  );
};

export default Content;
