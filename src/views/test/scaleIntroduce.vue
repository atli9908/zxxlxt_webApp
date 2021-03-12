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
                开始测评
            </div>
        </div>
    </div>
</template>

<script>
import {subTableById} from '../../utils/api/test.js';
export default {
    data(){
        return {
            title:'',
            introduce:'',
            list:[]
        }
    },
    methods:{
        handAction(){
            this.$router.replace({name:'ScaleTopic',query:this.list})
        }
    },
    created(){
        subTableById(this.$route.query).then(res=>{
            let info = res.data.Info;
            let list = res.data.list;
            console.log(res)
            this.title = info[0].title;
            this.introduce = info[0].introduce;
            this.list = list;
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