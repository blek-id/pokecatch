import 'normalize.css';
import './styles/main.scss';

import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faBars, faTimes, faAngleDoubleRight, faAngleDoubleLeft, faSpinner,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

import Vue from 'vue';
import App from './App.vue';
import store from './store/index';
import router from './router';

library.add(faBars);
library.add(faTimes);
library.add(faAngleDoubleRight);
library.add(faAngleDoubleLeft);
library.add(faSpinner);

Vue.component('font-awesome-icon', FontAwesomeIcon);
Vue.config.productionTip = false;

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app');
