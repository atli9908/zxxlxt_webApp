<template>
  <div style="padding-top:.1rem; display:flex">
    <ul class="leftSidebar" ref="sidbar">
      <li
        v-for="(item,index) in navList"
        @click="active(index,item)"
        :class="flag===index ? 'active' : ''"
        :key="index"
      >{{item.title}}</li>
    </ul>

    <div class="right">
      <div>
        <div class="row" v-for="(item,index) in subTableList" :key="index">
          <div class="leftRow">
            <p class="title">{{item.gaugeTitle}}</p>
            <p class="tag">{{item.gauge_type}}</p>
            <p class="count">已测评人数：{{item.views}}</p>
          </div>
          <div class="rightRow">
            <button class="actionBtn" @click="actionBtn(item)">开始测评</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {getTableCat,subTable} from '../../utils/api/test.js';
export default {
  data() {
    return {
      uid:JSON.parse(localStorage.getItem('userInfo')).data.list.uid,
      resData: {
        uid:this.uid,
        status:1
      },
      flag: 0,
      navList: [],
      subTableList:[],
      topicInfo:[]
    };
  },
  methods: {
    active(index,data) {
      subTable({uid:this.uid,catId:data.catId,status:2}).then(res=>{
        this.subTableList = res.data.list;
        console.log(res)
      })
      this.flag = index;
    },
    initTableCat(){
      getTableCat(this.resData).then(res=>{
        let data = res.data.list;
        this.navList = data;
      })
    },
    actionBtn(data){
      this.$router.push({name:'ScaleIntroduce', query:{uid:this.uid,id:data.id,publishId:data.publishId}});
    }
  },
  created(){
    this.initTableCat();
  }
};
</script>

<style scoped lang='less'>
.leftSidebar {
  font-size: 0.15rem;
  li {
    height: 0.56rem;
    width: 0.9rem;
    line-height: 0.56rem;
    text-align: center;
    border-bottom: 1px solid #dedede;
  }
}
.active {
  background: #0aa7f4;
  color: #ffffff;
}
.right {
  background-color: #ffffff;
  width: 100%;
  height: calc(~"100vh - 53px");
}
.row {
  display: flex;
  align-items: center;
  margin-top: 0.16rem;
  margin-left: 0.17rem;
  border-bottom: 1px solid #dfdfdf;
  .leftRow {
    width: 1.65rem;
    margin-right: 0.15rem;
  }
  .title {
    font-size: 0.16rem;
    font-weight: 400;
    color: #333333;
  }
  .count {
    font-size: 0.15rem;
    font-weight: 400;
    color: #999999;
    margin-bottom: 0.12rem;
  }
  .actionBtn {
    display: flex;
    justify-content: center;
    padding: 10px 7px;
    width: 0.79rem;
    height: 0.4rem;
    background: #0aa7f4;
    border-radius: 3px;
    font-weight: 400;
    color: #ffffff;
    font-size: 0.14rem;
    display: flex;
    border: none;
  }
}
</style>