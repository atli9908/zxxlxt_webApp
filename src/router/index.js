import Vue from 'vue';
import VueRouter from 'vue-router';

//
import Account from '../views/account'

Vue.use(VueRouter);

const routes = [
    //首页
    {
        path: '/',
        component: Account,
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
  })

  export default router;

