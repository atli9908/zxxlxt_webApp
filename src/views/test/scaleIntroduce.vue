<template>
    <div>
        <div class="warp">
            <div class="header">
                <span  class="title">{{title}}</span>
            </div>
            <div class="content">
                <p>{{introduce}}</p>
            </div>
            <div class="bottomBtn" @click="handAction()">
                {{isContinue=='0' ? '开始测评' : '继续测评'}}
            </div>
        </div>
    </div>
</template>

<script>
import {subTableById} from '../../utils/api/test.js';
export default {
    data(){
        return {
            uid: JSON.parse(localStorage.getItem("userInfo")).data.list.uid,
            gauge_id:'',
            title:'',
            introduce:'',
            list:[],
            isContinue:'' //是否中断退出
        }
    },
    methods:{
        handAction(){
            let time = +new Date();
            this.$router.replace({name:'ScaleTopic',query:{time:time,uid:this.uid,gauge_id:this.gauge_id,publishId:this.$route.query.publishId,flag:this.$route.query.flag,type:'lb'}});
        }
    },
    created(){
        subTableById(this.$route.query).then(res=>{
            if(res && res.code==0){
                let info = res.data.Info;
                console.log(res)
                this.title = info[0].title;
                this.gauge_id = info[0].gauge_id;
                this.introduce = info[0].introduce;
                this.isContinue = info[0].isContinue;
                this.list = res.data;
            }else{
                this.$dialog.alert({
                    title: '提示',
                    message: res.message,
                }).then(() => {
                    this.$router.go(-1)
                });
            }
        })
    }
}
</script>

<style scoped lang='less'>
.warp{
    height: 100%;
    margin-top: .1rem;
    background-color:#fff;
    min-height: calc(~"100vh - 53px");
}
.header{
    display: flex;
    justify-content: center;
}
.title{
    font-size: .17rem;
    font-family: Microsoft YaHei;
    font-weight: bold;
    color: #333333;
    margin: .2rem 0;
}
.content{
    padding: 0 30px;
    padding-bottom: 70px;
    p{
        padding-top:15px;
        border-top: 1px solid #ddd;
        font-size: .16rem;
        word-wrap:break-word;
        text-indent: 2em;
        line-height: 28px;
    }
}
.bottomBtn{
    position: fixed;
    bottom: 0;
    font-size: .16rem;
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 69px;
    background: #0AA7F4;
}
</style>