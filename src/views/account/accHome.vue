<template>
  <div style="120vh">
    <div class="account-bg" :style="{background:'url('+global.iconPic.account_bg+')',backgroundSize:'cover'}">
      <img :src="global.iconPic.account_logo" alt class="logo" />
      <div class="headImg">
        <img :src="global.ip + userInfo.data.list.avatar" alt />
      </div>
      <div class="account-name">
        <p>{{userInfo.data.list.nickname}}</p>
      </div>
      <div class="msgBox">
        <div class="childMsgBox">
          <p class="msgTitle">测评项目</p>
          <p class="msgData">{{testTotal}}</p>
          <p class="msgUnread">待测评</p>
        </div>
        <div class="childMsgBox">
          <p class="msgTitle">测评结果</p>
          <p class="msgData">{{resultTotal}}</p>
          <p class="msgUnread">待查看</p>
        </div>
        <div class="childMsgBox">
          <p class="msgTitle">咨询消息</p>
          <p class="msgData">{{consultTotal}}</p>
          <p class="msgUnread">未查看</p>
        </div>
      </div>
    </div>
    <div class="content">
      <div class="navMenu">
        <div class="menuTitle">
          <span>功能菜单</span>
        </div>
        <div class="menu">
          <van-grid square :column-num="3">
            <van-grid-item v-for="item in menuList" :key="item.title" @click="gotoPath(item)">
              <div class="badge" v-show="item.msg>0">
                <span class="badgeMsg">{{item.msg}}</span>
              </div>
              <img :src="item.imgSrc" alt />
              <span class="menuSpan">{{item.title}}</span>
            </van-grid-item>
          </van-grid>
        </div>
      </div>
      <div class="footer">
        <span>@ 2019-{{getYear}} All Rights Reserved.心理测评系统</span>
      </div>
    </div>
  </div>
</template>

<script>
import {getHome} from '../../utils/api/account';
export default {
  data() {
    return {
      userInfo: "",
      testTotal:'0',   //未测评总数
      resultTotal:'0',  //未读报告总数
      consultTotal:'0',  //未读咨询总数
      menuList: [
        {
          imgSrc: this.global.iconPic.menu1,
          title: "量表测评",
          msg: 0,
          path: "/scale"
        },
        {
          imgSrc: this.global.iconPic.menu2,
          title: "问卷评测",
          msg: 0,
          path: "/questnaire"
        },
        {
          imgSrc: this.global.iconPic.menu3,
          title: "心理普查",
          msg: 0,
          path: "/psych"
        },
        {
          imgSrc: this.global.iconPic.menu4,
          title: "专家咨询",
          msg: 0,
          path: "/expertList"
        },
        {
          imgSrc: this.global.iconPic.menu5,
          title: "查看结果",
          msg: 0,
          path: "/resultList"
        },
        {
          imgSrc: this.global.iconPic.menu6,
          title: "数据统计",
          msg: 0,
          path: "/statistice"
        },
        {
          imgSrc: this.global.iconPic.menu7,
          title: "个人设置",
          msg: 0,
          path: "/setInfo"
        }
      ]
    };
  },
  computed: {
    getYear() {
      let d = new Date();
      let y = d.getFullYear();
      return y;
    }
  },
  methods: {
    gotoPath(item) {
      this.$router.push(item.path);
    },
    getHome(){
      getHome({uid:this.userInfo.data.list.uid}).then(res=>{
        let data = res.data.list;
        this.testTotal=data.taskNoTest.sum;   //未测评总数
        this.resultTotal=data.reportNoRead.sum; //未读报告总数
        this.consultTotal=data.consultNoRead.sum;
        console.log(res)
          //过滤菜单栏数据
          this.menuList.filter((item,index)=>{
            if(index==0){
              item.msg = data.taskNoTest.gauge;
            }else if(index==1){
              item.msg = data.taskNoTest.questionnaire;
            }else if(index==2){
              item.msg = data.taskNoTest.survey;
            }else if(index==3){
              item.msg = data.consultNoRead.sum;
            }else if(index==4){
              item.msg = data.reportNoRead.sum;
            }
          })
      })
    }
  },
  created() {
    this.userInfo = JSON.parse(localStorage.getItem("userInfo"));
    this.getHome();
  }
};
</script>

<style lang='less' scoped>
//小红点
.badge {
  width: 0.16rem;
  height: 0.16rem;
  background: #ff0000;
  border-radius: 0.8rem;
  position: absolute;
  top: 0.15rem;
  left: 0.7rem;
  display: flex;
  justify-content: center;
  align-items: center;
}
.badgeMsg {
  font-size: 0.1rem;
  font-weight: 400;
  color: #ffffff;
  transform: scale(0.8);
}
.account-bg {
  box-sizing: border-box;
  height: 2.01rem;
  // background: url("../../assets/img/account/bg.png");
  // background-size: cover;
  padding-top: 0.1rem;
}
.logo {
  height: 0.2rem;
  width: 1.27rem;
  display: flex;
  margin-left: 0.14rem;
}
.headImg {
  width: 0.69rem;
  height: 0.69rem;
  margin: 0 auto;
  margin-top: 0.15rem;
  display: flex;
  img {
    box-sizing: border-box;
    width: 0.69rem;
    height: 0.69rem;
    border-radius: 50%;
    border: 3px solid rgba(255, 255, 255, 0.5);
    border-radius: 50%;
  }
}
.account-name p {
  font-size: 0.17rem;
  font-weight: bold;
  color: #ffffff;
  line-height: 0.22rem;
  text-align: center;
  margin-top: 0.14rem;
}
.msgBox {
  width: 3.47rem;
  height: 1.04rem;
  background: #ffffff;
  box-shadow: 0px 0px 7px 0px rgba(153, 153, 153, 0.1);
  border-radius: 7px;
  margin: 0 auto;
  margin-top: 0.16rem;
  display: flex;
  align-items: center;
  justify-content: center;
  .childMsgBox {
    width: calc(100% / 3);
    text-align: center;
    position: relative;
    &:after {
      content: " ";
      position: absolute;
      top: 0.15rem;
      left: 1.1rem;
      height: 0.46rem;
      width: 1px;
      background: #f0f0f0;
    }
    &:last-child::after {
      display: none;
    }
  }
}
.msgTitle {
  height: 0.14rem;
  font-size: 0.14rem;
  font-weight: 400;
  color: #555555;
}
.msgData {
  height: 0.17rem;
  font-size: 0.21rem;
  font-weight: 400;
  color: #333333;
  line-height: 0.22rem;
  margin-top: 0.14rem;
  margin-bottom: 0.1rem;
}
.msgUnread {
  height: 0.13rem;
  font-size: 0.13rem;
  font-weight: 400;
  color: #999999;
  line-height: 0.22rem;
}
//功能菜单
.content{
  background-color: #ffffff;
}
.navMenu {
  .menuTitle {
    margin-top: 0.78rem;
    height: 0.49rem;
    display: flex;
    align-items: center;
    span {
      font-size: 0.16rem;
      font-weight: 400;
      color: #555555;
      margin-left: 0.38rem;
    }
  }
  .menu {
    height: 3.47rem;
    width: 3.47rem;
    margin: 0 auto;
    .menuSpan {
      margin-top: 0.1rem;
      font-size: 0.15rem;
      font-weight: 400;
      color: #555555;
    }
    img {
      width: 0.42rem;
    }
  }
}
.footer {
  margin: 0 auto;
  display: flex;
  justify-content: center;
  padding: 0.39rem 0 0.23rem 0;
  span {
    font-size: 0.1rem;
    font-weight: 400;
    color: #999999;
  }
}
</style>