/* eslint-disable @typescript-eslint/camelcase */
module.exports = {
  lintOnSave: true,
  pwa: {
    name: "Bible Roni",
    themeColor: "#260751",
    backgroundColor: "#ffffff",
    appleMobileWebAppCapable: "yes",
    appleMobileWebAppStatusBarStyle: "black",

    // configure the workbox plugin
    workboxPluginMode: "InjectManifest",
    workboxOptions: {
      // swSrc is required in InjectManifest mode.
      swSrc: "src/service-worker.js",
      exclude: [/\.map$/, /manifest\.json$/]
    },
    manifestOptions: {
      name: "Bible Roni",
      short_name: "Bible",
      display: "standalone",
      theme_color: "#260751",
      start_url: ".",
      background_color: "#ffffff"
    }
  }
};
