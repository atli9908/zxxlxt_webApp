import Vue from 'vue';
import App from './App.vue';

import router from '@/router';

//vant
import { NavBar } from 'vant';
import { Icon } from 'vant';
import { Grid, GridItem } from 'vant';
import { Field } from 'vant';
import { Popover } from 'vant';
import { Form } from 'vant';
import { Picker } from 'vant';
import { Popup } from 'vant';
import { Toast } from 'vant';
import { Sidebar, SidebarItem } from 'vant';
import { ActionSheet } from 'vant';
import { Notify } from 'vant';

Vue.use(NavBar);
Vue.use(Icon);
Vue.use(Grid);
Vue.use(GridItem);
Vue.use(Field);
Vue.use(Popover);
Vue.use(Form);
Vue.use(Picker);
Vue.use(Popup);
Vue.use(Toast);
Vue.use(Sidebar);
Vue.use(SidebarItem);
Vue.use(ActionSheet);
Vue.use(Notify);

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
