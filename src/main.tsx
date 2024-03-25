import React from "react";
import { createRoot } from "react-dom/client";
import { Auth0Provider } from "@auth0/auth0-react";
import "./main.css";
import App from "./App";

createRoot(document.getElementById("root")!).render(
  <Auth0Provider
    domain="dev-5gdulzrjlzzfplri.us.auth0.com"
    clientId="aLXzwjikF8Us0fMRuKKsfVHINYsnah2a"
    authorizationParams={{
      redirect_uri: window.location.origin,
    }}
  >
    <App />
  </Auth0Provider>
);
