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

require("sweetalert2/dist/sweetalert2.min.css");
require("../node_modules/nprogress/nprogress.css");

Vue.use(CKEditor);
Vue.use(Database);
Vue.use(VueSweetalert2);

Vue.config.productionTip = false;

// Vue.use(VeeValidate);

new Vue({
  Database,
  router,
  store,
  vuetify,
  i18n,
  VueAxios,
  axios,
  render: h => h(App)
}).$mount("#app");
