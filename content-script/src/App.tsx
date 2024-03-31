/// <reference types="chrome" />
/// <reference types="vite-plugin-svgr/client" />
// @ts-nocheck
import { useState, useEffect } from 'react';
function getFullSentence(selection) {
  var contextNode = window.getSelection().anchorNode.parentNode; // Get parent node
  console.log('contextNode', contextNode);
  var fullText = contextNode.textContent || contextNode.innerText; // Get full text of the node
  console.log('fullText', fullText);
  var regex = /(?<=\s|^)[^.!?]+(?:\.(?!\s)[^.!?]+)*(?:[.!?](?=\s|$)|$)/g

  var sentences = fullText.match(regex) || []; // Adjusted regex to split text into sentences
  console.log('sentences', sentences);
  for (var i = 0; i < sentences.length; i++) {
      if (sentences[i].includes(selection)) {
          return sentences[i].trim(); // Return the sentence containing the selection, trimmed
      }
  }
  return ''; // Return empty string if not found
}



const TextSelectionComponent = () => {
  const [selectedText, setSelectedText] = useState('');
  const [contextSentence, setContextSentence] = useState('');
  const [buttonPosition, setButtonPosition] = useState({ x: 0, y: 0 });
  const [showButton, setShowButton] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleMouseUp = (e) => {
    if (e.target.id === 'text-selection-button' || e.target.closest('#text-selection-modal')) {
      // Early return to avoid hiding the button when it's clicked or interacting with the modal
      return;
    }

    const text = window.getSelection().toString().trim();
    const selection = window.getSelection().toString();
    console.log('text', text);
    if (text && document.getElementById('text-selection-button') === null) {
      console.log("show button", showButton);
      console.log("I am here");
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
    setShowButton(false); // Hide button once the modal is triggered
  };

  useEffect(() => {
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  return (
    <>
      {showButton && (
        <button
          id="text-selection-button"
          className='logo-button '
          style={{
            backgroundImage: `url(${chrome.runtime.getURL('images/logoT.png')})`,
            position: 'absolute',
            left: `${buttonPosition.x+15}px`,
            top: `${buttonPosition.y+15}px`,
            zIndex: 2147483648,
          }}
          onClick={handleButtonClick}
        >
        </button>
      )}

      {showModal && (
        <div
          id="text-selection-modal"
          style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: 'white',
            padding: '20px',
            border: '1px solid black',
            zIndex: 2147483647,
          }}
        >
          <p>{selectedText}</p>
          <p>{contextSentence}</p>
          <button onClick={() => setShowModal(false)}>Close</button>
        </div>
      )}
    </>
  );
};

export default TextSelectionComponent;


