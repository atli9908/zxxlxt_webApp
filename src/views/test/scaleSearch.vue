<template>
    <div>
        <div>
            <van-nav-bar :title="$route.meta.title" class="nav-bar">
                <template #left>
                    <i class="iconfont icon-changyongicon-" style="font-size:.28rem;color:#707070"  @click="backRouter()"></i>
                </template>
                <template #right>
                    <span class="linkCard" @click="submitBtn()">确定</span>
                </template>
            </van-nav-bar>
        </div>
        <div>
            <van-search v-model="reqJson.name" placeholder="搜索" background="#f5f5f5"/>
        </div>
        <div class="ask">
            <div class="title">
                <span>——   <span style="margin:0 10px">选择条件筛选</span>   ——</span>
            </div>
            <div class="btn">
                <span @click="reqJson.orderBy='1'" :class="reqJson.orderBy==1 ? 'active' : ''">测评人数最多</span>
                <span @click="reqJson.orderBy='2'" :class="reqJson.orderBy==2 ? 'active' : ''">测评人数最少</span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            reqJson:{
                name:'',
                orderBy:'',
                flag:this.$route.query.flag
            }
        }
    },
    methods:{
    backRouter(){   
      this.$router.push({name:'Scale',params:this.reqJson});
    },
    submitBtn(){  //确定
      this.$router.push({name:'Scale',params:this.reqJson});
    },
    }
}
</script>

<style lang="less" scoped>
.active{
    background-color: #8ad8ff;
}
.van-search__content{
    background: #fff;
}
.ask{
    background-color: #fff;
    padding-bottom: 20px;
    .title{
        font-size: 16px;
        color: #999999;
        text-align: center;
        padding-top: 41px;
        margin-bottom: 35px;
    }
    .btn{
        display: flex;
        justify-content: center;
        span{
            text-align: center;
            display: inline-block;
            font-size: 15px;
            font-weight: 400;
            color: #555555;
            padding:15px 0;
            margin: 10px 5px;
            width: 167px;
            border: 1px solid #eee;
            border-radius: 7px;
        }
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