<template>
    <div>
        <div>
            <van-nav-bar :title="$route.meta.title" class="nav-bar">
                <template #left>
                    <i class="iconfont icon-changyongicon-" style="font-size:.28rem;color:#707070"  @click="backRouter()"></i>
                </template>
                <template #right>
                    <span v-if="isTouch" style="color:#333333;font-size:.16rem" @click="outRedact()">退出编辑</span>
                    <i v-else class="iconfont icon-search" style="font-size:.22rem;color:#707070;padding-right:.1rem" @click="handSearch()"></i>
                </template>
            </van-nav-bar>
        </div>
        <div>
            <van-tabs v-model="active" color='#0AA7F4' title-active-color='#0AA7F4' line-width=".8rem" font-size="25px" @click="handNav()">
                <van-tab :title="nav.title" v-for="(nav) in navs" :key="nav.id">
                    <div v-for="(item,index) in dataList" :key="index">
                        <div class="dateMsg"><span>{{item[0]}}</span></div>
                        <ul class="listWrap">
                            <van-checkbox-group v-model="checkeds" ref="checkboxGroup">
                                <li v-for="(list,index) in item[1]" :key="index" @touchstart="longTouch()" @touchend="leaveTouch()">
                                    <van-row class="list">
                                        <van-col span="2" class="check" v-if="isTouch">
                                            <van-checkbox :name="list" @click.prevent />
                                        </van-col>
                                        <van-col span="4">
                                            <div class="lib" :style="{backgroundColor:randomColor[Math.floor(Math.random()*6)]}">
                                                {{list.day}}
                                            </div>
                                        </van-col>
                                        <van-col :span="isTouch ? '12' : '14'">
                                            <div class="contentMsg">
                                                <p class="title"><span class="tag">{{nav.title}}</span>{{list.title}}</p>
                                                <p v-if="active!='0'" class="tips">包含分卷：{{list.gaugeTotal}}</p>
                                                <p class="tips">查看结果：{{list.isView=='1'? '可查看':'不可查看'}}</p>
                                            </div>
                                        </van-col>
                                        <van-col span="6" class="btnWrap">
                                            <button v-if="isTouch" class="unBtn" @click="deleteBtn(list,item,index)">删除</button>
                                            <div v-else-if="list.isView==1 && isTouch==false">
                                                <van-badge :dot="list.isRead=='0' ? true : false">
                                                    <button :class="list.isRead=='0' ? 'onBtn' : 'unBtn'" @click="resultBtn(list)">查看</button>
                                                </van-badge>
                                            </div>
                                            <button v-else class="unBtn" style="background-color:#eee;color:#999" @click="notBtn()">查看</button>
                                        </van-col>
                                    </van-row>
                                </li>
                            </van-checkbox-group>
                        </ul>
                    </div>
                </van-tab>
            </van-tabs>
        </div>
        <div class="not" v-if="dataList=='' || dataList.length < 0">
            暂无测评报告
        </div>
    </div>
</template>

<script>
import {getResultList,getReadTable,searchQuestionResult,delQuestionResult,tableResultOperate} from '../../../utils/api/result';
import {formatDate3} from '../../../utils/common';
let timer; //定时器
export default {
    data(){
        return{
            checkeds:[],
            isTouch:false,
            navs:[
                {title:'量表',id:'lb'},
                {title:'问卷',id:'wj'},
                {title:'普查',id:'pc'},
            ],
            uid:JSON.parse(localStorage.getItem("userInfo")).data.list.uid,
            active:this.$route.params.active ? this.$route.params.active : 0,
            dataList:[],   //结果列表
            randomColor:['#F29EC2','#0AA7F4','#F9B552','#12B5B0','#ED6942']
        }
    },
    methods:{
        longTouch(){     //长按显示删除
            clearTimeout(timer); //再次清空定时器，防止重复注册定时器
            timer = setTimeout(function() {
                this.isTouch = true;
            }.bind(this), 800);
        },
        leaveTouch(){  //长按时间不够，取消定时器
            clearTimeout(timer);
        },
        outRedact(){  //退出编辑
            this.isTouch = false;
        },
        backRouter(){   
            this.$router.push('/');
        },
        handSearch(){
            this.$router.push({name:'ResultSearch',query:{active:this.active}});
        },
        handNav(){
            if(this.active==1){
                this.dataList = [];
                this.getQuestionResult();
            }else{
                this.getResultList();
            }
        },
        resultBtn({isView,id,publishId,publishWhoId}){     //查看按钮
            if(this.active == 0){   //量表
                if(isView){
                    getReadTable({  //是否已读接口
                        uid:this.uid,
                        testType:this.testType,
                        id:id
                    });
                    this.$router.push({name:'ScaleResult',query:{id:id,testType:this.testType,active:this.active}});
                }else{
                    this.$dialog.alert({
                        title: '提示',
                        message: '您暂时无法查看此内容，请联系管理员！',
                    }).then(() => {
                        //
                    });
                }
            }else if(this.active == 1){ //问卷
                if(isView){ 
                    this.$router.push({name:'QuestResultList',query:{publishWhoId:publishWhoId,active:this.active}});
                }else{
                    this.$dialog.alert({
                        title: '提示',
                        message: '您暂时无法查看此内容，请联系管理员！',
                    }).then(() => {
                        //
                    });
                }
            }else if(this.active == 2){   //普查
                if(isView){ 
                    this.$router.push({name:'PsychResultList',query:{publishId:publishId,active:this.active}});
                }else{
                    this.$dialog.alert({
                        title: '提示',
                        message: '您暂时无法查看此内容，请联系管理员！',
                    }).then(() => {
                        //
                    });
                }
            }
        },
        notBtn(){ //不可查看按钮
            this.$dialog.alert({
                confirmButtonText:'关闭',
                confirmButtonColor:'#0AA7F4',
                title: '提示',
                message: '您暂时无法查看此内容，请联系管理员！',
            }).then(() => {
                // on close
            });
        },
        deleteBtn(list,item,index){  //删除
            if(this.checkeds.includes(list)){
                this.$dialog.confirm({
                    title: '',
                    message: '确定要删除此条内容吗？',
                })
                .then(() => {
                    if(this.active==1){
                        this.delQuestionResult(list,item,index);
                    }else if(this.active==0){
                        this.delTableResultOperate(list.id,'',item,index);
                    }else if(this.active==2){
                        this.delTableResultOperate(list.publishId,list.publishId,item,index);
                    }
                })
                .catch(() => {
                    // on cancel
                });
            }else{
                this.$toast('请先选择！');
            }
        }, 
        //获取评测报告列表
        getResultList(){
            getResultList({
                uid:this.uid,
                testType:this.testType,
                name:this.$route.params.name,
                isRead:this.$route.params.isRead,
                isView:this.$route.params.isView,
                starttime:this.$route.params.startTime,
                endtime:this.$route.params.endTime
            }).then(res=>{
                if(res && res.data.list!==null){
                    console.log(res)
                    this.dataList = Object.entries(res.data.list);  //返回一个数组,包含键值
                    console.log(this.dataList)
                }else{
                    this.dataList = '';
                }
            })
        },
        //获取问卷结果
        getQuestionResult(){
            searchQuestionResult({
                uid:this.uid,
                page:'',
                pagesize:'',
                startTime:this.$route.params.startTime,
                endTime:this.$route.params.endTime,
                isView:this.$route.params.isView,
                unread:this.$route.params.unread,
                search:this.$route.params.search
            }).then(res=>{
                console.log(res,'问卷')
                let dayList = [];
                res.data.list.forEach((item,index)=>{
                   dayList[index] = {
                       day:new Date(item.finishTime*1000).getDate(),
                       finishTime:formatDate3(item.finishTime),
                       gaugeTotal:item.testNum,
                       title:item.questionName,
                       isRead:item.unread,
                       isView:item.isView,
                       publishWhoId:item.publishWhoId
                   };
                })
                
                let newData = {}
                dayList.forEach(e=>{
                    if(Object.keys(newData).indexOf(e.finishTime)===-1){
                        newData[e.finishTime] = [];
                    }
                    newData[e.finishTime].push(e);
                })
                this.dataList = Object.entries(newData);
                console.log(this.dataList)
            })
        },
        //删除问卷
        delQuestionResult({publishWhoId},item,index){  
            console.log(publishWhoId)
            console.log(item)
            delQuestionResult({
                uid:this.uid,
                publishWhoId:publishWhoId
            }).then(res=>{
                item[1].splice(index,1);
                if(item[1].length<=0){
                    item[0]=''
                }
                this.$toast.success('删除成功！');
                return res;
            })
        },
        //删除普查/量表
        delTableResultOperate(id,publishId,item,index){
            tableResultOperate({
                uid:this.uid,
                testType:this.testType,
                type:4,
                id:id,
                publishId:publishId,
                publishInfoId:''
            }).then(res=>{
                item[1].splice(index,1);
                if(item[1].length<=0){
                    item[0]=''
                }
                this.$toast.success('删除成功！');
                return res;
            })
        }
    },
    computed:{
        testType(){  //报告分类
            let testType = 0;
            if(this.active==0){
                 testType =  1;
            }else if(this.active==1){
                testType =  4;
            }else if(this.active==2){
                testType =  3;
            }
            return testType;
        }
    },
    created(){
        if(this.active==1){
            this.getQuestionResult();
        }else{
            this.getResultList();
        }
    },
    beforeRouteLeave(to,from,next){
        if(to.name == 'ResultSearch' || to.name == 'ScaleResult' || to.name == 'PsychResultList' || to.name == 'QuestResultList'){
            from.meta.keepAlive = false;
        }else{
            from.meta.keepAlive = true;
        }
        next();
    }
}
</script>

<style scoped lang="less">
* {
    -webkit-touch-callout:none;/*系统默认菜单被禁用*/
    -webkit-user-select:none;/*webkit浏览器*/
    -khtml-user-select:none;/*早起浏览器*/
    -moz-user-select:none;/*火狐浏览器*/
    -ms-user-select:none;/*IE浏览器*/
    user-select:none;/*用户是否能够选中文本*/
}
/deep/.van-tab{
    font-size: 17px;
    color: #333333;
}
.dateMsg{
    font-size: 16px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: #333333;
    margin: 18px 14px;
}
.listWrap{
    background-color: #fff;
    padding: 0 14px;
    li{
        border-bottom: 1px solid #eee;
    }
}
.list{
    //height: 140px;
    box-sizing: border-box;
    padding-top: 14px;
    padding-bottom: 22px;
    .check{
        margin-top: 12px;
    }
    .lib{
        display: flex;
        justify-content: center;
        height: 44px;
        width: 44px;
        border-radius: 50%;
        color: #fff;
        font-size: 21px;
        background: #0AA7F4;
        line-height: 44px;
    }
    div{
        display: flex;
    }
    img{
        height: 43px;
        width: 43px;
        border-radius: 50%;
        border-radius: 50%;
    }
    .btnWrap{
        margin-top: 26px;
    }
    .onBtn{
        font-size: 14px;
        color: #fff;
        width: 63px;
        height: 35px;
        background: #0AA7F4;
        border-radius: 3px;
        border: 0;
        margin-left: 20px;
    }
    .unBtn{
        font-size: 14px;
        color: #333;
        width: 63px;
        height: 35px;
        background: #fff;
        border-radius: 3px;
        margin-left: 20px;
        border: 1px solid #ddd;
    }
}
.contentMsg{
    font-size: 14px;
    flex-wrap: wrap;
    .title{
        font-size: 15px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: #333333;
        margin-bottom: 5px;
        line-height: 28px;
        //white-space:nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        .tag{
            background-color: #eefcff;
            font-size: 13px;
            padding: 1px 4px;
            margin-right: 10px;
            box-shadow: 0 0 1px rgb(103, 201, 247);
            color: rgb(35, 185, 255);
        }
    }
    .tips{
        font-size: 14px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: #999999;
        width: 100%;
        margin: 3px 0;
    }
}
.not{
  margin-top: .2rem;
  color: #333333;
  font-size: .16rem;
  text-align: center;
}
//nav
.nav-bar {
  height: 0.43rem;
}
/deep/.van-nav-bar__content {
  height: 0.43rem;
}
/deep/.van-nav-bar__title {
  font-size: 0.18rem;
  width: 13.7rem;
  font-weight: 400;
  color: #000000;
}
.nav-icon {
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 1px;
}
.linkCard{
  font-size: .16rem;
  font-weight: 400;
  color: #0AA7F4;
  line-height: 25px;
}
</style>