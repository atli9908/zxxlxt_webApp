<template>
    <div>
        <van-overlay :show="show" @click="show = false" :lock-scroll='false'>
            <div class="wrapper">
                <div class="titleMsg1">
                <span>共{{testOption.length}}题，已答{{finish.length}}题</span>
                </div>
                <div class="list1" @click.stop>
                <span v-for="(item,index) in testOption" :class='(score[index]!=="" && score[index]) || score[index]=="0" ? "active1" : "noActive1"' :key="item.question_id" @click="jumpTopic(index)">{{item.question_id}}</span>
                </div>
            </div>
        </van-overlay>

        <van-nav-bar :title="$route.meta.title" class="nav-bar">
            <template #left>
                <i class="iconfont icon-changyongicon-" style="font-size:.28rem;color:#707070"  @click="backRouter"></i>
            </template>
            <template #right>
                <span v-if="show===false" class="linkCard" @click="showOverlay()">答题卡</span>
                <span v-else-if="show" class="linkCard" @click="show=false">关闭</span>
            </template>
        </van-nav-bar>
        
        <div class="content" v-for="(item,index) in testOption" :key="index">
            <div v-if="flag===index">
                <div class="titleMsg">
                <h5>{{title}}</h5>
                <span>第{{item.question_id}}题 <span style="color:#999">(共{{testOption.length}}题）</span></span>
            </div>
            <div v-if="!item.type">
                <div class="topic">
                    <span class="tag">单选题</span>
                    <span>{{item.question_id}}、{{item.question}}</span>
                </div>
                <div>
                    <ul class="list">
                        <li v-for="(option,index) in item.answers" :key="index" @click.once="handChecked(option,index)" :class='(index==activeOption) || accActive(index) ? "active" : "noActive"' ref="optionli">{{newOption(option.option_answer,index)}}</li>
                    </ul>
                </div>
            </div>
            </div>
        </div>
        <div class="btn">
            <button v-if="flag+1 < testOption.length" class="next" @click="next">下一题</button>
            <button v-else class="next" @click.once="submit">完成答题</button>
        </div>
    </div>
</template>

<script>
import {formatDate} from '../../utils/common.js';    //yyyy-MM-dd HH:mm:ss
import {commitTableResult,commitTableBreak,getTableBreak} from '../../utils/api/test.js';
export default {
    props:{
        testOption:{
            type:Array
        },
        title:{
            type:String
        }
    },
    data(){
        return{
            flag:0,
            activeOption:-1,
            score:[],  //分数
            options:[],  //选项   
            questionScore:[], //{题目,得分}
            startTime:formatDate(this.$route.query.time/1000),  //开始时间
            endtime:'',     //结束时间
            totaltime:'',   //总耗时(分/秒)
            seconds:'',     //总耗时(秒)
            finish:[],   //已完成题目数量
            show:false,
            letter:['A','B','C','D','E','F','G','H','I','J','K']
        }
    },
    methods:{
        next(){//下一题
            this.flag++;
            this.activeOption = -1; //初始化选中样式
            console.log(this.score)
            console.log(this.finish)
        },
        jumpTopic(i){      //跳转到指定题
            this.flag = i;
            this.show = false;
            this.activeOption = -1;
        },
        submit(){  //提交答题
            this.endtime = formatDate(+new Date()/1000);         //答题截止时间
            let mill = +new Date() - this.$route.query.time;    //毫秒
            this.seconds = Math.floor(mill/1000);               //耗时秒
            let min = Math.floor(mill / (60*1000));             //分钟
            let sec = Math.floor(mill/1000 % 60);               //秒
            this.totaltime = `${min}分${sec}秒`;  
            this.setquestionScore(this.score);

            if(this.finish.length == this.testOption.length){
                commitTableResult({
                    uid:JSON.parse(localStorage.getItem("userInfo")).data.list.uid,
                    id:this.$route.query.gauge_id,
                    publishId:this.$route.query.publishId,
                    questionScore:this.questionScore,
                    starttime:this.startTime,
                    endtime:this.endtime,
                    totaltime:this.totaltime,
                    seconds:this.seconds
                }).then(res=>{
                    console.log(res)
                    if(res.code=='0'){
                        this.$toast.success(res.message);
                        if(this.$route.query.type == 'lb'){
                            this.$router.push({name:'Scale',params:{flag:this.$route.query.flag}});
                        }else{
                            this.$router.go(-1);
                        }
                    }else{
                        console.log('提交失败')
                    }
                })
            }else{
                this.$dialog.alert({
                    message: `您还有${this.testOption.length-this.finish.length}题未完成`,
                }).then(() => {
                    // on close
                });
            }
        },
        handChecked(option,index){
            this.activeOption = index;
            this.options[this.flag] = index;  //选项
            this.score[this.flag] = option.option_score;    //分数
            this.finish = this.score.filter(item=>{
                return item !=='';
            })
            
            // let lis = this.$refs.optionli;
            // console.log(lis)

            //自动下一题          
            if(this.score.length != this.testOption.length){
                setTimeout(()=>{
                    this.flag++;
                    if(this.flag>this.testOption.length){
                        this.flag = this.testOption.length-1;
                    }
                },50)
                this.activeOption=-1;
            }else{
                //完成所有题目，自动提交
                if(this.finish.length == this.testOption.length){
                    this.activeOption=-1;
                    this.submit();
                }else{
                    this.$toast('您还有未完成题目');
                }
            }
        },
        getTableBreak(){   //获取中断数据
            getTableBreak({
                uid:this.$route.query.uid,
                id:this.$route.query.gauge_id,
                publishId:this.$route.query.publishId
            }).then(({data})=>{
                console.log(data)
                if(data.list && data.list!==''){
                    this.options = data.list.option.split(',');   //已答题目选项
                    let score = data.list.score.split(',');      //已答题目
                    this.score = score;
                    this.finish = this.score.filter(item=>{
                        return item !=='';
                    })
                }else{
                    return;
                }

            })
        },
        accActive(index){      //已答样式
            if(this.options[this.flag]!==''){
                return this.options[this.flag] == index ? true : false;
            }else{
                return false;
            }
        },
        setquestionScore(item){       //题号,分数键值对
            item.forEach((i,index)=>{
                this.questionScore[index] = {question_id:index+1 ,score:i};
            })
        },

        /////////////////////////
        showOverlay(){  //答题卡遮罩层
            this.show = true;
        },
        backRouter(){   //回退按钮
            this.$dialog.confirm({
            title: '提示',
            message: '是否退出答题？',
            }).then(() => {
                let diffTiem = (+new Date()) - this.$route.query.time;
                let seconds  = (Math.floor((diffTiem/1000)));  //耗时秒
                //用户至少需要答一题，才调用中断答题接口
                if(this.finish.length>0){  
                    commitTableBreak({
                        uid:this.$route.query.uid,
                        id:this.$route.query.gauge_id,
                        publishId:this.$route.query.publishId,
                        score:this.score.toString(),
                        option:this.options.toString(),
                        seconds:seconds
                    }).then(res=>{
                        console.log(res)
                        if(res.code==0){
                            this.$toast.success(res.message);
                        }
                    })
                }
                if(this.$route.query.type == 'lb'){
                    this.$router.push({name:'Scale',params:{flag:this.$route.query.flag}});
                }else{
                    this.$router.go(-1);
                }
            }).catch(() => {
                //
            });
        },
        //添加选项ABCD
        newOption(option,index){
            let reg = /^[a-zA-Z]/g;
            if(!reg.test(option)){
                return (this.letter[index] + '、') + option;
            }else{
                return option;
            }
        }
    },
    created(){
       this.getTableBreak();
    },
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
  span{
    font-size: .17rem;
    font-family: Microsoft YaHei;
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
  margin: 0 auto;
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