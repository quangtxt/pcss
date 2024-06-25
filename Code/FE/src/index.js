import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import firebase from "firebase/app";
import "firebase/messaging";
import { GoogleOAuthProvider } from "@react-oauth/google";
import "./index.css";

ReactDOM.render(
  <GoogleOAuthProvider clientId="634327805090-o7btu0kj16e1o10cqmki66ijvq3t2e15.apps.googleusercontent.com">
    <App />
  </GoogleOAuthProvider>,
  document.getElementById("root")
);
