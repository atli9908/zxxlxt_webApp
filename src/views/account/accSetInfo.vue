<template>
  <div>
    <div class="headImg">
      <img :src="userInfo.imgurl" alt />
      <div>
        <p>{{showName}}</p>
        <p style="color:#777;margin-top:.1rem">{{userInfo.account}}</p>
      </div>
      <a href="#" @click="showSheet">修改头像</a>
    </div>
    <div class="userMsg">
      <van-field v-model="userInfo.name" type="text" label="真实姓名"/>
      <van-field v-model="userInfo.age" type="number" label="年龄"/>
      <van-field name="radio" label="性别">
        <template #input>
          <van-radio-group v-model="userInfo.sex" direction="horizontal" icon-size='.15rem'>
            <van-radio name="男">男</van-radio>
            <van-radio name="女">女</van-radio>
          </van-radio-group>
        </template>
      </van-field>
      <van-field v-model="userInfo.grade" type="text" label="所在班级" disabled />
      <van-field v-model="userInfo.sid" type="number" label="学号/序号"/>
    </div>
    <div class="userPwd">
      <span>登录密码</span>
      <router-link to="/setPassword">修改</router-link>
    </div>
    <button class="submitBtn" @click="submitBtn()">确认</button>
    <van-action-sheet
      v-model="show"
      cancel-text="取消"
      close-on-click-action
      :actions="actions"
      @select="clickOption"
    >
      <div class="hidd">
        <input type="file" name="image" accept="image/*" capture="camera" ref="camera" @change="getFile">
        <input accept="image/*" type="file" ref="file" @change="getFile">
      </div>
    </van-action-sheet>
  </div>
</template>

<script>
import {userInfo} from '../../utils/api/account.js';
import global from '../../global';
export default {
  data() {
    return {
      showName:'',
      userInfo:{
        account:'',
        imgurl:'',
        name: "",       //姓名
        age: "",
        sex: "",
        grade: "",
        sid: "",
      },
      show:false,
      actions:[{ name: '拍照' }, { name: '选择本地' }],
    };
  },
  methods:{
    showSheet(){
      this.show = true;
    },
    getFile(e){    //上传头像
      console.log(e)
      let $target = e.target || e.srcElement;
      let file = $target.files[0];
      var reader = new FileReader();
      var _this = this;
      reader.onload = function (data) {
        let res = data.target || data.srcElement
        let imgurl = res.result;
        _this.userInfo.imgurl = imgurl;
      }
      reader.readAsDataURL(file)
    },
    clickOption(ontion,index){
      if(index===0){
        this.$refs.camera.click();
      }else{
        this.$refs.file.click();
      }
    },
    initInfo(){   //初始化用户信息
      userInfo({
        uid:JSON.parse(localStorage.getItem("userInfo")).data.list.uid,
        status:1
      }).then(res=>{
        if(res && res.code=='0'){
          let dataInfo = res.data.list;
          this.showName = dataInfo.nickname;
          this.userInfo.account = dataInfo.username;
          this.userInfo.imgurl = global.ip +  dataInfo.avatar;
          this.userInfo.name = dataInfo.nickname;
          this.userInfo.age = dataInfo.age;
          this.userInfo.sex = dataInfo.sex;
          this.userInfo.grade = dataInfo.deptname;
          this.userInfo.sid = dataInfo.studentId;
        }
      })
    },
    submitBtn(){ //修改提交
      userInfo({
        uid:JSON.parse(localStorage.getItem("userInfo")).data.list.uid,
        status:3,
        avatar:this.userInfo.imgurl,
        nickname:this.userInfo.name,
        age:this.userInfo.age,
        sex:this.userInfo.sex,
        studentId:this.userInfo.sid,
      }).then(res=>{
        if(res && res.code=='0'){
          this.showName = res.data.list.nickname;
          let userInfo = JSON.parse(localStorage.getItem('userInfo'));
          userInfo.data.list.avatar = res.data.list.avatar;
          userInfo.data.list.nickname = res.data.list.nickname;
          localStorage.setItem('userInfo',JSON.stringify(userInfo));
          this.$toast('修改成功！');
        }else{
          this.$toast('修改失败！');
        }
      })
    }
  },
  created(){
    this.initInfo();
  }
};
</script>

<style scoped lang='less'>
/deep/.van-field__control{
  display: flex;
  justify-content: flex-end;
}
/deep/.van-radio-group{
  margin-right: -10px;
}
.headImg {
  margin-top: 0.1rem;
  width: 3.75rem;
  height: 0.83rem;
  background: #ffffff;
  display: flex;
  align-items: center;
  img {
    margin: 0 0.12rem;
    width: 0.56rem;
    height: 0.56rem;
    border-radius: 50%;
  }
  p {
    font-size: 0.16rem;
    font-weight: 400;
    color: #333333;
  }
  a {
    font-size: 0.16rem;
    font-weight: 400;
    color: #777777;
    flex: 1;
    text-align: right;
    margin-right: .2rem;
  }
}
/deep/.userMsg {
  margin-top: 0.1rem;
  .van-field__control {
    text-align: right;
    font-size: 0.16rem;
    color: #777777;
  }
  .van-field {
    height: 0.63rem;
    display: flex;
    align-items: center;
    span {
      font-size: 0.16rem;
      color: #333333;
    }
  }
}
.userPwd {
  margin-top: 0.1rem;
  height: 0.63rem;
  font-size: 0.16rem;
  background: #ffffff;
  font-weight: 400;
  color: #333333;
  display: flex;
  align-items: center;
  padding-left: 0.15rem;
  a {
    padding-left: 2.45rem;
    color: #777777;
  }
}
.submitBtn{
  width: 3.47rem;
  height: .56rem;
  background: #149EE3;
  border-radius: .28rem;
  border: 0;
  font-size: .17rem;
  color: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
  margin:.21rem auto
}
.hidd{
  font-size: .16rem;
  display: none;
}
</style>