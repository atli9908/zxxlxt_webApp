<template>
  <div>
    <van-form class="formTitle">
      <span>
        <span class="requi">*</span>输入旧密码：
      </span>
      <van-field v-model="oldPassword" type="text" name="用户名" />
      <span>
        <span class="requi">*</span>输入新密码：
      </span>
      <van-field v-model="newPassword" type="password" name="用户名" placeholder="字母 + 数字组成,不超过16个字符" />
      <span>
        <span class="requi">*</span>重新输入新密码：
      </span>
      <van-field v-model="toNewPassword" type="password" name="用户名" />
      <button class="loginBtn" @click="submitRes">提交</button>
    </van-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      oldPassword: "",
      newPassword: "",
      toNewPassword: ""
    };
  }
};
</script>

<style scoped lang='less'>
.formTitle {
  display: flex;
  flex-wrap: wrap;
  width: 3.47rem;
  margin: auto;
  .requi {
    color: #ff0000;
  }
  .van-cell {
    background: #ffffff;
    border: 0px solid #d2d2d2;
    border-radius: 7px;
  }
  span {
    margin: 0.17rem 0 0.14rem 0;
    font-size: 0.16rem;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: #555555;
  }
}
.loginBtn {
  margin-top: 0.28rem;
  width: 3.47rem;
  height: 0.56rem;
  background: #149ee3;
  border-radius: 0.28rem;
  border: 0;
  font-size: 0.17rem;
  color: #ffffff;
}
</style>