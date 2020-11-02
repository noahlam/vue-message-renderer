import Vue from 'vue';
import Main from './main.vue';

Vue.config.productionTip = false;

new Vue({
    render: h => h(Main)
}).$mount('#app');
