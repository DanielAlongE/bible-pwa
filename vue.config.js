module.exports = {
  lintOnSave: true,
  pwa: {
    name: "Bible Roni",
    themeColor: "#260751",
    msTileColor: "#ffffff",
    backgroundColor: "#ffffff",
    appleMobileWebAppCapable: "yes",
    appleMobileWebAppStatusBarStyle: "black",

    // configure the workbox plugin
    workboxPluginMode: "InjectManifest",
    workboxOptions: {
      // swSrc is required in InjectManifest mode.
      swSrc: "src/service-worker.js",
      exclude: [/\.map$/, /manifest\.json$/]
    }
  }
};
