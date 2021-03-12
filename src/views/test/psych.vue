<template>
  <div class="content">
    <ul>
      <li>
        <div class="topTitle">
          <span class="tag">普查</span>
          <span class="title">校园幸福度普查</span>
        </div>
        <van-row>
          <van-col span="14">
            <div class="left">
              <p>包含试卷</p>
              <p>发布者</p>
              <p>发布日期</p>
            </div>
          </van-col>
          <van-col span="10">
            <div class="right">
              <button class="sizeBtn">开始测评</button>
              <p>剩余：06时35分</p>
            </div>
          </van-col>
        </van-row>
      </li>
      <li>
        <div class="topTitle">
          <span class="tag">普查</span>
          <span class="title">校园幸福度普查</span>
        </div>
        <van-row>
          <van-col span="14">
            <div class="left">
              <p>包含试卷</p>
              <p>发布者</p>
              <p>发布日期</p>
            </div>
          </van-col>
          <van-col span="10">
            <div class="right">
              <button class="sizeBtn">开始测评</button>
              <p>剩余：06时35分</p>
            </div>
          </van-col>
        </van-row>
      </li>
      <li>
        <div class="topTitle">
          <span :class="showTime ? 'tag' : 'tag past'">普查</span>
          <span class="title">校园幸福度普查</span>
        </div>
        <van-row>
          <van-col span="14">
            <div class="left">
              <p>包含试卷：3份</p>
              <p>发布者：二狗子</p>
              <p>发布日期：2021.2.2</p>
            </div>
          </van-col>
          <van-col span="10">
            <div class="right">
              <button :class="showTime ? 'sizeBtn' : 'sizeBtn pastBtn'" :disabled='!showTime' @click="$router.push('/666')">{{showTime?'开始测评':'删除'}}</button>
              <p v-if="showTime">剩余：{{hour}}时{{minute}}分</p>
              <p v-else>测试已过期</p>
            </div>
          </van-col>
        </van-row>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      msec: 5,  //分钟
      hour: 0,
      minute: 0,
      showTime:true
    };
  },
  methods: {
    countDown() {  //倒计时
        var minute = parseInt(this.msec % 60);
        this.msec -=1;
        this.hour = parseInt(this.msec / 60);
        this.minute = parseInt(this.msec % 60);
        this.hour = this.hour > 9 ? this.hour : "0" + this.hour;
        this.minute = this.minute > 9 ? this.minute : "0" + this.minute;
        console.log(this.hour, this.minute,this.msec);
        let timer = setTimeout(this.countDown, 1000);
         if(minute <= 0){
            this.showTime = false;
            clearTimeout(timer);
            console.log(minute)
        }
    }
  },
  created() {
    this.countDown();
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
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  p {
    font-size: 14px;
    font-weight: 400;
    color: #555555;
    margin-top: 0.18rem;
  }
}
.tag {
  padding: 2px 5px;
  color: #ffffff;
  background-color: #0aa7f4;
}
.past{
  background: #ccc;
}
.pastBtn{
  color: #555;
  background-color: #f7f7f7;
  border: 1px solid #cccccc;
}
</style>