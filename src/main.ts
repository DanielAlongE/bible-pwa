import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import Chakra, { CThemeProvider, CReset } from '@chakra-ui/vue'

Vue.config.productionTip = false;

Vue.use(Chakra)

new Vue({
  router,
  //render: h => h(App)
  render: (h) => h(CThemeProvider, [h(CReset), h(App)])
}).$mount("#app");
