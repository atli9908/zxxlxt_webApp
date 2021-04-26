import Vue from 'vue';
import App from './App.vue';

import router from '@/router';
//vuex
import store from '@/store/index';

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
import { Overlay } from 'vant';
import { Col, Row } from 'vant';
import { Dialog } from 'vant';
import { Tab, Tabs } from 'vant';
import { Search } from 'vant';
import { Calendar } from 'vant';
import { Badge } from 'vant';
import { Loading } from 'vant';
import { RadioGroup, Radio } from 'vant';
import { Checkbox, CheckboxGroup } from 'vant';
import { DatetimePicker } from 'vant';
import { Progress } from 'vant';

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
Vue.use(Overlay);
Vue.use(Col);
Vue.use(Row);
Vue.use(Dialog);
Vue.use(Tab);
Vue.use(Tabs);
Vue.use(Search);
Vue.use(Calendar);
Vue.use(Badge);
Vue.use(Loading);
Vue.use(Radio);
Vue.use(RadioGroup);
Vue.use(Checkbox);
Vue.use(CheckboxGroup);
Vue.use(DatetimePicker);
Vue.use(Progress);

//Echarts
import * as echarts from 'echarts';
//将echarts保存为全局变量
Vue.prototype.$echarts = echarts;

//全局引入api接口地址
import global from '@/global.js';
Vue.prototype.global = global;

//注册全局组件
import headerNav from './components/headerNav.vue';
Vue.component("headerNav",headerNav)

//公共css样式
import '@/assets/css/common.less';

//iconfont
import '@/assets/css/iconfont.css';

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
