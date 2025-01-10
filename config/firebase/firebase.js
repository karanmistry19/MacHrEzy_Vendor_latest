import React from "react";
import firebase from "firebase/app";
import "firebase/messaging";
import { useState } from "react";

var firebaseConfig = {
  apiKey: "AIzaSyD7s5SDaoBhE8FFPLABGl0ee9gS2rbdO2I",
  authDomain: "macleod-a11aa.firebaseapp.com",
  databaseURL: "https://macleod-a11aa-default-rtdb.firebaseio.com",
  projectId: "macleod-a11aa",
  storageBucket: "macleod-a11aa.appspot.com",
  messagingSenderId: "1097918462719",
  appId: "1:1097918462719:web:0b1e1aec021cabb5d7eaca",
  measurementId: "G-ZFYYYPDXLE",
};

firebase.initializeApp(firebaseConfig);
var messaging;
if (firebase.messaging.isSupported()) {
  messaging = firebase.messaging();
}

export const onMessageListener = () =>
  new Promise((resolve) => {
    if (messaging) {
      messaging.onMessage((payload) => {
        resolve(payload);
      });
    } else {
      resolve();
    }
  });

export const getToken = async (setTokenFound) => {
  try {
    if (messaging) {
      const currentToken = await messaging.getToken({
        vapidKey:
          "BL-tPLDlIVG7Igg8pQLUdPS6AQ0tUKCLLnwPMp0hFOTKetZ8DV4KwY4HnwoaLne5SgwHv2rZrBid2pbGiXYrg68",
      });
      if (currentToken) {
        // console.log("current token for client: ", currentToken);
        setTokenFound(true);
        // Track the token -> client mapping, by sending to backend server
        // show on the UI that permission is secured
      } else {
        console.log(
          "No registration token available. Request permission to generate one.",
        );
        setTokenFound(false);
        // shows on the UI that permission is required
      }
    } else {
      console.log(
        "No registration token available. Request permission to generate one.",
      );
      setTokenFound(false);
    }
  } catch (err) {
    console.log("An error occurred while retrieving token. ", err);
  }
};

export const Firebase = () => {
  const [isTokenFound, setTokenFound] = useState(false);
  // getToken(setTokenFound);
  return <></>;
};
