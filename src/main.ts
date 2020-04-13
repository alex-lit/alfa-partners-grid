import '@/assets/styles/index.pcss';
import '@/plugins/bowser';
import '@/plugins/css-has-pseudo';
import '@/plugins/vue-component-source';
import '@/plugins/vue-mq';

import Vue from 'vue';

import App from './App.vue';

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount('#app');
