import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import "vuesax/dist/vuesax.css";
Vue.config.productionTip = false;

import "./plugins/vee-validate";
import "./plugins/font-awesome";
import "./plugins/vuesax";
import "./plugins/element-ui";

import "@/filters";

new Vue({
    router,
    store,
    render: (h) => h(App),
    el: "#app",
});
