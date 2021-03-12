<template>
  <div>
    <van-overlay :show="show" @click="show = false" :lock-scroll='false'>
      <div class="wrapper">
        <div class="titleMsg">
          <span>共32题，已答9题</span>
        </div>
        <div class="list" @click.stop>
          <span class="active">1</span>
          <span class="noActive">1</span>
          <span>1</span>
          <span>1</span>
          <span>1</span>
          <span>1</span>
        </div>
      </div>
    </van-overlay>

    <van-nav-bar :title="$route.meta.title" class="nav-bar">
      <template #left>
        <i v-if="$route.path==='/login'|| $route.path==='/'" class="iconfont icon-cha" style="font-size:.28rem;color:#707070" @click="logout()"></i>
        <i v-else class="iconfont icon-changyongicon-" style="font-size:.28rem;color:#707070" @click="backRouter"></i>
      </template>
      <template #right>
        <van-popover
          :offset="[12,8]"
          placement="bottom-end"
          v-model="showPopover"
          trigger="click"
          :actions="actions"
          @select="onSelect"
          v-if="$route.path==='/login'"
        >
        <template #reference>
          <i class="iconfont icon-dian" style="font-size:.18rem;color:#707070;padding-right:.1rem"></i>
        </template>
        </van-popover>
        <span v-else-if="showLinkCard&&show===false" class="linkCard" @click="showOverlay()">答题卡</span>
        <span v-else-if="show" class="linkCard" @click="show=false">关闭</span>
        <i v-else-if="showSearch" class="iconfont icon-search" style="font-size:.22rem;color:#707070;padding-right:.1rem"></i>
      </template>
    </van-nav-bar>
  </div>
</template>

<script>
export default {
  data(){
    return {
      showPopover:false,
      actions:[{ text: '密码申诉' }, { text: '账号注册' }],
      linkCard:['ScaleTopic'],
      linkSearch:['Psych'],
      show:false
    }
  },
  methods:{
    //退出登录
    logout(){
      if(this.$route.path == '/'){
        this.$dialog.confirm({
        title: '提示',
        message: '是否退出登录！',
        }).then(() => {
            localStorage.removeItem('userInfo');
            this.$router.push('/login');
          })
        localStorage.removeItem('userInfo');
      }
      // }else if(this.$route.path == '/login'){
      //   window.location.href="about:blank";
      //   window.close();
      // }
    },
    onSelect(action,index){  //...
      if(index===0){
        this.$router.push('/appealPwd')
      }else{
        this.$router.push('/reg')
      }
    },
    backRouter(){   //回退按钮
      if(this.linkCard.includes(this.$route.name)){
        this.$dialog.confirm({
          title: '提示',
          message: '是否退出答题？',
        }).then(() => {
            this.$router.push('/scale');
          }).catch(() => {
            //
        });
      }else{
        this.$router.push('/')
      }
    },
    showOverlay(){  //答题卡遮罩层
      this.show = true;
    },
  },
  computed:{
    showLinkCard(){
      return this.linkCard.includes(this.$route.name)
    },
    showSearch(){
      return this.linkSearch.includes(this.$route.name)
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
  color: #333333;
  line-height: 25px;
}
.titleMsg{
  text-align: center;
  margin-top: .12rem;
  span{
    font-size: .17rem;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: #FFFFFF;
    line-height: 25px;
  }
}
.wrapper{
  height: 100%;
  overflow: auto;
}
.list{
  display: flex;
  flex-wrap: wrap;
  text-align: center;
  width: 3.25rem;
  margin: 0 auto;
  span{
    border-radius: 7px;
    display: inline-block;
    font-size: .16rem;
    width: .45rem;
    height: .45rem;
    text-align: center;
    line-height: .45rem;
    margin: 10px;
  }
}
.noActive{
    background-color: #FFFFFF;
    color: #777777;
}
.active{
  color:#fff;
  background-color:#0AA7F4
}
</style>