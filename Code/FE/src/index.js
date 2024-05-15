import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import firebase from "firebase/app";
import "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyDHc89hy8sVBXJrbBnkZ3d9JQK9W5wr9-c",
  authDomain: "my-e-office.firebaseapp.com",
  databaseURL: "https://my-e-office.firebaseio.com",
  projectId: "my-e-office",
  storageBucket: "my-e-office.appspot.com",
  messagingSenderId: "624879123062",
  appId: "1:624879123062:web:2d810a7f61e5bc0607fd57",
};

firebase.initializeApp(firebaseConfig);

ReactDOM.render(<App />, document.getElementById("root"));
