console.log('background.js');


// chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {

//     // if (message.type === 'AUTH_STATE_CHANGED') {
//     //     console.log('AUTH_STATE_CHANGED', message);
//     //   return true;
//     // }
    

//     if (message.type === 'AUTH_STATE_CHANGED') {
//         // Update the authentication state in chrome.storage.local
//         console.log('AUTH_STATE_CHANGED message', message);
//         chrome.storage.local.set({ isAuthenticated: message.isAuthenticated, user: message.user }, () => {
//           console.log('Authentication state updated in local storage with: ', message.isAuthenticated);
    
//           // Optionally, send a response back to the sender if needed
//           sendResponse({ status: 'success', detail: 'Authentication state updated.' });
    
  
//         });
    
//         // To allow asynchronous use of sendResponse, return true from the event listener.
//       }



//   });

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log('message', message);
  if (message.action === "toLoginFromContent") {
    chrome.tabs.create({url: 'http://localhost:3000'});
    return
  }
  if (message.type === "LOGIN") {
    chrome.storage.local.set({isLoggedin: message.isLoggedin, token: message.token, user: message.user}, () => {
      // console.log("User is logged in. Token stored.", message.token);
      // console.log("User is logged in. User stored.", message.user);
      console.log("storage updated complete", message);
      chrome.storage.local.get(null, (result) => {
        console.log("Current storage state post-update:", result);
      });
    });
  }

  if (message.type === "LOGOUT") {
    chrome.storage.local.set({isLoggedin: message.isLoggedin, token: message.token, user: message.user}, () => {
      console.log("User is logged out. Token removed.", message.token);
      console.log("User is logged out. User removed.", message.user);
    });
  }

  if (message.type === "TOGGLE_TRANSLATE_MODE") {
    chrome.storage.local.set({translateMode: message.translateMode}, () => {
      console.log("Translate mode toggled to", message.translateMode);
    });
  }
  if (message.type === "SELECT_LANGUAGE") {
    chrome.storage.local.set({selectedLang: message.selectedLang}, () => {
      console.log("Selected language set to", message.selectedLang);
    });
  }
});