/// <reference types="chrome" />
/// <reference types="vite-plugin-svgr/client" />
import { useEffect, useState } from 'react';
import './PopupComponent.css';
import LoginButton from './LoginButton';
import { useAuth0 } from "@auth0/auth0-react"
const PopupComponent = () => {
  const { isAuthenticated, isLoading, user, logout } = useAuth0();
  const [localAuthState, setLocalAuthState] = useState(false);
  
  useEffect(() => {
    // Check if the authentication state is already stored in local storage
    chrome.storage.local.get(['isAuthenticated'], function(result) {
      if (result.isAuthenticated !== undefined) {
        // console.log('Auth state is retrieved from local storage.');
        // console.log("user is: ", user);
        // console.log("local is: ", result.isAuthenticated);
        setLocalAuthState(result.isAuthenticated);
        chrome.runtime.sendMessage({ type: 'AUTH_STATE_CHANGED', isAuthenticated:result.isAuthenticated });
      } else {
        // If not stored, set the initial value from isAuthenticated
        console.log('Auth state is not stored in local storage.');
        setLocalAuthState(isAuthenticated);
        chrome.runtime.sendMessage({ type: 'AUTH_STATE_CHANGED', isAuthenticated});
      }
    });
  }, []);

  useEffect(() => {
    // Update the localAuthState and local storage when isAuthenticated changes
    setLocalAuthState(isAuthenticated);

    chrome.runtime.sendMessage({ type: 'AUTH_STATE_CHANGED', isAuthenticated });
  }, [isAuthenticated]);

  const handleLogout = () => {
    // Set the localAuthState to false before calling the logout function
    setLocalAuthState(false);
    logout({ logoutParams: { returnTo: window.location.origin + "/index.html" } });
    chrome.runtime.sendMessage({ type: 'AUTH_STATE_CHANGED', isAuthenticated: false});
  };

  console.log("localAuthState is: ", localAuthState);
  return (
    <div className="popup-container">
      <header className="popup-header">
        <img src="logo.png" alt="Logo" className="logo" />
        <button className="settings-button">⚙️</button>
      </header>
      <div className="popup-content">
        <section className="pro-section">
          <p>As a Pro user, you can translate full pages with a single click.</p>
          <LoginButton />
          <button onClick={handleLogout}>Log out</button>
          <p>{localAuthState? "has logged in": "no logged in yet"}</p>
          <p>Not a Pro user yet? <a href="/register" className="try-for-free-link">Try it for free</a></p>
        </section>
        <section className="setup-section">
          <div className="setup-buttons">
            <button className="reading-button active">Reading</button>
            <button className="writing-button">Writing</button>
          </div>
          <div className="translation-section">
            <label htmlFor="language-select">Translate selected text into</label>
            <select id="language-select" className="language-select">
              <option value="fr">French</option>
              {/* Add more options here */}
            </select>
          </div>
          <ul className="instructions-list">
            <li>Click the DeepL icon</li>
            <li>Click right on your mouse</li>
            <li>Use shortcut <kbd>⇧</kbd> + <kbd>⌘</kbd> + <kbd>Y</kbd></li>
          </ul>
          <a href="/customize-shortcut" className="customize-shortcut-link">Customize shortcut</a>
        </section>
      </div>
    </div>
  );
}

export default PopupComponent;




