<template>
  <div class="content">
    <ul v-if="surveyList && surveyList.length>0">
      <li v-for="(item,index) in surveyList" :key="item.id">
        <div class="topTitle">
          <span class="tag" :style='item.timer!="" ? "backgroundColor: #0aa7f4" : "background-color: #ccc"'>普查</span>
          <span class="title">{{item.title}}</span>
        </div>
        <van-row>
          <van-col span="14">
            <div class="left">
              <p>包含试卷：{{item.num}}</p>
              <p>发布者：{{item.nickname}}</p>
              <p>发布日期：{{item.addtime}}</p>
            </div>
          </van-col>
          <van-col span="10">
            <div class="right">
              <div v-if="item.timer!=''">
                <button class="sizeBtn" @click="actionBtn(item)">开始测评</button>
                <p v-if="showTime">剩余：{{item.timer}}</p>
              </div>
              <div v-else>
                <button class="sizeBtn" @click="delBtn(item,index)" style="backgroundColor:#F7F7F7;color:#555555;border:1px solid #ddd">删除</button>
                <p v-if="showTime" style="color:#999;width:1rem;text-align:right"> 测试已过期</p>
              </div>
            </div>
          </van-col>
        </van-row>
      </li>
    </ul>
    <div class="nomsg" v-else>
      <p>暂无普查测评</p>
    </div>
  </div>
</template>

<script>
import {getSurvey,deleteSurvey} from "../../utils/api/test.js";
import {formatDate2} from "../../utils/common.js"
export default {
  data() {
    return {
      t:'',   //计时器
      hour: 0,
      minute: 0,
      showTime:true,
      surveyList:[],
      uid:JSON.parse(localStorage.getItem("userInfo")).data.list.uid
    };
  },
  methods: {
    pasNow(time){
      if(time<0){
        return ''
      }else{
        let day = Math.floor( time / 1000 / 60 / 60 / 24);                       //天
        let hour = Math.floor(time / 1000 / 60 / 60 - (24 * day));                //小时
        let min = Math.floor(time / 1000 / 60 - (24 * 60 * day) - (60 * hour));  //分钟
        hour = (hour < 10) ? "0" + hour : hour;
        min = (min < 10) ? "0" + min : min;
        return `${day}天${hour}时${min}分`;
      }
    },
    initSurvey(){
      getSurvey({    //获取任务列表
        uid:JSON.parse(localStorage.getItem("userInfo")).data.list.uid,
        name:this.$route.query.name,
        publisherUid:this.$route.query.publisherUid,
        starttime:this.$route.query.starttime,
        endtime:this.$route.query.endtime
      }).then(res=>{
        console.log(res)
        this.surveyList = res.data.list;
        this.surveyList.forEach(item=>{
          item.addtime = formatDate2(item.addtime);  //转日期格式
          let time = (item.overtime*1000) - (+new Date());
          this.$set(item,'timer',this.pasNow(time));
          this.t = setInterval(()=>{
            time-=1000;
            this.$set(item,'timer',this.pasNow(time));
          },1000)
        })
      })
    },
    actionBtn(data){
      this.$router.push({
        name: "PsychIntro",
        query: { uid: this.uid, id: data.id}     
      })
    },
    delBtn(data,index){
      deleteSurvey({
        uid: this.uid,
        id: data.id
      }).then(res=>{
        if(res.code=='0'){
          this.surveyList.splice(index,1)
          this.$toast.success(res.message);
        }
      })
    }
  },
  created() {
    this.initSurvey();
  },
  destroyed(){
    //离开页面销毁定时器
    clearInterval(this.t);
  },
  beforeRouteLeave(to,from,next){
      if(to.name == 'PsychSearch'){
          from.meta.keepAlive = false;
      }else{
          from.meta.keepAlive = true;
      }
      next();
  }
};
</script>

<style scoped lang='less'>
.content {
  background-color: white;
  font-size: 0.16rem;
  padding: 0 0.17rem;
  margin-top: 10px;
  min-height: calc(~"100vh - 53px");
  li {
    border-bottom: 1px solid #eeeeee;
    padding-bottom: 0.2rem;
    padding-top: 0.2rem;
  }
}
.title {
  color: #333333;
}
.left {
  p {
    margin-top: 0.12rem;
    font-size: 14px;
    font-weight: 400;
    color: #777777;
  }
}
.right {
  div{
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-end;
  }
  p {
    font-size: 14px;
    font-weight: 400;
    color: #555555;
    margin-top: 0.18rem;
  }
}
.tag {
  padding: 2px 4px;
  color: #ffffff;
}
.past{
  background: #ccc;
}
.pastBtn{
  color: #555;
  background-color: #f7f7f7;
  border: 1px solid #cccccc;
}
.nomsg{
  text-align: center;
  padding-top: 20px;
  color: #333;
}
</style>