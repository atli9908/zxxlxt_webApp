<template>
    <div>
        <keep-alive>
            <test-single :testOption='test'/>
        </keep-alive>
    </div>
</template>

<script>
import testSingle from '@/components/common/testSingle.vue';
export default {
    components:{
        testSingle
    },
    data(){
        return{
            show:true,
            test:[],
            // test1:[
            //     {title:'Achenbach儿童行为量表',id:'1',type:'单选题',topic:'您经常会有坐立不安、无法安睡或活动过多的表现?',option:['A、明显或经常有此表现','B、明显或经常有此表现','C、明显或经常有此表现']},
            //     {title:'Achenbach儿童行为量表',id:'1',type:'单选题',topic:'你是否还在为情所困?',option:['A、明显或经常有此表现','B、明显或经常有此表现','C、明显或经常有此表现']}
            // ]
        }
    },
    methods:{
        next(){}
    },
    created(){
        this.test = this.$route.query;
        console.log(this.test)
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
            font-size: .15rem; 
            border-radius: 7px;
            padding: 19px 0 19px 18px;
            background: #F7F7F7;  
            color: #555555;
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
</style>