<template>
  <div>
    <div class="account-bg">
      <img :src="global.iconPic.account_logo" alt class="logo" style=""/>
      <img :src="global.iconPic.login_logo" alt class="logo2" />
      <div class="msgBox">
          <input type="text" class="userIpt" placeholder="请输入账号" v-model="username" required autocomplete="off" src='../../assets/img/login/user.png'/>
          <div style="width:3.13rem;height:1px;background: #DDDDDD;"></div>
          <input type="password" class="pwdIpt" placeholder="请输入密码" v-model="password" required autocomplete="new-password"/>
      </div>
    </div>
    <div class="btnBox">
      <button class="loginBtn" @click="handLogin">登录</button>
      <button class="resBtn" @click="$router.push('/Reg')">注册</button>
    </div>
    <div class="footer">
      <span>@ 2019-2021 All Rights Reserved.心理测评系统</span>
    </div>
  </div>
</template>

<script>
import {getLogin} from '../../utils/api/account.js';
export default {
  data(){
    return {
      username:'',
      password:'',
      device:'mobile'
    }
  },
  methods:{
    handLogin(){
      getLogin({
        username:this.username,
        pwd:this.password,
      }).then(res=>{
        console.log(res)
        if(res.code==='0'){
         localStorage.setItem('userInfo',JSON.stringify(res));
         this.$notify({ type: 'success', message: res.message });
         this.$router.push('/');
        }else{
          this.$notify({ type: 'warning', message: res.message });
          console.log(11)
        }
      }).catch(err=>{
        console.log(err)
      });
    }
  }
}
</script>

<style scoped lang='less'>
input{
  height: .4rem;
  width: 3.2rem;
  border: 0;
  outline:none;
  padding-left: 80px;
  font-size: .16rem;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: #555555;
}
.account-bg {
  box-sizing: border-box;
  height: 2.01rem;
  width: 100%;
  background: url("../../assets/img/account/bg.png");
  background-size: cover;
  text-align: center;
  padding-top: .53rem;
}
.msgBox {
  width: 3.47rem;
  height: 1.04rem;
  background: #ffffff;
  box-shadow: 0px 0px 7px 0px rgba(153, 153, 153, 0.1);
  border-radius: 7px;
  margin: 0 auto;
  margin-top: 0.6rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
}
.logo {
  height: 0.2rem;
  width: 1.27rem;
  display: block;
  margin: 0 auto;
}
.logo2{
  width: 2.46rem;
  height: .29rem;
  display: block;
  margin: 0 auto;
  margin-top: .16rem;
}
.userIpt{
  background: url('../../assets/img/login/user.png') no-repeat;
  background-size: (.21rem);
  background-position:.26rem;
}
.pwdIpt{
  background: url('../../assets/img/login/pwd.png') no-repeat;
  background-size: (.21rem);
  background-position:.26rem
}
.btnBox{
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  margin-top: 2.04rem;
}
.loginBtn{
  width: 3.47rem;
  height: .56rem;
  background: #149EE3;
  border-radius: .28rem;
  border: 0;
  font-size: .17rem;
  color: #ffffff;
}
.resBtn{
  width: 3.47rem;
  height: .56rem;
  background: #FFFFFF;
  border: 0px solid #D2D2D2;
  border-radius: .28rem;
  font-size: .17rem;
  color: #555555;
  margin-top: .17rem;
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