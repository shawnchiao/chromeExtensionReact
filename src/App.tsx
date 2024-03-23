/// <reference types="chrome" />
/// <reference types="vite-plugin-svgr/client" />

import React from 'react';
import './PopupComponent.css';

const PopupComponent = () => {
  return (
    <div className="popup-container">
      <header className="popup-header">
        <img src="logo.png" alt="Logo" className="logo" />
        <button className="settings-button">⚙️</button>
      </header>
      <div className="popup-content">
        <section className="pro-section">
          <p>As a Pro user, you can translate full pages with a single click.</p>
          <button className="login-button">Log in</button>
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
