<template>
  <div class="content">
    <ul v-if="questionList && questionList.length>0">
      <li v-for="(item,index) in questionList" :key="item.publishInfoId">
        <div class="topTitle">
          <span class="tag" :style="item.timer == '' ? 'background-color: #ccc;' : 'background-color: #0aa7f4;'">问卷</span>
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
                <p>剩余：{{item.timer}}</p>
              </div>
              <div v-else>
                <button class="delBtn" @click="delBtn(item,index)">删除</button>
                <p style="color:#999">测试已过期</p>
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
import {getQuestionnaireList,delQuestionnaireInfo} from "../../utils/api/test.js";
import {formatDate2} from "../../utils/common.js"
export default {
  data() {
    return {
      reqJson:{
        uid:JSON.parse(localStorage.getItem("userInfo")).data.list.uid,
        curPage:'',
        pageSize:'',
        name:this.$route.query.name ? this.$route.query.name : '',
        publisherUid:this.$route.query.publisherUid ? this.$route.query.publisherUid : '',
        starttime:this.$route.query.starttime ? this.$route.query.starttime : '',
        endtime:this.$route.query.endtime ? this.$route.query.endtime : ''
      },
      hour: 0,
      minute: 0,
      showTime:true,
      questionList:[],
      uid:JSON.parse(localStorage.getItem("userInfo")).data.list.uid
    };
  },
  methods: {
    initQuestionnaireList(){
      getQuestionnaireList(this.reqJson).then(res=>{ //获取问卷列表
        console.log(res)
        this.questionList = res.data.list;
        this.questionList.forEach((item)=>{
          let time = (item.overtime*1000) - (+new Date());
          this.$set(item,'timer',this.pasNow(time));
          item.addtime = formatDate2(item.addtime);
          //计时器
          setInterval(()=>{
            time-=1000;
            this.$set(item,'timer',this.pasNow(time));
          },1000)
        })
      })
    },
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
    actionBtn(data){
      this.$router.push({
        name: "QuestDetail",
        query: { uid: this.uid, publishWhoId: data.publishWhoId}     
      })
    },
    delBtn(item,index){
      delQuestionnaireInfo({
        uid:this.uid,
        publishWhoId:item.publishWhoId
      }).then(()=>{
        this.questionList.splice(index,1);
        this.$toast.success('删除成功');
      })
    },
  },
  created() {
    this.initQuestionnaireList();
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
  .delBtn{
    width: 79px;
    height: 35px;
    opacity: 1;
    background: #f7f7f7;
    border: 1px solid #ddd;
    border-radius: 4px;
    color: #555555;
    font-size: 14px;
  }
}
.tag {
  padding: 2px 4px;
  color: #ffffff;
}
.nomsg{
  text-align: center;
  padding-top: 20px;
  color: #333;
}
</style>