import Vue from 'vue';
import App from './App.vue';

import router from '@/router';

//vant
import { NavBar } from 'vant';
import { Icon } from 'vant';
import { Grid, GridItem } from 'vant';

Vue.use(NavBar);
Vue.use(Icon);
Vue.use(Grid);
Vue.use(GridItem);

//全局引入api接口地址
import global from '@/global.js';
Vue.prototype.global = global;

//注册全局组件
import headerNav from './components/headerNav.vue';
Vue.component("headerNav",headerNav)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
