console.log('background.js');


chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {

    // if (message.type === 'AUTH_STATE_CHANGED') {
    //     console.log('AUTH_STATE_CHANGED', message);
    //   return true;
    // }

    if (message.type === 'AUTH_STATE_CHANGED') {
        // Update the authentication state in chrome.storage.local
        chrome.storage.local.set({ isAuthenticated: message.isAuthenticated }, () => {
          console.log('Authentication state updated in local storage with: ', message.isAuthenticated);
    
          // Optionally, send a response back to the sender if needed
          sendResponse({ status: 'success', detail: 'Authentication state updated.' });
    
  
        });
    
        // To allow asynchronous use of sendResponse, return true from the event listener.
      }



  });