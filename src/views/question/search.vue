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
      <van-search v-model="value" placeholder="搜索" background="#f5f5f5" />
    </div>
    <div class="ask">
      <div class="title">
        <span>—— <span style="margin:0 10px">选择条件搜索</span> ——</span>
      </div>
      <div class="issuer">
        <van-field
          readonly
          
          name="picker"
          :value="issuer"
          placeholder="选择发布人"
          :is-link="true"
          @click="showPicker = true"
        />
        <van-popup v-model="showPicker" position="bottom">
          <van-picker
            show-toolbar
            :columns="columns"
            @confirm="onConfirm"
            @cancel="showPicker = false"
          />
        </van-popup>
      </div>
      <span class="lable">开始日期：</span>
      <van-field
        readonly
        clickable
        name="calendar"
        :value="startTime"
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
        :value="endTime"
        placeholder="选择结束日期"
        @click="endShowCalendar = true"
        is-link
      />
      <van-calendar v-model="endShowCalendar" @confirm="endOnConfirm" :min-date="minDate"/>
    </div>
  </div>
</template>

<script>
import {getQuestionPublishers} from '../../utils/api/test';
export default {
  data() {
    return {
      uid:JSON.parse(localStorage.getItem("userInfo")).data.list.uid,
      value: "",
      issuer:'',      //发布人
      publisherUid:null,
      startTime:'',
      endTime:'',
      columns: [],
      showPicker: false,
      startShowCalendar: false,
      endShowCalendar: false,
      minDate:new Date(2021,0,1)
    };
  },
  methods: {  //返回
    backRouter(){   
      this.$router.push('/questnaire');
    },
    submitBtn(){  //确定
      this.$router.push({name:'Questnaire',query:{name:this.value,publisherUid:this.publisherUid,starttime:this.startTime,endtime:this.endTime}});
    },
    startOnConfirm(date) {
      let Month = (date.getMonth()<10) ? '0'+(date.getMonth()+1) : date.getMonth()+1;
      let day = (date.getDate()<10) ? '0'+date.getDate() : date.getDate();
      this.startTime = `${date.getFullYear()}-${Month}-${day}`;
      this.startShowCalendar = false;
    },
    endOnConfirm(date) {
      let Month = (date.getMonth()<10) ? '0'+(date.getMonth()+1) : date.getMonth()+1;
      let day = (date.getDate()<10) ? '0'+date.getDate() : date.getDate();
      this.endTime = `${date.getFullYear()}-${Month}-${day}`;
      this.endShowCalendar = false;
    },
    onConfirm(value) {
      this.issuer = value.text;
      this.publisherUid = value.publisherUid;
      this.showPicker = false;
    },
    getPublishers(){  //获取发布人
      getQuestionPublishers({
        uid:this.uid,
      }).then(res=>{
        if(res.data.list.length>0){
          res.data.list.forEach((item,index)=>{
            this.columns[index] = {text:item.nickname,publisherUid:item.publisherId};
          })
        }else{
          return;
        }
      })
    }
  },
  created(){
    this.getPublishers();
  }
};
</script>

<style lang="less" scoped>
.van-search__content {
  background: #fff;
}
.ask {
  .issuer{
    width: 100%;
  }
  padding: 10px 15px 20px 15px;
  background-color: #fff;
  display: flex;
  flex-wrap: wrap;
  .title {
    width: 100%;
    font-size: 16px;
    color: #999999;
    text-align: center;
    padding-top: 36px;
    margin-bottom: 32px;
  }
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
////nav
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