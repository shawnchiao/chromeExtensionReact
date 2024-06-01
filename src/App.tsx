/// <reference types="chrome" />
/// <reference types="vite-plugin-svgr/client" />
// @ts-nocheck
import { useEffect, useState } from "react";
import "./PopupComponent.css";
import LoginButton from "./LoginButton";
import Toggle from "./Toggle";
import Button from "./component/Button";
import Select from "./component/Select";
import "./App.css";
const PopupComponent = () => {
  const [isLoggedin, SetIsLoggedin] = useState(false);
  const [user, setUser] = useState(null);
  const [translateMode, setTranslateMode] = useState(false);
  const handleToggle = () => {
    setTranslateMode((prevMode) => !prevMode);
    chrome.runtime.sendMessage({
      type: "TOGGLE_TRANSLATE_MODE",
      translateMode: !translateMode,
    });
  };

  const refreshTokenHandler = async (refreshToken) => {
    console.log('Attempt to refresh token');  // General log statement, avoid logging sensitive data
    try {
      const response = await fetch('https://dev-5gdulzrjlzzfplri.us.auth0.com/oauth/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          grant_type: 'refresh_token',
          client_id: 'lSGPj0zEVKvepFST5aZPi0z0zbZGvlzR',  
          refresh_token: refreshToken
        }),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status} - ${response.statusText}`);
      }
  
      const data = await response.json();
      console.log('Token refreshed successfully', data);
      const expiresAt = Date.now() + data.expires_in * 1000 - 1000;
  
      return {...data, expiresAt};
    } catch (error) {
      console.error('Failed to refresh token:', error);
  
    }
  }

  useEffect(() => {
    const messageListener = (message, sender, sendResponse) => {
      console.log('Message received:', message);
  
      if (message.type === "REFRESH_TOKEN") {
        console.log("Handling token refresh");
        refreshTokenHandler(message.refreshToken).then(newAuthData => {
          if (newAuthData) {
            chrome.storage.local.set({
              accessToken: newAuthData.access_token,
              refreshToken: newAuthData.refresh_token,
              expiresAt: newAuthData.expiresAt
            }, () => {
              console.log('Token data updated in storage', newAuthData);
              sendResponse({status: 'success', detail: 'Token refreshed.'});
            });
          } else {
            sendResponse({status: 'error', detail: 'Failed to refresh token.'});
          }
        }).catch(error => {
          console.error('Error in refreshing token:', error);
          sendResponse({status: 'error', detail: error.message});
        });
        return true;  // Indicating that sendResponse will be called asynchronously
      }
    };
  
    chrome.runtime.onMessage.addListener(messageListener);
    return () => {
      chrome.runtime.onMessage.removeListener(messageListener);
    };
  }, [refreshTokenHandler]);  // Consider dependencies if necessary
  



  useEffect(() => {
    // Check if the authentication state is already stored in local storage
    chrome.storage.local.get(null, function (result) {
      console.log("result", result);
      console.log("time", new Date());
      SetIsLoggedin(result.isLoggedin);
      setTranslateMode(result.translateMode);
      setUser(result.user);
    });
  }, []);

  const handleLogout = () => {
    chrome.runtime.sendMessage({
      type: "LOGOUT",
      isLoggedin: false,
      user: null,
      token: null,
    });
    setUser(null);
    SetIsLoggedin(false);
  };
  console.log("isLoggedin", isLoggedin);
  return (
    <div className="popup-container">
      <header className="popup-header gap-2 text-base bg-[#8dc3b5] border-1  rounded-br-3xl text-[#fff6e9] font-cerebrisans font-bold border-[#e5ecec]">
        <img src="images/logoT.png" alt="Logo" className="w-[1.8rem]" />
        <p>Lingofloat</p>
        {/* <button className="settings-button">⚙️</button> */}
      </header>
      <div className="popup-content font-cerebrisans">
        {isLoggedin && (
          <section className="setup-section flex flex-col gap-2">
            <div className=" flex flex-col gap-1">
              <label>
                {translateMode ? "Enable translation" : "Diable translation"}
              </label>
              <Toggle translateMode={translateMode} onToggle={handleToggle} />
            </div>
            <div
              className={`select-animation flex flex-col gap-1 ${
                translateMode ? "show" : "hide"
              }`}
            >
              <label htmlFor="language-select">
                Translate selected text into
              </label>
              {translateMode && <Select />}
            </div>
          </section>
        )}
        <section>
          <p>
            As a Pro user, you can translate full pages with a single click.
          </p>

          {isLoggedin ? (
            <Button text="Log out" onClick={handleLogout} />
          ) : (
            <Button
              text="Log in"
              onClick={() =>
                chrome.tabs.create({ url: "http://localhost:3000" })
              }
            />
          )}

          <p>{isLoggedin ? "has logged in" : "no logged in yet"}</p>
          <p>
            Not a Pro user yet?{" "}
            <a href="/register" className="try-for-free-link">
              Try it for free
            </a>
          </p>
        </section>
      </div>
    </div>
  );
};

export default PopupComponent;
