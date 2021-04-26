<template>
    <div>
        <div class="wrap">
            <div class="info" style="border-bottom: 1px solid #eee;">
                <img :src="global.ip + detailList.consulterAvatar" alt="">
                <div>
                    <p style="color:#333;font-size:.17rem">我咨询的问题</p>
                    <span class="tint">{{formData}}</span>
                </div>
                <span class="tint" style="margin-left:.1rem;padding-top:5px">{{detailList.isReply=='0' ? '(未回复)' : '(已回复)'}}</span>
            </div>
            <div class="msg">
                {{detailList.question}}
            </div>
            <div style="margin-top:.2rem" v-if="detailList.type == '2'">
                <p style="margin-bottom:.13rem;font-size:.16rem;color:#333">我预约的日期：</p>
                <div>
                    <div class="date" style="background-color: #01A4FD;margin-bottom:.1rem">
                        <img :src="global.iconPic.date" alt="">
                        <span class="date_time">预约日期：{{detailList.workDate}}</span>
                    </div>
                    <div class="date" style="background-color: #36D5E5;">
                        <img :src="global.iconPic.time" alt="">
                        <span class="date_time">预约时段：{{detailList.hourRange}}</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="wrap" v-if="detailList.isReply == '1'">
            <div class="info">
                <img :src="global.ip + detailList.expertAvatar" alt="">
                <div>
                    <p style="color:#333;font-size:.17rem">{{detailList.expertName}}回复</p>
                    <span class="tint">{{detailList.replyTime}}</span>
                </div>
            </div>
            <div class="write">
                {{detailList.reply}}
            </div>
        </div>
    </div>
</template>

<script>
import {getDetailById} from '../../utils/api/expert';
import {formatDate2} from '../../utils/common';
export default {
    data(){
        return {
            detailList:''
        }
    },
    methods:{
        getDetailById(){
            getDetailById({
                uid:JSON.parse(localStorage.getItem("userInfo")).data.list.uid,
                consultId:this.$route.query.consultId
            }).then(res=>{
                this.detailList = res.data.list;
                console.log(res)
            })
        }
    },
    mounted(){
        this.getDetailById();
    },
    computed:{
        formData(){
            return formatDate2(this.detailList.addTime);
        }
    }
}
</script>

<style scoped lang='less'>
.wrap{
    margin-top: 10px;
    background-color: white;
    padding: 20px 17px 30px 17px;
    font-size: 15px;
    .info{
        display: flex;
        padding-bottom: 15px;
        img{
            width: 42px;
            height: 42px;
            border-radius: 50%;
            margin-right: 13px;
        }
        .tint{
            color:#999;
            font-size:.13rem
        }
    }
    .msg{
        margin-top: 10px;
        text-indent:2em;
        color: #555555;
        line-height: 28px;
    }
    .date{
        height: 49px;
        opacity: 1;
        border-radius: 7px;
        display: flex;
        align-items: center;
        img{
            width: 17px;
            margin: 0 13px 0 13px;
        }
    }
    .date_time{
        color: white;
        font-size: 16px;
    }
    .write{
        padding: 20px 17px 40px 17px;
        opacity: 1;
        background: #f7f7f7;
        border: 0px solid #b5b5b5;
        color: #333;
        line-height: 28px;
        border-radius: 7px;
        text-indent:2em;
    }
}
</style>