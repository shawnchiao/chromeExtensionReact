console.log("background.js");

const refreshTokenHandler = async (refreshToken) => {
  console.log("Attempt to refresh token"); // General log statement, avoid logging sensitive data
  try {
    const response = await fetch(
      "https://dev-5gdulzrjlzzfplri.us.auth0.com/oauth/token",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          grant_type: "refresh_token",
          client_id: "lSGPj0zEVKvepFST5aZPi0z0zbZGvlzR",
          refresh_token: refreshToken,
        }),
      }
    );

    if (!response.ok) {
      throw new Error(
        `HTTP error! Status: ${response.status} - ${response.statusText}`
      );
    }

    const data = await response.json();
    console.log("Token refreshed successfully", data);
    const expiresAt = Date.now() + data.expires_in * 1000 - 1000;

    return { ...data, expiresAt };
  } catch (error) {
    console.error("Failed to refresh token:", error);
  }
};

const addUsageHandler = async (lexicalItem, definition) => {
  try {
    const result = await new Promise((resolve, reject) => {
      chrome.storage.local.get('accessToken', (result) => {
        if (chrome.runtime.lastError) {
          reject(chrome.runtime.lastError);
        } else {
          resolve(result);
        }
      });
    });

    const response = await fetch(
      "https://5qspuywt86.execute-api.us-west-1.amazonaws.com/Prod/extension-add-usage",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${result.accessToken}`
        },
        body: JSON.stringify({
          lexicalItem,
          definition,
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;

  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

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

async function playSound(source) {
  await createOffscreen();
  await chrome.runtime.sendMessage({ play: { source } });
}

async function createOffscreen() {
  if (await chrome.offscreen.hasDocument()) return;
  await chrome.offscreen.createDocument({
    url: "offscreen.html",
    reasons: ["AUDIO_PLAYBACK"],
    justification: "testing",
  });
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log("message", message);
  if (message.action === "toLoginFromContent") {
    chrome.tabs.create({ url: "http://localhost:3000" });
    return;
  }
  if (message.type === "LOGIN") {
    chrome.storage.local.set(
      {
        isLoggedin: message.isLoggedin,
        accessToken: message.accessToken,
        refreshToken: message.refreshToken,
        user: message.user,
        expiresAt: message.expiresAt,
      },
      () => {
        // console.log("User is logged in. Token stored.", message.token);
        // console.log("User is logged in. User stored.", message.user);
        console.log("storage updated complete", message);
        chrome.storage.local.get(null, (result) => {
          console.log("Current storage state post-update:", result);
        });
      }
    );
  }

  if (message.type === "LOGOUT") {
    chrome.storage.local.set(
      {
        isLoggedin: message.isLoggedin,
        accessToken: message.accessToken,
        refreshToken: message.refreshToken,
        user: message.user,
        expiresAt: message.expiresAt,
      },
      () => {
        console.log("User is logged out. Token removed.", message.accessToken);
        console.log("User is logged out. Token removed.", message.refreshToken);
        console.log("User is logged out. User removed.", message.user);
      }
    );
  }

  if (message.type === "TOGGLE_TRANSLATE_MODE") {
    chrome.storage.local.set({ translateMode: message.translateMode }, () => {
      console.log("Translate mode toggled to", message.translateMode);
    });
  }
  if (message.type === "SELECT_LANGUAGE") {
    chrome.storage.local.set({ selectedLang: message.selectedLang }, () => {
      console.log("Selected language set to", message.selectedLang);
    });
  }
  if (message.type === "PLAY_AUDIO") {
    playSound(message.url);
  }
  // if (message.type === "TOUCH_BASE") {
  //   console.log("TOUCH_BASE")
  //   chrome.storage.local.get(null, (result) => {
  //     console.log("Current storage state post-update:", result);
  //   });
  // }
  //  if (message.type === "CREATE_WINDOW") {
  //   console.log("CREATE_WINDOW")
  //   chrome.windows.create({
  //     url: chrome.runtime.getURL("index.html"),
  //     type: "popup",
  //     width: 400,
  //     height: 400
  // });
  // sendResponse({status: 'success', detail: 'Window created.'});
  // return true;

  // }

  if (message.type === "REFRESH_TOKEN") {
    console.log("REFRESH_TOKEN");
    console.log("message.refreshToken", message.refreshToken);
    refreshTokenHandler(message.refreshToken).then((newAuthData) => {
      console.log("newAuthData", newAuthData);
      chrome.storage.local.set({
        accessToken: newAuthData.access_token,
        refreshToken: newAuthData.refresh_token,
        expiresAt: newAuthData.expiresAt,
      });
      sendResponse({
        status: "success",
        accessToken: newAuthData.access_token,
        refreshToken: newAuthData.refresh_token,
        expiresAt: newAuthData.expiresAt,
      });
    });
    return true;
  }

  
  if (message.type === "ADD_USAGE") {
    console.log("ADD_USAGE");
    startAnimation();
    addUsageHandler(message.lexicalItem, message.definition).then((result) => {
      console.log("result from addUsageHandler", result);
      stopAnimation();
    }).catch((error) => {
      console.error("Error:", error);
    }); 
    return true;
  }


});

const frames = [
  'images/logoT.png',
  'images/loading.png',
  'images/clock.png'
];

let currentFrame = 0;
let intervalId = null;

async function getImageData(url, size = 128) {
  const response = await fetch(chrome.runtime.getURL(url));
  const blob = await response.blob();
  const bitmap = await createImageBitmap(blob);
  const canvas = new OffscreenCanvas(size, size);
  const ctx = canvas.getContext('2d');
  ctx.drawImage(bitmap, 0, 0, size, size);
  return ctx.getImageData(0, 0, size, size);
}

async function updateIcon() {
  const framePath = frames[currentFrame];
  console.log('Attempting to set icon:', framePath);

  try {
    const imageData = await getImageData(framePath);
    chrome.action.setIcon({ imageData: imageData }, () => {
      if (chrome.runtime.lastError) {
        console.error('Error setting icon:', chrome.runtime.lastError.message);
        stopAnimation();
        return;
      }
      console.log('Icon set successfully:', framePath);
      currentFrame = (currentFrame + 1) % frames.length;
    });
  } catch (error) {
    console.error('Error processing image:', error);
    stopAnimation();
  }
}

function startAnimation() {
  if (intervalId === null) {
    console.log('Starting animation');
    intervalId = setInterval(updateIcon, 1000); // Change frame every 1 second
  }
}

async function stopAnimation() {
  if (intervalId !== null) {
    console.log('Stopping animation');
    clearInterval(intervalId);
    intervalId = null;
    const imageData = await getImageData(frames[0]);
    chrome.action.setIcon({ imageData: imageData });
  }
}
// Log available resources and their URLs
console.log('Available resources:', chrome.runtime.getManifest().web_accessible_resources);
frames.forEach(frame => {
  console.log(`URL for ${frame}:`, chrome.runtime.getURL(frame));
});

// Start animation immediately for testing
// startAnimation();

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'startFetching') {
    startAnimation();
  } else if (request.action === 'stopFetching') {
    stopAnimation();
  }
});

// Additional debugging
frames.forEach(frame => {
  fetch(chrome.runtime.getURL(frame))
    .then(response => {
      console.log(`${frame} exists:`, response.ok);
      if (response.ok) {
        return response.blob();
      } else {
        throw new Error(`Failed to fetch ${frame}`);
      }
    })
    .then(blob => {
      console.log(`${frame} size:`, blob.size);
      return createImageBitmap(blob);
    })
    .then(imageBitmap => {
      console.log(`${frame} dimensions:`, imageBitmap.width, 'x', imageBitmap.height);
    })
    .catch(error => console.error(`Error processing ${frame}:`, error));
});
