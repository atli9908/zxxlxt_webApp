<template>
    <div>
        <div class="content" v-for="(item,index) in testOption" :key="index">
            <div v-if="flag===index">
                <div class="titleMsg">
                <h5>{{item.title}}</h5>
                <span>第{{item.question_id}}题 <span style="color:#999">(共{{testOption.length}}题）</span></span>
            </div>
            <div>
                <div class="topic">
                    <span class="tag">单选题</span>
                    <span>{{item.question_id}}、{{item.question}}</span>
                </div>
                <div>
                    <ul class="list">
                        <li v-for="(option,index) in item.answers" :key="index" @click="handChecked(option)" :class='option.option_score==activeOption ? "active" : "noActive"'>{{option.option_answer}}</li>
                    </ul>
                </div>
            </div>
            </div>
        </div>
        <div class="btn">
            <button v-if="flag+1 < testOption.length" class="next" @click="next">下一题</button>
            <button v-else class="next" @click="submit">完成答题</button>
        </div>
    </div>
</template>

<script>
export default {
    props:{
        testOption:{
            type:Array
        }
    },
    data(){
        return{
            flag:0,
            activeOption:-1,
            score:0,  //分数
            count:0   //总分
        }
    },
    methods:{
        next(){
            this.flag++;
            this.count+=this.score;  //计算总分
            //console.log(this.count);
            this.activeOption = -1; //初始化选中样式
        },
        submit(){
            this.$toast.success('提交成功');
            this.count+=this.score;
            console.log(this.count)
        },
        handChecked(item){
            this.activeOption = item.option_score;
            this.score =  item.option_score;
            //console.log(item.option_score)
        }
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
            height: .52rem;
            line-height: .52rem;
            padding-left: .18rem;
            margin: .12rem 0;
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
</style>