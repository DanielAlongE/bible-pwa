/* eslint-disable no-undef */
importScripts(
  "https://storage.googleapis.com/workbox-cdn/releases/3.5.0/workbox-sw.js"
);

if (workbox) {
  console.log(`Yay! Workbox is loaded 🎉`);

  workbox.precaching.precacheAndRoute([]);

  workbox.routing.registerRoute(
    ({ url }) => url.pathname.endsWith(".html"),
    new workbox.strategies.NetworkFirst()
  );

  workbox.routing.registerRoute(
    new RegExp(".+\\.js$"),
    new workbox.strategies.CacheFirst()
  );
} else {
  console.log(`Boo! Workbox didn't load 😬`);
}
