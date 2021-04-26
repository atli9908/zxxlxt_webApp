<template>
  <div>
    <div>
      <van-nav-bar :title="$route.meta.title" class="nav-bar">
          <template #left>
              <i class="iconfont icon-changyongicon-" style="font-size:.28rem;color:#707070"  @click="backRouter()"></i>
          </template>
          <template #right>
              <i class="iconfont icon-search" style="font-size:.22rem;color:#707070;padding-right:.1rem" @click="handSearch()"></i>
          </template>
      </van-nav-bar>
    </div>
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
      <div v-if="subTableList && subTableList.length>0">
        <div class="row" v-for="(item,index) in subTableList" :key="index">
          <div class="leftRow">
            <p class="title">{{item.gaugeTitle}}</p>
            <p class="tag">量表</p>
            <p class="count">已测评人数：{{item.views}}</p>
          </div>
          <div class="rightRow">
            <button class="sizeBtn" @click="actionBtn(item)">{{item.isContinue=='0' ? '开始测评':'继续测评'}}</button>
          </div>
        </div>
      </div>
      <div class="notHave" v-else>
        <span>该分类暂无评测</span>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
import { getTableCat, subTable } from "../../utils/api/test.js";
export default {
  data() {
    return {
      uid: JSON.parse(localStorage.getItem("userInfo")).data.list.uid,
      catId: "",
      resData: {
        uid: this.uid,
        status: 1
      },
      flag: this.$route.params.flag ? this.$route.params.flag : 0,
      navList: [], //分类
      subTableList: [], //题目列表
      topicInfo: [],
    };
  },
  methods: {
    backRouter(){   
      this.$router.push('/');
    },
    handSearch(){
      this.$router.push({name:'ScaleSearch',query:{flag:this.flag}});
    },
    initTableCat() {
      getTableCat(this.resData).then(res => {  //获取量表分类
        let data = res.data.list;
        this.navList = data;
        this.catId = data[0].catId;
        subTable({  //获取子列表
          uid: this.uid, 
          catId: data[this.flag].catId, 
          status: 2 ,
          name:this.$route.params.name,
          orderBy:this.$route.params.orderBy
        }).then(res => { 
          this.subTableList = res.data.list;
        });
        console.log(res)
      });
    },
    active(index, data) {
      subTable({ uid: this.uid, catId: data.catId, status: 2 }).then(res => {
        this.subTableList = res.data.list;
      });
      this.flag = index;
    },
    actionBtn(data) {
      this.$router.push({
        name: "ScaleIntroduce",
        query: { uid: this.uid, id: data.id, publishId: data.publishId, flag:this.flag, type:'lb'}
      });
    }
  },
  created() {
    console.log(this.$route.params,this.$route);
    this.initTableCat();
  }
};
</script>

<style scoped lang='less'>
.notHave{
  margin-top: .2rem;
  color: #333333;
  font-size: .16rem;
  text-align: center;
}
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