<template>
    <div>
        <div class="wrap">
            <!-- 分数 -->
            <div class="score">
                <p>校园环境综合问卷</p>
                <div class="scoreMsg">
                    <span>本问卷共{{dataList.length}}题，合计{{totalScore}}分。</span>
                    <span style="margin-left:.25rem">本次得分：_____</span><span style="font-size:.16rem;color:red;margin-left:-.3rem">{{data.score}}</span>
                </div>
            </div>
            <div v-for="(item,index) in dataList" :key="index">
                <!-- 单选题 -->
                <div v-if="item.type==1 || item.type==3" class="dataList">
                    <div class="topic">
                        <span style='background:#00BFFF' class="tag">{{item.type==1 ? '单选题' : '判断题'}}</span>
                        <span>{{index+1}}、{{item.questions}} ({{item.score}}分)</span>
                    </div>
                    <div>
                        <ul class="list">
                            <li :class="ans.ucorrect==1 ? 'active' : 'noActive'" v-for="(ans) in item.answer" :key="ans.answer">
                                {{ans.answer}}
                                <span class="corr" v-if="ans.is_correct==1">√ 正确</span>
                                <span class="err" v-else>× 错误</span>
                            </li>
                        </ul>
                    </div>
                    <div class="comment" v-if="item.topic_results && item.topic_results!==''">
                        <p>--- 单题点评 ---</p>
                        <div>
                            {{item.topic_results}}
                        </div>
                    </div>
                </div>
                <!-- 多选题 -->
                <div v-if="item.type==2" class="dataList">
                    <div class="topic">
                        <span style="background:#EE7942" class="tag">多选题</span>
                        <span>{{index+1}}、{{item.questions}} ({{item.score}}分)</span>
                    </div>
                    <div>
                        <ul class="list">
                            <li :class="ans.ucorrect==1 ? 'active' : 'noActive'" v-for="(ans,index) in item.answer" :key="index">
                                {{ans.answer}} 
                                <div class="lib">
                                    <span class="corr" v-if="ans.is_correct==1">√ 正确</span>
                                    <span class="err" v-else>× 错误</span>
                                    <van-checkbox class='check' shape="square" icon-size="14"/>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <!-- 点评 -->
                    <div class="comment" v-if="item.topic_results && item.topic_results!==''">
                        <p>--- 单题点评 ---</p>
                        <div>
                            {{item.topic_results}}
                        </div>
                    </div>
                </div>
                <!-- 填空题 -->
                <div v-if="item.type==4" class="dataList">
                    <div class="topic">
                        <span style="background:#FFC125" class="tag">填空题</span>
                        <span>{{index+1}}、{{item.questions}} ({{item.score}}分)</span>
                    </div>
                    <div>
                        <ul class="list">
                            <li class="noActive" v-for="(ans,index) in item.answer" :key="ans.answer">
                                {{numSymbol[index]}} ：
                                <input type="text" v-model="ans.answer" class="gapOption" disabled>
                                <div class="lib">
                                    <span class="corr" v-if="ans.is_correct">√ 正确</span>
                                    <span class="err" v-else>× 错误</span>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <!-- 点评 -->
                    <div class="comment" v-if="item.topic_results && item.topic_results!==''">
                        <p>--- 单题点评 ---</p>
                        <div>
                            {{item.topic_results}}
                        </div>
                    </div>
                </div>
                <!-- 问答题 -->
                <div v-if="item.type==5" class="dataList">
                    <div class="topic">
                        <span style="background:#00CED1" class="tag">问答题</span>
                        <span>{{index+1}}、{{item.questions}} ({{item.score}}分)</span>
                    </div>
                    <div>
                        <ul class="list">
                            <textarea v-model="item.uanswer" name="" id="" cols="40" rows="8" disabled />
                        </ul>
                    </div>
                    <!-- 点评 -->
                    <div class="comment" v-if="item.topic_results && item.topic_results!==''">
                        <p>--- 单题点评 ---</p>
                        <div>
                            {{item.topic_results}}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- 整体点评 -->
        <div class="wrap encomment">
            <p class="title">—— 对本套问卷的整体点评 ——</p>
            <div class="msg">
                <div style="margin-right:.1rem"><img v-if="data.avatar" :src="global.ip + data.avatar" alt=""></div>
                <div>
                    <p>{{data.nickname}}点评：</p>
                    <p class="time">{{data.readTime}}</p>
                    <p v-if="data.testResults" style="color:#777777;line-height:.26rem">{{data.testResults}}</p>
                    <p v-else style="color:#777777;line-height:.26rem">暂无点评</p>
                </div>
            </div>
        </div>
        <!-- 按钮 -->
        <div style="padding:.26rem .17rem .4rem .17rem">
            <button class="sizeBtn" @click="$router.go(-1)">关闭</button>
        </div>
    </div>
</template>

<script>
import {checkSubtest} from '../../../utils/api/result'
export default {
    data(){
        return {
            numSymbol:['①','②','③','④','⑤','⑥'],  //填空题选项字符
            data:'',
            dataList:[],
            totalScore:''
        }
    },
    methods:{
        getCheckSubtest(){
            checkSubtest({
                uid:this.$route.query.uid,
                recordId:this.$route.query.recordId
            }).then(res=>{
                this.data = res.data;
                this.dataList = res.data.list;
                this.totalScore = this.dataList.reduce((total, num)=>{
                    if(num.type=='4'){
                        //多选题总分 = 单题得分 * 选项数量
                        num.score = num.score * num.answer.length;
                    }
                    return total + (+num.score);
                },0)
                console.log(res)
            })
        }
    },
    created(){
        this.getCheckSubtest();
    }
}
</script>

<style scoped lang='less'>
.wrap{
    .dataList{
        padding: 0 17px;
        margin-top: 10px;
        background-color: #fff;
    }
    .score{
        text-align: center;
        background-color: #fff;
        margin-top: 10px;
        margin-bottom: -10px;
        padding: 17px;
        p{
            font-size: 17px;
            padding: 27px 0 35px 0;
        }
        .scoreMsg{
            display: flex;
            padding-bottom: 12px;
            border-bottom: 1px solid #eee;
        }
        span{
            font-size: 15px;
        }
    }
    .topic{
        margin-bottom: .22rem;   
        padding-top: 26px;
        line-height: 32px;
        font-size: .16rem;
    }
    .tag{
        font-size: .13rem;
        background: #0AA7F4;
        color: #fff;
        padding: 3px 5px;
        margin-right: 5px;
        border-radius: 7px;
    }
    .list {
        padding-bottom: .16rem;
        font-size: .16rem;
        li{  
            display: flex;
            box-sizing: border-box;
            font-size: .15rem; 
            border-radius: 7px;
            width: 3.40rem;
            line-height: .3rem;
            margin: .12rem 0;
            padding: 12px;
            color: #555555;
            .corr{
                margin-left: auto;
                background-color: #aed9ee;
                border-radius: 15px;
                font-size: 13px;
                color: #0AA7F4;
                padding: 0 10px;
            }
            .err{
                box-sizing: border-box;
                margin-left: auto;
                background-color: #ffebeb;
                border-radius: 15px;
                font-size: 13px;
                color: red;
                padding: 0 10px;
                min-width: 59.5px;
                max-height: 30px;
            }
            .lib{
                display: flex;
                align-items: center;
                margin-left: auto;
            }
            .gapOption{
                margin-left: 10px;
                width: 60%;
                border: 0;
                border-bottom: 1px solid #333;
                background-color: #F7F7F7;
            }
            .check{
                margin-left: 5px;
            }
        }
        //用户选择样式
        .active{
            background: #e8f5fc;
        }
        //未选择
        .noActive{
            background: #F7F7F7;  
        }
    }
    .comment{
        padding-bottom: 25px;
        p{
            font-size: 16px;
            text-align: center;
            margin-bottom: 25px;
        }
        div{
            background: #F7F7F7;
            color: #555555;
            text-indent:2em;
            border: 1px solid #ddd;
            border-radius: 7px;
            font-size: 15px;
            padding: 10px;
            line-height: 30px;
        }
    }
}
.encomment{
    margin-top: 10px;
    font-size: 16px;
    padding: 30px 17px 40px 17px;
    background-color: #fff;
    .title{
        text-align: center;
        color: #999999;
        margin-bottom: 40px;
    }
    img{
        width: 42px;
        height: 42px;
        border-radius: 50%;
    }
    .msg{
        display: flex;
    }
    .time{
        color: #999;
        font-size: 15px;
        margin: 6px 0 10px 0;
    }
}
.sizeBtn{
    width: 100%;
    height: 50px;
    line-height: 50px;
    font-size: 17px;
    color: #fff;
    border-radius: 10px;
}
</style>