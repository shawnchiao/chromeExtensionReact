// @ts-nocheck
import { useState, useEffect } from "react";

export const useAuth = () => {
  const [user, setUser] = useState();
  const [isLoggedin, setIsLoggedin] = useState(false);
  const [accessToken, setAccessToken] = useState();
  const [refreshToken, setRefreshToken] = useState();
  const [expiresAt, setExpiresAt] = useState();






  useEffect(() => {
    const handleMessage = (event) => {
      if (event.origin !== "http://localhost:3000") return;

      if (event.data.type === "Auth0Login") {
        chrome.runtime.sendMessage({
          type: "LOGIN",
          isLoggedin: event.data.user && true,
          accessToken: event.data.accessToken,
          refreshToken: event.data.refreshToken,
          expiresAt: event.data.expiresAt,
          user: event.data.user,
        });
      }

      if (event.data.type === "touchBase") {
        chrome.storage.local.get(null, (result) => {
          window.postMessage({
            type: "syncAuthData",
            accessToken: result.accessToken,
            refreshToken: result.refreshToken,
            expiresAt: result.expiresAt,
          }, "http://localhost:3000");
        });
      }
    };
    

    window.addEventListener("message", handleMessage);
    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, []);

  useEffect(() => {
    const fetchStorageData = () => {
      chrome.storage.local.get(null, (result) => {
        setIsLoggedin(result.isLoggedin);
        setUser(result.user);
        setAccessToken(result.accessToken);
        setRefreshToken(result.refreshToken);
        setExpiresAt(result.expiresAt);
      });
    };

    const handleStorageChange = (changes, areaName) => {
      console.log("All storage changes:", changes);
      if (areaName === "local") {
        if (changes.isLoggedin) {
          setIsLoggedin(changes.isLoggedin.newValue);
        }
        if (changes.user) {
          setUser(changes.user.newValue);
        }
        if (changes.accessToken) {
          setAccessToken(changes.accessToken.newValue);
        }
        if (changes.refreshToken) {
          setRefreshToken(changes.refreshToken.newValue);
        }
        if (changes.expiresAt) {
          setExpiresAt(changes.expiresAt.newValue);
        }
      }
    };

    fetchStorageData();
    chrome.storage.onChanged.addListener(handleStorageChange);

    return () => {
      chrome.storage.onChanged.removeListener(handleStorageChange);
    };
  }, []);

  return { user, isLoggedin, accessToken, refreshToken, expiresAt };
};