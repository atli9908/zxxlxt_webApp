<template>
  <div>
    <van-nav-bar :title="$route.meta.title" class="nav-bar" v-if="!linkCard.includes(this.$route.name)">
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
        <i v-if="showSearch" class="iconfont icon-search" style="font-size:.22rem;color:#707070;padding-right:.1rem" @click="handSearch()"></i>
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
      linkCard:['ScaleTopic','PsychTopic','ScaleSearch','PsychSearch','ResultSearch','QuestSearch','Scale','ResultList','QuestTopic','ExpertList','ExpertSearch'],
      linkSearch:['Psych','Scale','ResultList','Questnaire'],
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
        }).catch(()=>{
          //
        })
      }else if(this.$route.path == '/login'){
        this.$dialog.confirm({
        title: '提示',
        message: '是否退出该窗口！',
        }).then(() => {
          window.location.href="about:blank";
          window.close();
        }).catch(()=>{
          //
        })
      }
    },
    onSelect(action,index){  //...
      if(index===0){
        this.$router.push('/appealPwd')
      }else{
        this.$router.push('/reg')
      }
    },
    backRouter(){   //回退按钮
      if(this.$route.name=='Psych'){
        this.$router.push('/')
      }else if(this.$route.name=='ResultList'){
        this.$router.push('/')
      }else if(this.$route.name=='Questnaire'){
        this.$router.push('/')
      }else if(this.$route.name=='ScaleIntroduce'){
        this.$router.push({name:'Scale',params:{flag:this.$route.query.flag}})
      }else if(this.$route.name=='ExpertDetail'){
        this.$router.push({name:'ExpertList',params:{active:this.$route.query.active}})
      }else if(this.$route.name=='ScaleResult'){
        if(this.$route.query.testType==3){
          this.$router.go(-1);
        }else{
          this.$router.push({name:'ResultList',params:{active:this.$route.query.active}})
        }
      }else if(this.$route.name=='QuestResultList'){
        this.$router.push({name:'ResultList',params:{active:this.$route.query.active}})
      }else if(this.$route.name=='PsychResultList'){
        this.$router.push({name:'ResultList',params:{active:this.$route.query.active}})
      }else{
        this.$router.go(-1);
      }
    },
    handSearch(){
      if(this.$route.name == 'Scale'){           //测评
        this.$router.push('/scaleSearch');
      }else if(this.$route.name == 'Psych'){      //心理普查
        this.$router.replace('/psychSearch');
      }else if(this.$route.name == 'Questnaire'){
        this.$router.replace('/questSearch');
      }else if(this.$route.name == 'ResultList'){    //报告
        this.$router.replace('/resultSearch');
      }
    }   //搜索
  },
  computed:{
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
</style>