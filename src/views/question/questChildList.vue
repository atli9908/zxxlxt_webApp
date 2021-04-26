<template>
  <div>
    <div class="tips">本次问卷共有{{dataList.length}}套试题</div>
    <div class="wrapList">
      <ul>
        <li class="list" v-for="(item,index) in dataList" :key="index">
          <span class="tag" :style="{backgroundColor:randomColor[index]}">试卷{{index+1}}</span>
          <div class="content">
            <div class="ps">
              <p class="title">{{item.question_name}}</p>
              <p class="time">考试时间：1小时30分钟</p>
            </div>
            <div class="status">
                <button v-if="item.isSubmit=='0'" class="sizeBtn" @click="actionBtn(item)">{{item.is_break=='0' ? '开始测评' : '继续测评'}}</button>
                <span v-else><img src="../../assets/img/test/gou.png" alt=""> 已完成</span>
            </div>      
          </div>
        </li>
      </ul>
    </div>
    <div class="forter">离本次问卷结束还有：{{timer}}</div>
  </div>
</template>

<script>
import {startQuestionnaire} from '../../utils/api/test'
export default {
    data(){
        return {
            uid:JSON.parse(localStorage.getItem("userInfo")).data.list.uid,
            dataList:[],
            dataInfo:{},
            pastTime:'',
            timer:'0天 00:00:00',
            randomColor:['#0AA7F4','#EC6941','#F19EC2','#EEAD0E','#E066FF','#B3EE3A','#0AA7F4','#EC6941','#F19EC2','#EEAD0E','#E066FF','#B3EE3A'] //随机颜色
        }
    },
    methods:{
        getPastTime(){
             let t = setInterval(()=>{
                this.pastTime -= 1000;
                let day = Math.floor( this.pastTime / 1000 / 60 / 60 / 24);                       //天
                let hour = Math.floor(this.pastTime/1000/60/60 - (24 * day));                     //小时
                let min = Math.floor(this.pastTime / 1000 / 60 - (24 * 60 * day) - (60 * hour));  //分钟
                let sec = Math.floor((this.pastTime/1000) % 60);                                  //秒

                hour = (hour < 10) ? "0" + hour : hour;
                min = (min < 10) ? "0" + min : min;
                sec = (sec < 10) ? "0" + sec : sec;
                this.timer = `${day}天 ${hour}:${min}:${sec}`
                if(this.pastTime<0){
                  clearInterval(t);
                  this.timer = '0天 00:00:00'
                }
            },1000)
        },
        actionBtn(item){  //开始测评
            this.$router.push({name:'QuestTopic',query:{uid:this.uid,testId:item.testId,publishWhoId:this.$route.query.publishWhoId,is_break:item.is_break,startTime:+new Date()}})
        }
    },
    created(){
        startQuestionnaire(this.$route.query).then(res=>{
            this.dataList = res.data.list;
            console.log(this.dataList);
            this.pastTime = (res.data.info.endTime*1000) - (+new Date());  //获取结束时间戳
            this.getPastTime();
        });
    },
}
</script>

<style lang="less" scoped>
.tips {
  height: 16px;
  font-size: 16px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: #333333;
  text-align: center;
  margin: 28px 0;
}
.wrapList {
  padding: 0 14px;
}
.list {
  display: flex;
  height: 104px;
  border-radius: 7px;
  background-color: #fff;
  margin-bottom: 10px;
  .tag {
    width: 50px;
    height: 20px;
    color: #fff;
    // background: #0aa7f4;
    border-radius: 7px 0px 10px 0px;
    margin: 0;
    position: absolute;
  }
  .content {
      width: 100%;
    .ps {
      height: 52px;
      width: 60%;
      margin-top: 30px;
      margin-left: 20px;
      border-right: 1px solid #eee;
    }
  }
  .title {
    font-size: 17px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: #333333;
    margin-bottom: 10px;
  }
  .time {
    font-size: 13px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: #999999;
  }
  .status {
    float: right;
    margin-top: -45px;
    margin-right: 20px;
    height: 80px;
    display: flex;
    span{
        margin-top: 10px;
        margin-right: 8px;
        font-size: 14px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: #32B16C;
        position: relative;
        img{
            width: 14px;
            position: absolute;
            top: 2.5px;
            left: -18px;
        }
    }
  }
}
.forter {
  font-size: 16px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: #999999;
  text-align: center;
  margin-top: 60px;
}
</style>