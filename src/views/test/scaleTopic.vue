<template>
  <div>
    <test-single :testOption="test" :title="title" />
  </div>
</template>

<script>
import testSingle from "@/components/common/testSingle.vue";
import { subTableById} from "../../utils/api/test.js";
export default {
  components: {
    testSingle
  },
  data() {
    return {
      show: true,
      title: "",
      test: [],
      req:{
        uid:this.$route.query.uid,
        id:this.$route.query.gauge_id,
        publishId:this.$route.query.publishId
      }
    };
  },
  methods: {
    subTableById(){        //获取单套量表题目
      subTableById(this.req).then(res => {
        this.title = res.data.Info[0].title;
        this.test = res.data.list;
        console.log(this.test,'test')
        console.log(res)
      });
    },
  },
  created() {
    console.log(this.$route.query)
    this.subTableById();
  }
};
</script>

<style lang="less" scoped>
.content {
  font-size: 0.16rem;
  background: #fff;
  padding: 0 0.18rem;
  margin-top: 0.1rem;
  .titleMsg {
    text-align: center;
    padding: 0.27rem 0;
    border-bottom: 0.01rem solid #eee;
    h5 {
      margin-bottom: 0.17rem;
      font-size: 0.17rem;
    }
  }
  .topic {
    margin: 0.28rem 0 0.24rem 0;
    line-height: 32px;
  }
  .tag {
    font-size: 0.13rem;
    background: #0aa7f4;
    color: #fff;
    padding: 3px 5px;
    margin-right: 5px;
    border-radius: 5px;
  }
  .list {
    padding-bottom: 0.2rem;
    li {
      font-size: 0.15rem;
      border-radius: 7px;
      padding: 19px 0 19px 18px;
      background: #f7f7f7;
      color: #555555;
      margin: 0.12rem 0;
    }
  }
}
.btn {
  display: flex;
  justify-content: center;
  margin-top: 0.35rem;
}
.next {
  font-size: 0.16rem;
  color: #ffffff;
  border: 0;
  width: 340px;
  height: 52px;
  background: #0aa7f4;
  border-radius: 7px;
}
</style>