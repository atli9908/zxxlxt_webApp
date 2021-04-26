<template>
  <div>
    <div>
      <van-nav-bar :title="$route.meta.title" class="nav-bar">
        <template #left>
            <i class="iconfont icon-changyongicon-" style="font-size:.28rem;color:#707070"  @click="backRouter()"></i>
        </template>
        <template #right>
            <span class="linkCard" @click="submitBtn()">确定</span>
        </template>
      </van-nav-bar>
    </div>
    <div>
      <van-search v-model="reqJson.value" placeholder="搜索" background="#f5f5f5" />
    </div>
    <div class="ask">
      <div class="title">
        <span>—— <span style="margin:0 10px">选择条件筛选</span> ——</span>
      </div>
      <div class="btn">
        <span @click="reqJson.status=1,flag=0" :class="flag==0?'active':''">咨询的记录</span>
        <span @click="reqJson.status=4,flag=1" :class="flag==1?'active':''">预约的记录</span>
      </div>
      <div class="btn">
        <span @click="reqJson.status=3,flag=2" :class="flag==2?'active':''">已回复的</span>
        <span @click="reqJson.status=2,flag=3" :class="flag==3?'active':''">未回复的</span>
      </div>
    </div>
    <div class="askTime">
      <span class="lable">开始日期：</span>
      <van-field
        readonly
        clickable
        name="calendar"
        :value="reqJson.startTime"
        placeholder="选择开始日期"
        @click="startShowCalendar = true"
        is-link
      />
      <van-calendar v-model="startShowCalendar" @confirm="startOnConfirm" :min-date="minDate"/>

      <span class="lable">结束日期：</span>
      <van-field
        readonly
        clickable
        name="calendar"
        :value="reqJson.endTime"
        placeholder="选择结束日期"
        @click="endShowCalendar = true"
        is-link
      />
      <van-calendar v-model="endShowCalendar" @confirm="endOnConfirm" :min-date="minDate"/>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      flag:-1,
      reqJson:{
        value: "",
        status:"",
        startTime:'',
        endTime:'',
        active:1
      },
      startShowCalendar: false,
      endShowCalendar: false,
      minDate:new Date(2021,0,1)
    };
  },
  methods: {
    backRouter(){   
      this.$router.push({name:'ExpertList',params:{active:1}});
    },
    submitBtn(){  //确定
        this.$router.push({name:'ExpertList',params:this.reqJson});
    },
    startOnConfirm(date) {
      console.log(+date)
      this.reqJson.startTime = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
      this.startShowCalendar = false;
    },
    endOnConfirm(date) {
      console.log(date)
      this.reqJson.endTime = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
      this.endShowCalendar = false;
    }
  }
};
</script>

<style lang="less" scoped>
.van-search__content {
  background: #fff;
}
.ask {
  background-color: #fff;
  padding-bottom: 20px;
  .title {
    font-size: 16px;
    color: #999999;
    text-align: center;
    padding-top: 41px;
    margin-bottom: 35px;
  }
  .btn {
    display: flex;
    justify-content: center;
    margin: 10px 0;
    span {
      text-align: center;
      display: inline-block;
      font-size: 15px;
      font-weight: 400;
      color: #555555;
      padding: 15px 0;
      margin: 0 5px;
      width: 167px;
      border: 1px solid #eee;
      border-radius: 7px;
    }
  }
}
.askTime {
  padding: 10px 15px 20px 15px;
  margin-top: 10px;
  background-color: #fff;
  display: flex;
  flex-wrap: wrap;
  .lable{
      font-size: 16px;
      color: #999999;
      margin: 27px 0 20px 0;
  }
  .van-cell{
      border: 1px solid #eee;
      border-radius: 7px;
  }
}
.active{
  background-color: #a4e1ff;
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