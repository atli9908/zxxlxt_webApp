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
//问卷
import Question from '../views/question/index.vue'

//评测结果
import Result from '../views/result/index.vue'

//专家
import Expert from '../views/expert/index.vue'

//数据统计
import Statis from '../views/statis/index.vue'

Vue.use(VueRouter);

const routes = [
    //首页
    {
        path: '/',
        component: Account,
        children: [
            { path: '', name: 'Home', component: accHome, meta: { title: '智心心理测评系统' } },
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
                path:'/scale',
                name:'Scale',
                component:()=>import('../views/test/scale.vue'),
                meta:{
                    title:'量表测评',
                }
            },
            {
                path:'/scaleSearch',
                name:'ScaleSearch',
                component:()=>import('../views/test/scaleSearch.vue'),
                meta:{
                    title:'搜索',
                }
            },
            {
                path:'/scaleIntroduce',
                name:'ScaleIntroduce',
                component:()=>import('../views/test/scaleIntroduce.vue'),
                meta:{
                    title:'量表测评',     
                }
            },
            {
                path:'/scaleTopic',
                name:'ScaleTopic',
                component:()=>import('../views/test/scaleTopic.vue'),
                meta:{
                    title:'量表测评',
                }
            },
            {
                path:'/psych',
                name:'Psych',
                component:()=>import('../views/test/psych.vue'),
                meta:{
                    title:'普查测评',
                    keepAlive:true
                }
            },
            {
                path:'/psychSearch',
                name:'PsychSearch',
                component:()=>import('../views/test/psychSearch.vue'),
                meta:{
                    title:'搜索'
                }
            },
            {
                path:'/psychIntro',
                name:'PsychIntro',
                component:()=>import('../views/test/psychIntro.vue'),
                meta:{
                    title:'普查测评',
                }
            },
            {
                path:'/psychList',
                name:'PsychList',
                component:()=>import('../views/test/psychList.vue'),
                meta:{
                    title:'普查测评',
                }
            },
            {
                path:'/psychTopic',
                name:'PsychTopic',
                component:()=>import('../views/test/psychTopic.vue'),
                meta:{
                    title:'普查测评',      
                }
            },

        ]
    },
    //问卷
    {
        path:'/',
        component:Question,
        children:[
            {
                path:'/questnaire',
                name:'Questnaire',
                component:()=>import('../views/question/questnaire.vue'), 
                meta:{
                    title:'问卷测评'
                }
            },
            {
                path:'/questDetail',
                name:'QuestDetail',
                component:()=>import('../views/question/questDetail.vue'), 
                meta:{
                    title:'问卷测评'
                }
            },
            {
                path:'/questChildList',
                name:'QuestChildList',
                component:()=>import('../views/question/questChildList.vue'), 
                meta:{
                    title:'问卷测评'
                }
            },
            {
                path:'/questTopic',
                name:'QuestTopic',
                component:()=>import('../views/question/questTopic.vue'), 
                meta:{
                    title:'问卷测评'
                }
            },
            {
                path:'/questSearch',
                name:'QuestSearch',
                component:()=>import('../views/question/search.vue'), 
                meta:{
                    title:'搜索'
                }
            }
        ]
    },
    //评测结果
    {
        path:'/',
        component:Result,
        children:[
            {
                path:'/resultList',
                name:'ResultList',
                component:()=>import('../views/result/user/resultList.vue'),
                meta:{
                    title:'测评报告',
                    keepAlive:true
                },
            },
            {
                path:'/scaleResult',
                name:'ScaleResult',
                component:()=>import('../views/result/user/scaleResult.vue'),
                meta:{
                    title:'测评报告'
                }
            },
            {
                path:'/psychResultList',
                name:'PsychResultList',
                component:()=>import('../views/result/user/psychResultList.vue'),
                meta:{
                    title:'普查报告'
                }
            },
            {
                path:'/questResultList',
                name:'QuestResultList',
                component:()=>import('../views/result/user/questResultList.vue'),
                meta:{
                    title:'问卷报告'
                }
            },
            {
                path:'/questionResult',
                name:'QuestionResult',
                component:()=>import('../views/result/user/questionResult.vue'),
                meta:{
                    title:'问卷测评报告'
                }
            },
            {
                path:'/resultSearch',
                name:'ResultSearch',
                component:()=>import('../views/result/user/search.vue'),
                meta:{
                    title:'搜索',
                }
            }
        ]
    },
    //专家
    {
        path:'/',
        component:Expert,
        children:[
            {
                path:'/expertList',
                name:'ExpertList',
                component:()=>import('../views/expert/expertList.vue'),
                meta:{
                    title:'专家咨询'
                }
            },
            {
                path:'/expertConsult',
                name:'ExpertConsult',
                component:()=>import('../views/expert/expertConsult.vue'),
                meta:{
                    title:'咨询/预约'
                }
            },
            {
                path:'/expertDetail',
                name:'ExpertDetail',
                component:()=>import('../views/expert/detail.vue'),
                meta:{
                    title:'咨询详情'
                }
            },
            {
                path:'/expertSearch',
                name:'ExpertSearch',
                component:()=>import('../views/expert/search.vue'),
                meta:{
                    title:'搜索'
                }
            }
        ]
    },
    //数据统计
    {
        path:'/',
        component:Statis,
        children:[
            {
                path:'/statistice',
                name:'Statistice',
                component:()=>import('../views/statis/user/statistics.vue'),
                meta:{
                    title:'数据统计'
                }
            },
            {
                path:'/adminStatistice',
                name:'AdminStatistice',
                component:()=>import('../views/statis/admin/statistics.vue'),
                meta:{
                    title:'数据统计'
                }
            }
        ]
    }
]

const router = new VueRouter({
    //mode: 'history',
    base: process.env.BASE_URL,
    routes
})

router.beforeEach((to,from,next)=>{
 let user = localStorage.getItem('userInfo')
 if(!user){
    if(to.path == '/'){
        next({path:'/login'})
    }else{
        next();
    }
 }else{
     next();
 }
})

export default router;

