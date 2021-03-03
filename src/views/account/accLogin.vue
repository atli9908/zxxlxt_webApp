<template>
  <div>
    <header-nav></header-nav>
    <div class="account-bg">
      <img :src="global.iconPic.account_logo" alt class="logo" />
      <div class="headImg"></div>
      <div class="msgBox"></div>
    </div>
  </div>
</template>

<style scoped>
.account-bg {
  box-sizing: border-box;
  height: 2.01rem;
  width: 100%;
  background: url("../../assets/img/account/bg.png");
  background-size: cover;
  padding-top: 0.1rem;
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
}
</style>