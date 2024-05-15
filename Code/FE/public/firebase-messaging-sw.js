// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here. Other Firebase libraries
// are not available in the service worker.
importScripts("https://www.gstatic.com/firebasejs/8.2.9/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.2.9/firebase-messaging.js");

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
firebase.initializeApp({
  apiKey: "AIzaSyDHc89hy8sVBXJrbBnkZ3d9JQK9W5wr9-c",
  authDomain: "my-e-office.firebaseapp.com",
  databaseURL: "https://my-e-office.firebaseio.com",
  projectId: "my-e-office",
  storageBucket: "my-e-office.appspot.com",
  messagingSenderId: "624879123062",
  appId: "1:624879123062:controller:2d810a7f61e5bc0607fd57"
});

const messaging = firebase.messaging.isSupported() ? firebase.messaging() : null
const channel4Broadcast = new BroadcastChannel('channel4');

if (messaging){
  messaging.onBackgroundMessage(payload => {
    console.log(
      "[firebase-messaging-sw.js] Received background message ",
      payload
    );
    // Customize notification here
    const notificationTitle = "Background Message Title";
    const notificationOptions = {
      body: "Background Message bodydsa.",
      icon: "/firebase-logo.png"
    };
    channel4Broadcast.postMessage({
      type: `${payload.data.type}`,
      code: `${payload.data.code}`,
    });
    // self.registration.showNotification(notificationTitle, notificationOptions);

  });

}
