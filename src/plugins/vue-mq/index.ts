import Vue from 'vue';
import VueMq from 'vue-mq';

Vue.use(VueMq, {
  breakpoints: {
    mobile: 560,
    tablet: 810,
    laptop: 1060,
    full: Infinity,
  },
  defaultBreakpoint: 'fullsm',
});
