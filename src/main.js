import Vue from 'vue';
import Main from './main.vue';


import VueVirtualScroller from 'vue-virtual-scroller';
import 'vue-virtual-scroller/dist/vue-virtual-scroller.css';

Vue.use(VueVirtualScroller);
Vue.config.productionTip = false;

new Vue({
    render: h => h(Main)
}).$mount('#app');
