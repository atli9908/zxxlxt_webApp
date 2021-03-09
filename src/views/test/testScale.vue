<template>
    <div style="padding-top:.1rem; display:flex" >
        <ul class="leftSidebar" ref="sidbar">
            <li @click="active(index)" :class="flag===index ? 'active' : ''" v-for="(item,index) in navList" :key="index">{{item.title}}</li>
        </ul>
        <div class="right">
            <div v-if='flag===0'>
                <div class="row">
                <div class="leftRow">
                    <p class="title">Achenbach儿童行为量表</p>
                    <p class="tag">量表</p>
                    <p class="count">已测评人数：125</p>
                </div>
                <div class="rightRow">
                    <button class="actionBtn">开始测评</button>
                </div>
            </div>
            <div class="row">
                <div class="leftRow">
                    <p class="title">Achenbach儿童行为量表</p>
                    <p class="tag">量表</p>
                    <p class="count">已测评人数：125</p>
                </div>
                <div class="rightRow">
                    <button class="actionBtn" @click="$router.push('/testIntroduce')">开始测评</button>
                </div>
            </div>
            </div>
            <div v-else-if='flag===1'>
                智力评测
            </div>
            <div v-else-if='flag===2'>
                睡眠评测
            </div>
            <div v-else-if='flag===3'>
                健康评测
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            flag:0,
            navList:[
                {title:'生活指数'},
                {title:'智力测评'},
                {title:'睡眠测评'},
                {title:'健康测评'}
            ],
        }
    },
    methods:{
        active(index){
           this.flag = index
        }
    }
}
</script>

<style scoped lang='less'>
.leftSidebar{
    font-size: .15rem;
    li{
        height: .56rem;
        width: .9rem;
        line-height: .56rem;
        text-align: center;
        border-bottom: 1px solid #dddddd;
    }
}
.active{
    background: #0AA7F4;
    color: #FFFFFF;
}
.right{
    background-color: #FFFFFF;
	width: 100%;
}
.row{
    display: flex;
    align-items: center;
    margin-top: .16rem;
    margin-left: .17rem;
    border-bottom: 1px solid #ddd;
    .leftRow{
        width: 1.65rem;
        margin-right: .15rem;
    }
    .title{
        font-size:.16rem;    
        font-weight: 400;
        color: #333333;
    }
    .tag{
        text-align: center;
        padding:2px;
        width: .35rem;
        height: .19rem;
        font-size: .14rem;
        margin: .1rem 0;
        background-color: #c0e1f1;
        color: #0AA7F4;
        box-shadow: 0 0 1 #0aa7f4;
        border-radius: 5px;
    }
    .count{
        font-size: .15rem;
        font-weight: 400;
        color: #999999;
        margin-bottom: .12rem;
    }
    .actionBtn{
        display: flex;
        justify-content: center;
        padding: 10px 7px;
        width: .79rem;
        height: .40rem;
        background: #0AA7F4;
        border-radius: 3px;
        font-weight: 400;
        color: #FFFFFF;
        font-size: .14rem;
        display: flex;
        border: none;
    }
}
</style>