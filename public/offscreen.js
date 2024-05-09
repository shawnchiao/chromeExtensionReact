console.log("offscreen.js loaded");

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if ('play' in msg) {
    console.log('play', msg.play); 
      playAudio(msg.play);
      sendResponse(true);
  }
  return true;
});

// Play sound with access to DOM APIs
function playAudio({ source}) {
  const audio = new Audio(source);
  audio.play();
}