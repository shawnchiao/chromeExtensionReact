/// <reference types="chrome" />
/// <reference types="vite-plugin-svgr/client" />
import { useEffect, useState } from 'react';
import './PopupComponent.css';
import LoginButton from './LoginButton';

const PopupComponent = () => {
  const [isLoggedin, SetIsLoggedin] = useState(false);
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    // Check if the authentication state is already stored in local storage
    chrome.storage.local.get(null, function(result) {
      console.log('result', result);  
 
        SetIsLoggedin(result.isLoggedin);
        setUser(result.user);

    });
  }, []);

 

  const handleLogout = () => {
    chrome.runtime.sendMessage({ type: 'LOGOUT', isLoggedin: false, user: null, token: null});
    setUser(null);
    SetIsLoggedin(false);
  };


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
          <p>{isLoggedin? "has logged in": "no logged in yet"}</p>
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




