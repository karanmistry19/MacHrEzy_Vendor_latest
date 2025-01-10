importScripts("https://www.gstatic.com/firebasejs/8.6.3/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.6.3/firebase-messaging.js");

firebase.initializeApp({
  apiKey: "AIzaSyD7s5SDaoBhE8FFPLABGl0ee9gS2rbdO2I",
  authDomain: "macleod-a11aa.firebaseapp.com",
  databaseURL: "https://macleod-a11aa-default-rtdb.firebaseio.com",
  projectId: "macleod-a11aa",
  storageBucket: "macleod-a11aa.appspot.com",
  messagingSenderId: "1097918462719",
  appId: "1:1097918462719:web:0b1e1aec021cabb5d7eaca",
  measurementId: "G-ZFYYYPDXLE",
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.clients
    .matchAll({
      includeUncontrolled: true,
      type: "window",
    })
    .then((clients) => {
      if (clients && clients.length) {
        clients[0].postMessage(payload);
      }
    });

  self.registration.showNotification(notificationTitle, notificationOptions);
});
