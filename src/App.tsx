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
  useEffect(() => {
    // Check if the authentication state is already stored in local storage
    chrome.storage.local.get(null, function (result) {
      console.log("result", result);
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
      <header className="popup-header gap-2 font-semibold text-base bg-[#e48004] border-1  rounded-br-3xl text-white font-roboto border-[#e5ecec]">
        <img src="images/logoT.png" alt="Logo" className="w-[1.8rem]" />
        <p>Lingofloat</p>
        {/* <button className="settings-button">⚙️</button> */}
      </header>
      <div className="popup-content">
        {isLoggedin && (
          <section className="setup-section flex flex-col gap-2">
            <div className=" flex flex-col gap-1">
              <label>
                {translateMode ? "Enable translation" : "Diable translation"}
              </label>
              <Toggle translateMode={translateMode} onToggle={handleToggle} />
            </div>
            <div
              className={`select-animation flex flex-col gap-1 ${translateMode ? "show" : "hide"}`}
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
            <Button text="Log in"  onClick={()=>chrome.tabs.create({url: 'http://localhost:3000'})} />
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
