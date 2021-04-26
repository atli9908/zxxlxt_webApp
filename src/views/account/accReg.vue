<template>
  <div>
    <div>
      <van-form class="formTitle" required>
        <span>请输入账号：</span>
        <van-field v-model="regUserInfo.username" name="用户名" placeholder="字母 + 数字组成"/>
        <span>请输入密码：</span>
        <van-field v-model="regUserInfo.pwd" type="password" name="用户名" placeholder="字母 + 数字组成,不超过16个字符" />
        <span>真实姓名：</span>
        <van-field v-model="regUserInfo.nickname" name="用户名" />
        <span>所在班级/部门：</span>
        <van-field
          readonly
          clickable
          name="picker"
          right-icon="arrow-down"
          v-model="department"
          placeholder="选择部门/班级"
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
        <van-field v-model="regUserInfo.studentId" name="学号/编号"/>
        <button class="loginBtn" @click="submitRes">完成注册</button>
      </van-form>
    </div>
  </div>
</template>

<script>
import {getDept,reg} from '../../utils/api/account.js';
export default {
  data() {
    return {
      regUserInfo:{
        username: "",
        pwd:'',
        nickname:'',
        deptid:'',
        studentId:'',
        status:1,
      },
      department:'',
      columns: [],
      showPicker: false,
      userExp:/(?!^\d+$)(?!^[a-zA-Z]+$)[0-9a-zA-Z]{4,8}/
    };
  },
  methods: {
    onConfirm(value) {
      this.department = value.text;
      this.deptid = value.id
      this.showPicker = false;
    },
    //注册
    submitRes(){
      if(this.regUserInfo.username && this.regUserInfo.pwd && this.regUserInfo.nickname && this.department && this.regUserInfo.studentId){
        if(this.userExp.test(this.regUserInfo.username)){
          reg(this.regUserInfo).then(res=>{
            if(res && res.code=="0"){
              this.$toast.success(res.message);
              this.$router.push('/login');
            }else{
              this.$toast.fail(res.message);
            }
          })
        }else{
          this.$notify({ type: 'danger', message: '用户名必须由字母 + 数字组成，最少4个字符' });
        }
      }else{
        this.$notify({ type: 'warning', message: '必须填写所有字段' });
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
    }
  },
  created(){
    this.initDept()
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