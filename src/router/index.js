import Vue from 'vue';
import VueRouter from 'vue-router';

//
import Account from '../views/account'
import accHome from '../views/account/accHome.vue'
const accLogin = ()=>import('../views/account/accLogin.vue')

Vue.use(VueRouter);

const routes = [
    //首页
    {
        path: '/',
        component: Account,
        children:[
            {path:'',name:'Home',component:accHome,meta:{title:'智心心理评测系统'}},
            {path:'/login',name:'Login',component:accLogin,meta:{title:'登录'}}
        ]
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
  })

  export default router;

