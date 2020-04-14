import VueComponentSource from '@alexlit/vue-component-source';
import Vue from 'vue';

Vue.use(VueComponentSource, {
  enabled: process.env.NODE_ENV === 'development',
});
