<template>
    <div>
        <div>
            <van-nav-bar :title="$route.meta.title" class="nav-bar">
                <template #left>
                    <i class="iconfont icon-changyongicon-" style="font-size:.28rem;color:#707070"  @click="$router.push('/')"></i>
                </template>
                <template #right>
                    <i v-if="!isTouch && active=='1'" class="iconfont icon-search" style="font-size:.22rem;color:#707070;padding-right:.1rem" @click="handSearch()"></i>
                    <span v-else-if="isTouch && active=='1'" style="color:#333333;font-size:.16rem" @click="isTouch=false">退出编辑</span>
                </template>
            </van-nav-bar>
        </div>
        <div class='wrap'>
            <van-tabs v-model="active" color='#0AA7F4' title-active-color='#0AA7F4' @click="handActive()">
                <van-tab title="专家列表">
                    <div class="content">
                        <ul class="listWrap">
                            <li v-for="(item,index) in expertList" :key="index">
                                <div class="list">                        
                                    <div class="lib">
                                        <img :src="global.ip + item.avatar" alt="">
                                    </div>
                                    <div class="contentMsg" style="width:2.1rem">
                                        <p class="title">{{item.nickname}}</p>
                                        <p class="tips">{{item.job}}</p>
                                        <p class="tips">{{item.sex}} {{item.age}}岁</p>
                                    </div>
                                    <div class="btnWrap">
                                        <button class="sizeBtn" @click="actionBtn(item)">咨询/预约</button>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </van-tab>
                <van-tab title="咨询记录">
                    <div class="content">
                        <ul class="listWrap">
                            <van-checkbox-group v-model="checkeds" ref="checkboxGroup">
                                <li v-for="(item,index) in ordersList" :key="index" @touchstart="longTouch()" @touchend="leaveTouch()">
                                    <van-checkbox v-if="isTouch" :name="item.consultId" style="padding-right:10px"/>
                                    <div class="list" @click="clickOrder(item)">
                                        <div class="lib">
                                            <van-badge :dot='item.isRead ==0 ? true : false'>
                                                <img :src="global.ip + item.avatar" alt="">
                                            </van-badge>
                                        </div>
                                        <div class="contentMsg" :style="isTouch ? 'width:1.8rem;' : 'width:2.8rem;'">
                                            <p class="title"><span class="tag" :style="item.type=='2' ? {backgroundColor:'#43CD80'} : {}">{{item.type=='1' ? '咨询' : '预约'}}</span>{{item.nickname}}<span class="status">{{item.isReply==1 ? '(已回复)' : '(未回复)'}}</span></p>
                                            <p class="tips">{{item.question}}</p>
                                            <p style="margin-top:-5px">{{item.addTime}}</p>
                                        </div>
                                    </div>
                                    <button v-if="isTouch" class="delBtn" @click.stop="delBtn(item,index)">删除</button>
                                </li>
                            </van-checkbox-group>
                        </ul>
                    </div>
                </van-tab>
            </van-tabs>
        </div>
        <div v-if="expertList.length<=0 && active=='0'" class="tip">暂无专家</div>
        <div v-if="ordersList.length<=0 && active=='1'" class="tip">暂无咨询记录</div>
    </div>
</template>

<script>
import {expertsList,ordersList,deleteOrder,readOrder} from '../../utils/api/expert';
import {formatDate2} from '../../utils/common';
export default { 
    data(){
        return {
            isTouch:false,
            checkeds:[],
            expertList:[],
            ordersList:[],
            value:'',
            active:this.$route.params.active ? this.$route.params.active : 0
        }
    },
    methods:{
        longTouch(){     //长按显示删除
            clearTimeout(this.timer); //再次清空定时器，防止重复注册定时器
            this.timer = setTimeout(function() {
                this.isTouch = true;
            }.bind(this), 500);
        },
        leaveTouch(){  //长按时间不够，取消定时器
            clearTimeout(this.timer);
        },
        handActive(){
            console.log(this.active)
            if(this.active=='1'){
                this.intiOrdersList();
            }else{
                this.initExpertsList();
            }
        },
        //搜索
        handSearch(){
            this.$router.push('/expertSearch')
        },
        //专家列表
        initExpertsList(){
            expertsList({
                uid:JSON.parse(localStorage.getItem("userInfo")).data.list.uid
            }).then(res=>{
                console.log(res)
                this.expertList = res.data.list;
            })
        },
        //咨询记录
        intiOrdersList(){
            ordersList({
                uid:JSON.parse(localStorage.getItem("userInfo")).data.list.uid,
                curPage:'',
                pageSize:'',
                nickname:this.$route.params.value,
                status:this.$route.params.status,
                starttime:this.$route.params.startTime,
                endtime:this.$route.params.endTime
            }).then(res=>{
                console.log(res)
                res.data.list.forEach(item=>{
                    item.addTime = formatDate2(item.addTime)
                });
                this.ordersList = res.data.list;
            })
        },
        actionBtn(item){
            this.$router.push({name:'ExpertConsult',query:{expertUid:item.expertId}});
        },
        clickOrder({consultId}){
            this.$router.push({name:'ExpertDetail',query:{consultId:consultId,active:1}});
            readOrder({ //已读
                uid:JSON.parse(localStorage.getItem("userInfo")).data.list.uid,
                consultId:consultId
            }).then(()=>{})
        },
        delBtn(item,index){
            if(this.checkeds.includes(item.consultId)){
                this.$dialog.confirm({
                    message: '确定要删除此条内容吗？',
                    })
                    .then(() => {
                        //删除
                        deleteOrder({
                            uid:this.uid,
                            consultId:item.consultId
                        }).then(res=>{
                            if(res.code=='0'){
                                this.ordersList.splice(index,1);
                                this.$toast.success(res.message);
                            }
                        })
                    })
                    .catch(() => {
                        // on cancel
                });
            }else{
                this.$toast('请先选择需要删除的内容！');
            }
        }
    },
    created(){
        if(this.active=='0'){
            this.initExpertsList();
        }else{
            this.intiOrdersList();
        }
    }
}
</script>

<style lang="less" scoped>
p{
    font-weight: 400;
    color: #999999;
}
.wrap{
    background-color: #FFFFFF;
    margin-top: 10px;
}
/deep/.van-tabs__wrap{
    border-bottom: 1px solid #eee;
}
/deep/.van-tab__text{
    font-size: 17px;
}
.content{
    padding: 0 15px;
}
//
.listWrap{
    background-color: #fff;
    li{
        border-bottom: 1px solid #eee;
        display: flex;
        align-items: center;
    }
}
.list{
    height: 105px;
    box-sizing: border-box;
    padding-top: 18px;
    display: flex;
    .lib{
        display: flex;
        justify-content: center;
        height: 49px;
        width: 49px;
        border-radius: 50%;
        color: #fff;
        font-size: 21px;
        line-height: 44px;
        margin-right: 10px;
        /deep/.van-badge--fixed{
            right: 6px;
            top: 3px;
            width: 10px;
            height: 10px;
        }
    }
    div{
        display: flex;
    }
    img{
        height: 49px;
        width: 49px;
        border-radius: 50%;
        z-index: 9;
    }
    .btnWrap{
        margin-top: 18px;
    }
}
.delBtn{
    font-size: 14px;
    color: #333;
    width: 63px;
    height: 35px;
    background: #fff;
    border-radius: 3px;
    margin-left: 10px;
    border: 1px solid #ddd;
}
.contentMsg{
    padding-left: 5px;
    font-size: 14px;
    flex-wrap: wrap;
    height: 80px;
    .title{
        font-size: 17px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: #333333;
        .tag{
            background-color: #0AA7F4;
            color: #fff;
            padding: 2px 4px;
        }
    }
    .tips{
        font-size: 14px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: #999999;
        width: 100%;

        overflow: hidden;
        white-space: nowrap;
        text-overflow:ellipsis;
    }
}
.status{
    font-size: 13px;
    font-weight: 400;
    color: #999999;
    margin-left: 10px;
}
.tip{
    font-size: 16px;
    color: #333;
    text-align: center;
    margin-top: 20px;
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