<template>
    <div>
        <div class="wrap">
            <div class="info">
                <div class="infoImg">
                    <img :src="global.ip + expertInfo.avatar" alt="">
                </div>
                <div class="infoMsg">
                    <p class="name">{{expertInfo.nickname}} <span class="status"> (可预约)</span></p>
                    <p>性别：{{expertInfo.sex}}</p>
                    <p>年龄：{{expertInfo.age}}</p>
                    <p>{{expertInfo.job}}</p>
                </div>
            </div>
            <div class="intro">
                <p>{{expertInfo.resume}}</p>
            </div>
        </div>
        <div class="wrap" style="padding-bottom: 50px;">
            <div class="formTitle">
                <p>填写咨询信息</p>
            </div>
            <div class="radioBox">
                <van-radio-group v-model="radio" direction="horizontal" icon-size='16px'>
                    <label>需要面谈：</label>
                    <van-radio name="1">否</van-radio>
                    <van-radio name="2">是</van-radio>
                </van-radio-group>
            </div>
            <div v-if="radio==1">
                <label>咨询事项：</label>
                <van-field
                    v-model="question"
                    rows="4"
                    autosize
                    type="textarea"
                    placeholder="请输入留言"
                />
            </div>
            <!-- 预约 -->
            <div v-else>
                <label><span style="color:red">*</span>要预约的日期：</label>
                <van-field
                    readonly
                    clickable
                    name="calendar"
                    :value="subDate"
                    placeholder="点击选择日期"
                    @click="showDate = true"
                    right-icon="arrow-down"
                    :rules="[{ required: true, message: '请填写用户名' }]"
                />
                <van-popup v-model="showDate" position="bottom">
                    <van-picker
                        show-toolbar
                        :columns="dateColumns"
                        @confirm="onDateConfirm"
                        @cancel="showPicker = false"
                    />
                </van-popup>

                <label><span style="color:red">*</span>预约时段：</label>
                <van-field
                    readonly
                    clickable
                    name="datetimePicker"
                    :value="subTime"
                    placeholder="点击选择时间"
                    right-icon="arrow-down"
                    @click="showTime = true"
                    />
                <van-popup v-model="showTime" position="bottom">
                    <van-picker
                        show-toolbar
                        :columns="timeColumns"
                        @confirm="onTimeConfirm"
                        @cancel="showTime = false"
                    />
                </van-popup>

                <label>咨询事项：</label>
                <van-field
                    v-model="question"
                    rows="4"
                    autosize
                    type="textarea"
                    placeholder="请输入需要咨询的问题"
                />
            </div>
            <div><button class="btn" @click="handSubmit()">提交</button></div>
        </div>
    </div>
</template>

<script>
import {workDate,workDateTime,consultExpert,expertInfo} from '../../utils/api/expert';
export default {
    data(){
        return {
            uid:JSON.parse(localStorage.getItem("userInfo")).data.list.uid,
            radio:"1",
            question:'',
            expertInfo:'',
            showDate: false,  //日期显示
            subDate:'',
            dateColumns:[],
            subTime: '',
            showTime: false,
            timeColumns:[],
            scheduleId:-1
        }
    },
    methods:{
        onDateConfirm(date){
            this.subDate = date;
            this.showDate = false;
            this.getTime(date);
        },
        onTimeConfirm(time) {
            if(time && time.text){
               this.subTime = time.text;
               this.scheduleId = time.scheduleId; 
            }
            this.showTime = false;
        },
        //提交
        handSubmit(){
            if(this.subTime=='' && this.radio=='2'){
                this.$toast('请选择需要预约的日期时间')
            }else if(this.question == ''){
                this.$toast('请输入需要咨询的问题')
            }
            else{
                consultExpert({
                   uid:this.uid,
                   question:this.question,
                   type:this.radio,
                   scheduleId:this.scheduleId,
                   expertUid:this.$route.query.expertUid 
                }).then(res=>{
                    if(res.code =='1'){
                        this.$toast(res.data.error);
                    }else{
                        this.$toast.success('提交成功!');
                        this.$router.go(-1);
                    }
                })
            }
        },
        //获取专家信息
        getExpertInfo(){
            expertInfo({
                uid:JSON.parse(localStorage.getItem("userInfo")).data.list.uid,
                expertUid:this.$route.query.expertUid
            }).then(res=>{
                this.expertInfo = res.data.list;
                console.log(res)
            })
        },
        //获取日期
        getDate(){
            workDate({
                uid:this.uid,
                expertUid:this.$route.query.expertUid
            }).then(res=>{
                console.log(res);
                let arr = [];
                res.data.list.forEach(item=>{
                    arr.push(item.workDate)
                })
                this.dateColumns = arr;
            })
        },
        //获取时间
        getTime(date){
            workDateTime({
                uid:this.uid,
                expertUid:this.$route.query.expertUid,
                workDate:date
            }).then(res=>{
                console.log(res)
                let arr = [];
                res.data.list.forEach(item=>{
                    arr.push({
                        text:item.hourRange,
                        scheduleId:item.scheduleId
                    })
                });
                this.timeColumns = arr;
            })
        }
    },
    created(){
        this.getExpertInfo();
        this.getDate();
    }
}
</script>

<style scoped lang='less'>
.wrap{
    margin-top: 10px;
    padding: 0 17px;
    background-color: #fff;
    font-size: 15px;
    color: #333;
    .info{
        display: flex;
        border-bottom: 1px solid #eee;
        padding: 25px 0 8px 0;
        .infoImg{
            margin-right: 24px;
            img{
               width: 104px;
                height: 104px; 
            }
        }
        .infoMsg{
            p{
                margin-bottom: 8px;
            }
            .name{
                font-size: 17px;
                .status{
                    font-size: 15px;
                    color: #aaa;
                }
            }
        }
    }
    .intro{
        padding: 12px 0 18px 0;
        p{
            text-indent:2em;
            line-height: 30px;
            color: #555555;
        }
    }

    .formTitle{
        font-size: 17px;
        padding: 12px 0;
        border-bottom: 1px solid #eee;
    }
    .radioBox{
        margin: 32px 0;
    }
    .van-radio{
        margin-right: 34px;
    }
    .van-cell{
        margin: 12px 0 20px 0;
        border: 1px solid #b5b5b5;
        border-radius: 8px ;
    }
    .btn{
        display: flex;
        justify-content: center;
        line-height: 56px;
        width: 340px;
        height: 56px;
        background: #0AA7F4;
        border-radius: 28px;
        font-weight: 400;
        color: #FFFFFF;
        font-size: 17px;
        display: flex;
        border: none;
    }
}
</style>