<template>
  <div>
    <div class="headImg">
      <img src="../../assets/img/account/header.jpg" alt />
      <div>
        <p>用户账号</p>
        <p style="color:#777;margin-top:.1rem">a1235465468</p>
      </div>
      <a href="#" @click="showSheet">修改头像</a>
    </div>
    <div class="userMsg">
      <van-field v-model="name" type="text" label="真实姓名" />
      <van-field v-model="age" type="number" label="年龄" />
      <van-field v-model="sex" type="text" label="性别" />
      <van-field v-model="grade" type="text" label="所在班级" disabled />
      <van-field v-model="sid" type="number" label="学号/序号" />
    </div>
    <div class="userPwd">
      <span>登录密码</span>
      <router-link to="/setPassword">修改</router-link>
    </div>
    <button class="loginBtn">登录</button>
    <van-action-sheet
      v-model="show"
      cancel-text="取消"
      close-on-click-action
      :actions="actions"
      @select="clickOption"
    >
      <div class="hidd">
        <input type="file" name="image" accept="image/*" capture="camera" ref="camera">
        <input accept="image/*" type="file" ref="file">
      </div>
    </van-action-sheet>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: "二狗子",
      age: "18",
      sex: "公",
      grade: "三年二班",
      sid: "00001",
      show:false,
      actions:[{ name: '拍照' }, { name: '选择本地' }]
    };
  },
  methods:{
    showSheet(){
      this.show = true;
    },
    clickOption(ontion,index){
      if(index===0){
        this.$refs.camera.click();
      }else{
        this.$refs.file.click();
      }
    }
  }
};
</script>

<style scoped lang='less'>
.headImg {
  margin-top: 0.1rem;
  width: 3.75rem;
  height: 0.83rem;
  background: #ffffff;
  display: flex;
  align-items: center;
  img {
    margin: 0 0.12rem;
    width: 0.56rem;
    height: 0.56rem;
    border-radius: 50%;
  }
  p {
    font-size: 0.16rem;
    font-weight: 400;
    color: #333333;
  }
  a {
    font-size: 0.16rem;
    font-weight: 400;
    color: #777777;
    margin-left: 1.15rem;
  }
}
/deep/.userMsg {
  margin-top: 0.1rem;
  .van-field__control {
    text-align: right;
    font-size: 0.16rem;
    color: #777777;
  }
  .van-field {
    height: 0.63rem;
    display: flex;
    align-items: center;
    span {
      font-size: 0.16rem;
      color: #333333;
    }
  }
}
.userPwd {
  margin-top: 0.1rem;
  height: 0.63rem;
  font-size: 0.16rem;
  background: #ffffff;
  font-weight: 400;
  color: #333333;
  display: flex;
  align-items: center;
  padding-left: 0.15rem;
  a {
    padding-left: 2.45rem;
    color: #777777;
  }
}
.loginBtn{
  width: 3.47rem;
  height: .56rem;
  background: #149EE3;
  border-radius: .28rem;
  border: 0;
  font-size: .17rem;
  color: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
  margin:.21rem auto
}
.hidd{
  font-size: .16rem;
  display: none;
}
</style>