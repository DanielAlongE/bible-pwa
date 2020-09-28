import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import Chakra, { CThemeProvider, CReset } from '@chakra-ui/vue'
import { faAngleRight, faAngleLeft, faCog } from '@fortawesome/free-solid-svg-icons'


Vue.config.productionTip = false;

Vue.use(Chakra, {
  icons: {
    // Here we state that we use `fa`
    // icons library for Chakra's
    // internal icon parser
    iconPack: 'fa',
    iconSet: {
      faAngleRight,
      faAngleLeft,
      faCog
    }
  }
})

new Vue({
  router,
  //render: h => h(App)
  render: (h) => h(CThemeProvider, [h(CReset), h(App)])
}).$mount("#app");