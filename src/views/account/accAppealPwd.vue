<template>
  <div>
    <van-form class="formTitle">
      <span>
        <span class="requi">*</span>输入您需要找回的账号：
      </span>
      <van-field v-model="username" type="text"/>
      <span>
        <span class="requi">*</span>请选择您所在的班级：
      </span>
      <van-field
        readonly
        clickable
        name="picker"
        right-icon="arrow-down"
        :value="department"
        placeholder="点击选择部门/班级"
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
      <van-field v-model="reason" type="textarea" rows="5" />
      <button class="loginBtn" @click="submitRes">提交</button>
    </van-form>
  </div>
</template>

<script>
import {getDept,appeal} from '../../utils/api/account';
export default {
  data() {
    return {
      username:'',
      department: "",
      reason:'',
      columns: [],
      showPicker: false
    };
  },
  methods: {
    //提交
    submitRes() {
      if(this.username!='' && this.reason!=''){
        appeal({
          username:this.username,
          reason:this.reason
        }).then(res=>{
          if(res.code=='0'){
            this.$toast.success(res.message);
          }
        })
      }else{
        this.$toast('请填写所有字段');
      }
    },
    //初始化部门
    initDept(){
      getDept({}).then(res=>{
        let data = res.data.list;
        data.forEach(item=>{
          this.columns.push({text:item.title,id:item.deptid})
        })
      })
    },
    onConfirm(value) {
      this.department = value.text;
      this.showPicker = false;
    }
  },
  created(){
    this.initDept();
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