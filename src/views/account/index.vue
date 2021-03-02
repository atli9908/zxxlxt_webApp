<template>
    <div style="background-color:#eee;height:8.13rem">
        <van-nav-bar title="智心心理评测系统" class="nav-bar">
            <template #left>
                <i class="iconfont icon-cha" style="font-size:.25rem"></i>
            </template>
        </van-nav-bar>
        <div class="account-bg">
            <img :src="global.iconPic.account_logo" alt="" class="logo">
            <div class="headImg"></div>
            <div class="account-name">
                <p>龙傲天(用户)</p>
            </div>
            <div class="msgBox">
                <van-grid :column-num="3" :border="false">
                    <van-grid-item v-for="item in msgList" :key="item.title">
                        <p class="msgTitle">{{item.title}}</p>
                        <p class="msgData">{{item.data}}</p>
                        <p class="msgUnread">{{item.unread}}</p>
                    </van-grid-item>
                </van-grid>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            msgList:[
                {title:'评测项目',data:3,unread:'待评测'},
                {title:'评测结果',data:10,unread:'待查看'},
                {title:'咨询消息',data:0,unread:'未查看'}
            ]
        }
    }
}
</script>

<style lang='less' scoped>
.nav-bar{
    height: .427rem;
}
/deep/.van-nav-bar__title{
    font-size: .17rem;
    width: 13.7rem;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: #000000;
}
.nav-icon{
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 1px;
}
.account-bg{
    height: 2.01rem;
    background: url("../../assets/img/account/bg.png")no-repeat;
    background-size: cover;
    padding-top: .1rem;
}
.logo{
    height:.2rem;
    width:1.27rem;
    display: flex;
    margin-left: .14rem;
}
.headImg{
    width: .69rem;
    height: .69rem;
    border: 3px solid rgba(255, 255, 255, 0.5);
    border-radius: 50%;
    margin: 0 auto;
    margin-top: .15rem;
}
.account-name p {
    font-size: .17rem;
    font-family: Microsoft YaHei;
    font-weight: bold;
    color: #FFFFFF;
    line-height: .22rem;
    text-align: center;
    margin-top: .14rem;
}
.msgBox{
    width: 3.47rem;
    height: 1.04rem;
    background: #FFFFFF;
    box-shadow: 0px 0px 7px 0px rgba(153, 153, 153, 0.1);
    border-radius: 7px;
    margin: 0 auto;
    margin-top: .19rem;
}
.msgTitle{
    height: .14rem;
    font-size: .14rem;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: #555555;
}
.msgData{
    height: .17rem;
    font-size: .21rem;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: #333333;
    line-height: .22rem;
    margin-top: .14rem;
    margin-bottom: .1rem
}
.msgUnread{
    height: .13rem;
    font-size: .13rem;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: #999999;
    line-height: .22rem;
}
</style>