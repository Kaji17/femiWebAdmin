// Scripts for firebase and firebase messaging
importScripts(
  "https://www.gstatic.com/firebasejs/9.20.0/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/9.20.0/firebase-messaging-compat.js"
);

// Initialize the Firebase app in the service worker by passing the generated config
const firebaseConfig = {
  apiKey: "AIzaSyCZFQ-Dk8fdgQjgzIj1vJeei5_X5e-5jRw",
  authDomain: "klaman-fb7ba.firebaseapp.com",
  projectId: "klaman-fb7ba",
  storageBucket: "klaman-fb7ba.appspot.com",
  messagingSenderId: "432746665467",
  appId: "1:432746665467:web:a042854a51ebb84ae2675e",
  measurementId: "G-S08LQR8DS4"
};

firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  console.log("Received background message", payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.icon,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("/firebase-messaging-sw.js", {
      scope: "/",
    })
    .then(function (registration) {
      console.log("Service worker registered:", registration);
    })
    .catch(function (error) {
      console.error("Service worker registration failed:", error);
    });
}
