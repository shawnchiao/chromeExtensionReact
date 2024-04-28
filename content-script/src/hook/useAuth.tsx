// @ts-nocheck
import { useState, useEffect } from "react";

export const useAuth = () => {
  const [user, setUser] = useState();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState();

  useEffect(() => {
    const handleMessage = (event) => {
      if (event.origin !== "http://localhost:3000") return;

      if (event.data.type === "Auth0Login") {
        chrome.runtime.sendMessage({
          type: "LOGIN",
          isLoggedIn: event.data.user && true,
          token: event.data.token,
          user: event.data.user,
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
        setIsLoggedIn(result.isLoggedIn);
        setUser(result.user);
        setToken(result.token);
      });
    };

    const handleStorageChange = (changes, areaName) => {
      if (areaName === "local") {
        if (changes.isLoggedIn) {
          setIsLoggedIn(changes.isLoggedIn.newValue);
        }
        if (changes.user) {
          setUser(changes.user.newValue);
        }
        if (changes.token) {
          setToken(changes.token.newValue);
        }
      }
    };

    fetchStorageData();
    chrome.storage.onChanged.addListener(handleStorageChange);

    return () => {
      chrome.storage.onChanged.removeListener(handleStorageChange);
    };
  }, []);

  return { user, isLoggedIn, token };
};

