<template>
    <div>
        <button class="loginBtn">{{title}}</button>
    </div>
</template>

<script>
export default {
    data(){},
    props:{
        title:{
            type:String,
            default:'登录'
        }
    }
}
</script>

<style scoped>
.loginBtn{
  width: 3.47rem;
  height: .56rem;
  background: #149EE3;
  border-radius: .28rem;
  border: 0;
  font-size: .17rem;
  color: #ffffff;
}
</style>