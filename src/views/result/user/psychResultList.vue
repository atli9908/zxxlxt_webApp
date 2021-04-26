<template>
  <div>
    <div class="wrapList">
      <ul>
        <li class="list" v-for="(item,index) in dataList" :key="index">
          <span class="tag" :style="{backgroundColor:randomColor[index]}">分卷{{index+1}}</span>
          <div class="content">
            <div class="ps">
              <p class="title">{{item.gaugeTitle}}</p>
              <p class="time">发布时间：{{item.addTime}}</p>
            </div>
            <div class="status">
                <div v-if="item.isView==1">
                    <van-badge :dot="item.isRead=='0' ? true : false">
                        <button :class="item.isRead=='0' ? 'onBtn' : 'unBtn'" @click="toBtn(item)">查看</button>
                    </van-badge>
                </div>
                <button v-else class="unBtn" style="background-color:#eee;color:#999" @click="notBtn()">查看</button>
            </div>      
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import {getSurveyResultList,getReadTable} from '../../../utils/api/result';
import {formatDate2} from '../../../utils/common'; 
export default {
    data(){
        return {
            uid:JSON.parse(localStorage.getItem("userInfo")).data.list.uid,
            dataList:[],
            dataInfo:{},
            randomColor:['#0AA7F4','#EC6941','#F19EC2','#EEAD0E','#E066FF','#B3EE3A','#0AA7F4','#EC6941','#F19EC2','#EEAD0E','#E066FF','#B3EE3A'] //随机颜色
        }
    },
    methods:{
        getSurveyResultList(){
            getSurveyResultList({
                uid:this.uid,
                publishId:this.$route.query.publishId
            }).then(res=>{
                console.log(res);
                res.data.list.forEach(item=>{
                    item.addTime = formatDate2(item.addTime)
                });
                this.dataList = res.data.list;
            })
        },
        toBtn({recordId}){
          getReadTable({  //是否已读接口
              uid:this.uid,
              testType:3,
              id:recordId
          });
          this.$router.push({name:'ScaleResult',query:{id:recordId,testType:3}});
        },
        notBtn(){
          this.$dialog.confirm({
            title: '提示',
            message: '你暂时无法查看该内容，请联系管理员！',
          })
          .then(() => {
            // on confirm
          })
          .catch(() => {
            // on cancel
          });
        }
    },
    created(){
        this.getSurveyResultList();
    },
}
</script>

<style lang="less" scoped>
.wrapList {
  padding: 0 14px;
}
.list {
  margin-top: 10px;
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
      display: flex;
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
    margin-left: 10px;
    margin-top: -45px;
    /deep/.van-badge--fixed{
        top: 82px;
    }
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
    .onBtn{
        font-size: 14px;
        color: #fff;
        width: 63px;
        height: 35px;
        background: #0AA7F4;
        border-radius: 3px;
        border: 0;
        margin-left: 20px;
    }
    .unBtn{
        font-size: 14px;
        color: #333;
        width: 63px;
        height: 35px;
        background: #fff;
        border-radius: 3px;
        margin-left: 20px;
        border: 1px solid #ddd;
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