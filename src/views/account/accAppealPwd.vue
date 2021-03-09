<template>
  <div>
    <van-form class="formTitle">
      <span>
        <span class="requi">*</span>输入您需要找回的账号：
      </span>
      <van-field v-model="oldPassword" type="text"/>
      <span>
        <span class="requi">*</span>请选择您所在的班级：
      </span>
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
      <span>
        <span class="requi">*</span>密码找回申诉的原因：
      </span>
      <van-field v-model="toNewPassword" type="textarea" rows="5" />
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
      toNewPassword: "",
      department: "",
      columns: ["杭州", "宁波", "温州", "嘉兴", "湖州"],
      showPicker: false
    };
  },
  methods: {
    submitRes() {},
    onConfirm(value) {
      this.department = value;
      this.showPicker = false;
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