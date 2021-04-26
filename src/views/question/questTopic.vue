<template>
    <div>
        <van-overlay :show="show" @click="show = false" :lock-scroll='false'>
            <div class="wrapper">
                <div class="titleMsg1">
                <div class="msg1">
                    <span>建议用时：30分钟 / 已用时：{{timer}}</span>
                    <span>共{{topics.length}}题，已答{{finish.length}}题</span>
                </div>
                </div>
                <div class="list1" @click.stop>
                <span v-for="(item,index) in topics" :class='answer[index] && answer[index]!="" ? "active1" : "noActive1"' :key="index" @click="jumpTopic(index)">{{index+1}}</span>
                </div>
            </div>
        </van-overlay>

        <van-nav-bar :title="$route.meta.title" class="nav-bar">
            <template #left>
                <i class="iconfont icon-changyongicon-" style="font-size:.28rem;color:#707070"  @click="backRouter()"></i>
            </template>
            <template #right>
                <span v-if="show===false" class="linkCard" @click="showOverlay()">答题卡</span>
                <span v-else-if="show" class="linkCard" @click="show=false">关闭</span>
            </template>
        </van-nav-bar>
        
        <div class="content" v-for="(topic,index) in topics" :key="index">
            <div v-if="flag===index">
                <div class="titleMsg">
                <h5>{{title}}</h5>
                <span>第{{index+1}}题 <span style="color:#999">(共{{topics.length}}题)</span></span>
            </div>
            <!-- 单选题 -->
            <div v-if="topic.type==1">
                <div class="topic">
                    <span class="tag">单选题</span>
                    <span>{{index+1}}、{{topic.questions}}</span>
                </div>
                <div>
                    <ul class="list">
                        <li v-for="(option,index) in topic.answer" :key="index"  @click="handChecked(option,topic)"  :class='(option.answer==activeOption) || accActive(option) ? "active" : "noActive"'>{{option.answer}}</li>
                    </ul>
                </div>
            </div>
            <!-- 多选题 -->
            <div v-if="topic.type==2">
                <div class="topic">
                    <span class="tag" style="backgroundColor:#FF8C00">多选题</span>
                    <span>{{index+1}}、{{topic.questions}}</span>
                </div>
                <div>
                    <ul class="list">
                        <van-checkbox-group v-model="answer[flag]">                                                                                           <!-- answer[flag].includes(option.answer) -->
                            <li v-for="(option,index) in topic.answer" :key="index" @click="handChecked(option,topic)" :class='result.includes(option.answer) || resActive(option) ? "active" : "noActive"'>{{option.answer}}<van-checkbox class='check' :name="option.answer" shape="square" icon-size="14"/></li>
                        </van-checkbox-group>
                    </ul>
                </div>
            </div>
            <!-- 判断题 -->
            <div v-if="topic.type==3">
                <div class="topic">
                    <span class="tag" style="backgroundColor:#FF69B4">判断题</span>
                    <span>{{index+1}}、{{topic.questions}}</span>
                </div>
                <div>
                    <ul class="list">
                        <li v-for="(option,index) in topic.answer" :key="index" @click="handChecked(option,topic)" :class='(option.answer==activeOption) || accActive(option) ? "active" : "noActive"'>{{option.answer}}</li>
                    </ul>
                </div>
            </div>
            <!-- 填空题 -->
            <div v-if="topic.type==4">
                <div class="topic">
                    <span class="tag" style="backgroundColor:#FFA500">填空题</span>
                    <span>{{index+1}}、{{topic.questions}}</span>
                </div>
                <div>
                    <ul class="list" v-if="answer.length>flag">
                        <li class="noActive" v-for="(item,index) in topic.answer" :key="index">{{numSymbol[index]}}：<input type="text" v-model="answer[flag][index]" class="gapOption"></li>
                    </ul>
                    <ul class="list" v-else>
                        <li class="noActive" v-for="(item,index) in topic.answer" :key="index">{{numSymbol[index]}}：<input type="text" v-model="gap[index]" class="gapOption"></li>
                    </ul>
                </div>
            </div>
            <!-- 问答题 -->
            <div v-if="topic.type==5">
                <div class="topic">
                    <span class="tag" style="backgroundColor:#00CED1">问答题</span>
                    <span>{{index+1}}、{{topic.questions}}</span>
                </div>
                <div>
                    <textarea name="" id="" cols="40" rows="10" v-model="answer[flag]"></textarea>
                </div>
            </div>
            </div>
        </div>
        <div class="btn">
            <button v-if="flag+1 < topics.length" class="next" @click="next">下一题</button>
            <button v-else class="next" @click="submit">完成答题</button>
        </div>
    </div>
</template>

<script>
//import {formatDate} from '../../utils/common.js';    //yyyy-mm-dd HH:mm:ss
import {breakQuestionnaire,getBreakQuestionnaire,startSubtest,submitQuestionnaire} from '../../utils/api/test.js';
export default {
    data(){
        return{
            t:'',
            title:'',
            topics:[],
            flag:0,
            activeOption:-1,
            answer:[], //答案
            startTime:this.$route.query.startTime,  //开始时间
            seconds:0,     //总耗时(秒)
            timer:0,
            numSymbol:['①','②','③','④','⑤','⑥'],  //填空题选项字符
            show:false,
            //用户提交数据
            userCommitData:{
                publishWhoId:this.$route.query.publishWhoId,
                testId:this.$route.query.testId,
                spentTime:'',
                userAnswer:[],  //用户提交的答案
                uid:this.$route.query.uid
            },
            answ:'',      //单题答案
            result: [],   //多选
            gap:[],      //填空题答案
            //essay:'',    //简答题答案
            finish:[],   //已完成题目数量
        }
    },
    methods:{
        upTime(time){
            this.t = setInterval(()=>{
                time+=1000;
                console.log(time)
                //let day = Math.floor(time / 1000 / 60 / 60 / 24);                       //天
                let hour = Math.floor((time/(1000*60*60)) %24);                     //小时
                let min = Math.floor((time /(1000*60)) %60);  //分钟
                let sec = Math.floor((time/1000) % 60);                                  //秒
                hour = (hour < 10) ? "0" + hour : hour;
                min = (min < 10) ? "0" + min : min;
                sec = (sec < 10) ? "0" + sec : sec;
                this.timer = `${hour}:${min}:${sec}`;
            },1000)
        },
        getStartSubtest(){  //获取题目
            let time = (+new Date()) - this.startTime;
            this.upTime(time);
            startSubtest({
                uid:this.$route.query.uid,
                testId:this.$route.query.testId,
                publishWhoId:this.$route.query.publishWhoId,
            }).then(res=>{
                this.topics = res.data.topic;
                this.title = res.data.title;
                this.userCommitData.userAnswer = res.data.topic;     
                console.log(res);
            })
        },
        getBreakQuestionnaire(){  //获取中断答题数据
            getBreakQuestionnaire({
                uid:this.$route.query.uid,
                testId:this.$route.query.testId,
                publishWhoId:this.$route.query.publishWhoId
            }).then(res=>{
                this.title = res.data.title;
                this.topics = res.data.userAnswer;
                this.userCommitData.userAnswer = res.data.userAnswer;
                this.answer = res.data.appAnswer;
                this.userCommitData.spentTime = res.data.spentTime;  
                let time = ((+new Date())+this.userCommitData.spentTime*1000) - this.startTime;
                this.upTime(time);
                console.log(res,'中断数据')
            })
        },
        //添加用户答题信息
        userAddAnswer(){
            //单选题、判断题
            if(this.userCommitData.userAnswer[this.flag].type == 1 || this.userCommitData.userAnswer[this.flag].type == 3){
                this.userCommitData.userAnswer[this.flag].answer.forEach(item=>{              
                    if(item.answer == this.answ){
                        item.ucorrect = '1';
                        //得分
                        if(item.is_correct == item.ucorrect){
                            this.userCommitData.userAnswer[this.flag].getScore = this.userCommitData.userAnswer[this.flag].score;
                        }else{
                            this.userCommitData.userAnswer[this.flag].getScore = 0;
                        }
                    }else{
                        item.ucorrect = '0';
                    }        
                })
                //console.log(this.userCommitData.userAnswer)
            //多选题
            }else if(this.userCommitData.userAnswer[this.flag].type == 2){
                //正确答案个数
                let num = this.topics[this.flag].answer.filter(item=>{
                    return item.is_correct == '1'
                });
                let tol=0;
                this.userCommitData.userAnswer[this.flag].answer.forEach((item)=>{  
                    item.ucorrect = '0';
                    this.result.forEach( res =>{
                        if(item.answer == res){
                            item.ucorrect = '1';
                            //判断答对选项
                            if(item.is_correct == item.ucorrect){
                                tol++;
                            }
                        }
                    })
                })
                if(num.length == tol){
                    this.userCommitData.userAnswer[this.flag].getScore = this.userCommitData.userAnswer[this.flag].score;
                }else{
                    this.userCommitData.userAnswer[this.flag].getScore = 0;
                }
                this.result = [];
            //填空题
            }else if(this.userCommitData.userAnswer[this.flag].type == 4){
                this.userCommitData.userAnswer[this.flag].answer.forEach((item,index)=>{
                    if(this.answer[this.flag]){
                        item.uanswer = this.answer[this.flag][index];
                    }else{
                        item.uanswer = this.gap[index];
                        this.answer[this.flag] = this.gap;
                    }
                    console.log(this.answer)
                })
                this.gap = [];
            //简答题
            }else if(this.userCommitData.userAnswer[this.flag].type == 5){
                this.userCommitData.userAnswer[this.flag].uanswer = this.answer[this.flag];
                //this.answer[this.flag] = this.essay;
            }
            //已答题数
            this.finish = this.answer.filter(item=>{
                if(Array.isArray(item)){
                    let childs = item.filter(child=>{
                        return child && child!=''
                    })
                    return item !='' && item  && childs.length>0;
                }else{
                    return item !=='';
                }
            })
        },
        next(){//下一题
            this.userAddAnswer();
            console.log(this.userCommitData.userAnswer,'userAnswer')
            console.log(this.answer);

            this.flag++;
            this.activeOption = -1; //初始化选中样式
        },
        jumpTopic(i){      //跳转到指定题
            this.userAddAnswer();
            console.log(this.userCommitData.userAnswer,'userAnswer')
            this.flag = i;
            this.show = false;
            this.activeOption = -1;
        },
        submit(){  //提交答题
            this.userAddAnswer();
            //耗时秒
            let diffTiem = (+new Date()) - this.$route.query.startTime;
            let seconds  = (Math.floor((diffTiem/1000)));
            this.userCommitData.spentTime += seconds;
            if(this.finish.length == this.topics.length){
                console.log(this.answer.length,this.topics.length)
                console.log(this.answer)
                submitQuestionnaire(this.userCommitData).then(res=>{
                    console.log(res)
                    if(res.code == 0){
                        this.$toast.success('提交成功！');
                        this.$router.go(-1);
                    }else{
                        this.$toast.fail('提交失败，请联系管理员！');
                    }
                })  
            }else{
                this.$toast('请完成所有题目');
            }
        },
        handChecked(option,item){
            //添加用户答题信息
            //this.userAddAnswer();
            if(item.type == 2){
                //多选题选中取消逻辑
                if(this.answer[this.flag]){
                    this.result = this.answer[this.flag];
                }
                if(this.result.includes(option.answer)){
                    let index = this.result.indexOf(option.answer);
                    this.result.splice(index,1);
                }else{
                    this.result.push(option.answer);
                }
                //已选答案大于正确答案
                let num = this.topics[this.flag].answer.filter(item=>{
                    return item.is_correct == '1'
                });
                if(this.result.length>num.length){
                    this.result.splice(num.length,1);
                }
                
                this.answer[this.flag] = this.result;
            }else{
                this.answ = option.answer;
                this.activeOption = option.answer;
                this.answer[this.flag] = option.answer;    //答案
            }
        },
        accActive(option){      //已答样式
            if(this.answer[this.flag]!==''){
                return this.answer[this.flag] == option.answer ? true : false;
            }else{
                return false;
            }
        },
        resActive(option){
            if(this.answer[this.flag]){
                return this.answer[this.flag].includes(option.answer) ? true : false;
            }
        },

        ////////////
        showOverlay(){  //答题卡遮罩层
            this.show = true;
        },
        backRouter(){   //回退按钮
            this.$dialog.confirm({
            title: '提示',
            message: '是否退出答题？',
            }).then(() => {
                let diffTiem = (+new Date()) - this.$route.query.startTime;
                let seconds  = (Math.floor((diffTiem/1000)));  //耗时秒
                this.userCommitData.spentTime += seconds;
                this.userCommitData.appAnswer = this.answer;
                console.log(this.userCommitData);
                //中断答题
                if(this.finish.length>0){
                    breakQuestionnaire(this.userCommitData).then(res=>{
                    console.log(res)
                })
                }
                this.$router.go(-1);
                console.log(this.userCommitData.spentTime+'秒')
            }).catch(() => {
                //
            });
        }
    },
    created(){
       if(this.$route.query.is_break==0){
           this.getStartSubtest();
       }else{
           this.getBreakQuestionnaire();
       }
    },
    destroyed(){
        //离开页面销毁定时器
        clearInterval(this.t);
    }
}
</script>
<style lang="less" scoped>
.content{
    font-size: .16rem;
    background: #fff;
    padding: 0 .18rem;
    margin-top: .1rem;
    .titleMsg{
        text-align: center;
        padding: .27rem 0;
        border-bottom: .01rem solid #eee;
        h5{
            margin-bottom: .17rem;
            font-size: .17rem;
        }
    }
    .topic{
        margin: .28rem 0 .24rem 0;   
        line-height: 32px;
    }
    .tag{
        font-size: .13rem;
        background: #0AA7F4;
        color: #fff;
        padding: 3px 5px;
        margin-right: 5px;
        border-radius: 5px;
    }
    .list {
        padding-bottom: .2rem;
        li{  
            box-sizing: border-box;
            font-size: .15rem; 
            border-radius: 7px;
            width: 3.40rem;
            line-height: .3rem;
            margin: .12rem 0;
            padding: 15px 12px;
            .gapOption{
                border: 0;
                width: 80%;
                border-bottom: 1px solid #333;
                background-color: #F7F7F7;
            }
            .check{
                float: right;
                margin-top: 8px;
                background-color: #fff;
            }
        }
    }
}
.btn{
    display: flex;
    justify-content: center;
    margin-top: .35rem;
}
.next{
    font-size: .16rem;
    color: #FFFFFF;
    border: 0;
    width: 340px;
    height: 52px;
    background: #0AA7F4;
    border-radius: 7px;
}
.noActive{
    background: #F7F7F7;  
    color: #555555;
}
.active{
    background: #0AA7F4;
    color: #fff;
    opacity: 0.5;
}
//
//
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
.titleMsg1{
  text-align: center;
  margin-top: .12rem;
  .msg1{
      margin-top: 80px;
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
  }
  span{
    font-size: .16rem;
    font-family: Microsoft YaHei;
    margin-bottom: 10px;
    display: inline-block;
    width: 100%;
    font-weight: 400;
    color: #FFFFFF;
    line-height: 25px;
  }
}
.wrapper{
  height: 100%;
  overflow: auto;
}
.list1{
  display: flex;
  flex-wrap: wrap;
  text-align: center;
  width: 3.25rem;
  margin: 20px auto;
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
.noActive1{
    background-color: #FFFFFF;
    color: #777777;
}
.active1{
  color:#fff;
  background-color:#0AA7F4
}
</style>