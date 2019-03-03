// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuex from 'vuex'


Vue.config.productionTip = false;

// import { Header,Swipe, SwipeItem ,Button ,Switch,Field ,Lazyload   } from 'mint-ui';
// Vue.component(Header.name, Header);
// Vue.component(Swipe.name, Swipe);
// Vue.component(SwipeItem.name, SwipeItem);
// Vue.component(Button.name, Button);
// Vue.component(Switch.name, Switch);
// Vue.component(Field.name, Field);
// Vue.use(Lazyload);
import MintUI from 'mint-ui'

Vue.use(MintUI);
import 'mint-ui/lib/style.css'

import "./lib/mui/css/mui.css"
import "./lib/mui/css/icons-extra.css"


Vue.use(Vuex);
const store = new Vuex.Store({
  state: {
    totalnumber: 0,
    xuannumber: 0,
    he: 0
  },
  mutations: {
    settotalnumber(state, totalnumber) {
      state.totalnumber = totalnumber
    },
    getxuannumber(state, xuannumber) {
      state.xuannumber = xuannumber
    },
    gethe(state, he) {
      state.he = he
    }
  }
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  // components: { App },
  // template: '<App/>'
  render: c => c(App)
});
