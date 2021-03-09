<template>
  <div>
    <van-nav-bar :title="$route.meta.title" class="nav-bar">
      <template #left>
        <i v-if="$route.path==='/login'|| $route.path==='/'" class="iconfont icon-cha" style="font-size:.25rem;color:#707070"></i>
        <i v-else class="iconfont icon-changyongicon-" style="font-size:.25rem;color:#707070" @click="backRouter"></i>
      </template>
      <template #right>
        <van-popover
          :offset="[12,8]"
          placement="bottom-end"
          v-model="showPopover"
          trigger="click"
          :actions="actions"
          @select="onSelect"
        >
        <template #reference>
          <i class="iconfont icon-dian" style="font-size:.18rem;color:#707070;padding-right:.1rem" v-if="$route.path==='/login'"></i>
        </template>
        </van-popover>
      </template>
    </van-nav-bar>
  </div>
</template>

<script>
export default {
  data(){
    return {
      showPopover:false,
      actions:[{ text: '密码申诉' }, { text: '账号注册' }]
    }
  },
  methods:{
    onSelect(action,index){
      if(index===0){
        this.$router.push('/appealPwd')
      }else{
        this.$router.push('/reg')
      }
    },
    backRouter(){
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="less" scoped>
.nav-bar {
  height: 0.43rem;
}
/deep/.van-nav-bar__content {
  height: 0.43rem;
}
/deep/.van-nav-bar__title {
  font-size: 0.17rem;
  width: 13.7rem;
  font-weight: 400;
  color: #000000;
}
.nav-icon {
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 1px;
}
</style>