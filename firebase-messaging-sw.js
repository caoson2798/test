/* firebase-messaging-sw.js */
importScripts("https://www.gstatic.com/firebasejs/10.12.5/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.12.5/firebase-messaging-compat.js");

// ✅ dùng đúng config firebase của m
firebase.initializeApp({
  apiKey: "AIzaSyD6KpR4WVafZuMt5Xz3gbxZ8pMEaBClJzE",
  authDomain: "app-map-35d16.firebaseapp.com",
  projectId: "app-map-35d16",
  storageBucket: "app-map-35d16.firebasestorage.app",
  messagingSenderId: "983110991757",
  appId: "1:983110991757:web:ebd820dfaa148f96c407c4",
  measurementId: "G-61CH1RKWDH"
});

const messaging = firebase.messaging();

// ✅ Nhận noti khi app đóng / background
messaging.onBackgroundMessage((payload) => {
  const n = payload?.notification || {};
  const data = payload?.data || {};

  const title = n.title || data.title || "Tin nhắn mới";
  const body  = n.body  || data.body  || "";
  const icon  = n.icon  || data.icon  || "/icons/icon-192.png";

  self.registration.showNotification(title, {
    body,
    icon,
    badge: "/icons/icon-192.png",
    data, // để click mở đúng chat
  });
});

// ✅ click noti -> mở app
self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  const data = event.notification?.data || {};
  const url = data.url || "/"; // m có thể truyền url chat vào payload

  event.waitUntil(
    clients.matchAll({ type: "window", includeUncontrolled: true }).then((clientList) => {
      for (const c of clientList) {
        if ("focus" in c) return c.focus();
      }
      if (clients.openWindow) return clients.openWindow(url);
    })
  );
});
