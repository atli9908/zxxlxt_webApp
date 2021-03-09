import Vue from 'vue';
import VueRouter from 'vue-router';

//用户
import Account from '../views/account'
const accHome = () => import('../views/account/accHome.vue')
const accLogin = () => import('../views/account/accLogin.vue')
const accReg = () => import('../views/account/accReg.vue')
const accSetInfo = ()=>import('../views/account/accSetInfo.vue')
const accSetPwd = ()=>import('../views/account/accSetPwd.vue')
const accAppealPwd = ()=>import('../views/account/accAppealPwd.vue')
//测评
import Test from '../views/test/index.vue'

Vue.use(VueRouter);

const routes = [
    //首页
    {
        path: '/',
        component: Account,
        children: [
            { path: '', name: 'Home', component: accHome, meta: { title: '智心心理评测系统' } },
            { path: '/login', name: 'Login', component: accLogin, meta: { title: '登录' } },
            { path: '/reg', name: 'Reg', component: accReg, meta: { title: '注册' } },
            { path: '/setInfo', name: 'SetInfo', component: accSetInfo, meta: { title: '个人资料' } },
            { path: '/setPassword', name: 'SetPassword', component: accSetPwd, meta: { title: '修改密码' } },
            { path: '/appealPwd', name: 'AppealPwd', component: accAppealPwd, meta: { title: '密码找回申诉' } }
        ]
    },
    //测评
    {
        path: '/',
        component: Test,
        children: [
            {
                path:'/testScale',
                name:'TestScale',
                component:()=>import('../views/test/testScale.vue'),
                meta:{
                    title:'量表测评'
                }
            },
            {
                path:'/testIntroduce',
                name:'TestIntroduce',
                component:()=>import('../views/test/testIntroduce.vue'),
                meta:{
                    title:'量表测评'
                }
            }
        ]
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

router.beforeEach((to,from,next)=>{
 let user = localStorage.getItem('userInfo')
 if(!user){
    if(to.path !== '/login'){
        next({path:'/login'})
    }else{
        next();
    }
 }else{
     next();
 }
})

export default router;

