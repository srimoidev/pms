import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import i18n from "./i18n";
import VueAxios from "vue-axios";
import axios from "axios";
import "./plugins/codemirror";
import CKEditor from "@ckeditor/ckeditor5-vue";
import Database from "./mixins/Database/";
import VueSweetalert2 from "vue-sweetalert2";
import moment from "moment-timezone";
import Utils from "./utils";
import socketio from "socket.io-client";
import VueSocketIO from "vue-socket.io";
require("sweetalert2/dist/sweetalert2.min.css");
require("../node_modules/nprogress/nprogress.css");

const SocketInstance = socketio("http://localhost:3000");

Vue.use(CKEditor);
Vue.use(Database);
Vue.use(VueSweetalert2);
Vue.use(Utils);
Vue.use(
  new VueSocketIO({
    debug: true,
    connection: SocketInstance,
    vuex: {
      store,
      actionPrefix: "SOCKET_",
      mutationPrefix: "SOCKET_"
    },
    options: { path: "/" } //Optional options
  })
);

Vue.config.productionTip = false;

Vue.prototype.moment = moment;
// Vue.use(VeeValidate);

new Vue({
  Database,
  Utils,
  // moment,
  router,
  store,
  vuetify,
  i18n,
  VueAxios,
  axios,
  render: h => h(App)
}).$mount("#app");
