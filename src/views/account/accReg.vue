<template>
  <div>
    <div>
      <van-form class="formTitle">
        <span>请输入账号：</span>
        <van-field v-model="user" name="用户名" placeholder="字母 + 数字组成"/>
        <span>请输入密码：</span>
        <van-field v-model="pwd" type="password" name="用户名" placeholder="字母 + 数字组成,不超过16个字符" />
        <span>真实姓名：</span>
        <van-field v-model="name" name="用户名" />
        <span>所在班级/部门：</span>
        <van-field
          readonly
          clickable
          name="picker"
            right-icon="arrow-down"
          :value="department"
          placeholder="点击选择城市"
          @click="showPicker = true"
        />
        <van-popup v-model="showPicker" position="bottom">
          <van-picker
            show-toolbar
            :columns="columns"
            @confirm="onConfirm"
            @cancel="showPicker = false"
          />
        </van-popup>
        <span>学号/编号：</span>
        <van-field v-model="id" name="用户名"/>
        <button class="loginBtn" @click="submitRes">完成注册</button>
      </van-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: "",
      pwd:'',
      name:'',
      department:'',
      id:'',
      columns: ["杭州", "宁波", "温州", "嘉兴", "湖州"],
      showPicker: false
    };
  },
  methods: {
    onConfirm(value) {
      this.department = value;
      this.showPicker = false;
    },
    submitRes(){
        console.log(this.user,this.pwd,this.name,this.department,this.id)
        this.$toast.success('账号注册成功!');
    }
  }
};
</script>

<style scoped lang='less'>
.formTitle {
  display: flex;
  flex-wrap: wrap;
  width: 3.47rem;
  margin: auto;
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
.loginBtn{
  margin-top: .28rem;
  width: 3.47rem;
  height: .56rem;
  background: #149EE3;
  border-radius: .28rem;
  border: 0;
  font-size: .17rem;
  color: #ffffff;
}
</style>