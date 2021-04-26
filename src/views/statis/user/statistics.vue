<template>
    <div>
        <div class="boxWrap">
            <div class="titleWrap">
                <p class="title" style="margin-bottom:.3rem">一<span>咨询数据统计</span>一</p>
                <p class="title"><span>在使用本系统过程中</span></p>
            </div>
            <div class="msg">
                <div class="tips tips1">
                    <p class="lib">您共咨询过</p>
                    <p class="num">{{expert.consultTotal}} 次</p>
                </div>
                <div class="tips tips2">
                    <p class="lib">您共预约过</p>
                    <p class="num">{{expert.reserveTotal}} 次</p>
                </div>
            </div>
        </div>
        <div class="boxWrap">
            <div class="titleWrap">
                <p class="title" style="margin-bottom:.3rem">一<span>评测结果统计</span>一</p>
                <p class="title"><span>您共完成了{{total}}次测评</span></p>
            </div>
            <!-- echarts -->
            <div ref='myEcharts' style="height:2.8rem;width:100%"></div>
        </div>
        <div class="boxWrap">
            <div class="titleWrap" style="padding-bottom:12px">
                <p class="title" style="margin-bottom:.3rem">一<span>功能使用情况(个人)</span>一</p>
            </div>
            <!-- echarts -->
            <div ref="myRadar" style="height:2.7rem;width:100%"></div>
        </div>
        <div style="padding:0 .17rem">
            <button class="sizeBtn" @click="$router.go(-1)">关闭</button>
        </div>
    </div>
</template>

<script>
import {getStatistic} from '../../../utils/api/account';
export default {
    data(){
        return{
            uid:JSON.parse(localStorage.getItem("userInfo")).data.list.uid,
            expert:'', //预约咨询信息,
            total:'', //评测总数,
            evalNum:[],   //测评结果
            testNum:[]   //功能使用 
        }
    },
    methods:{
        handEcharts(){
            //初始化echarts实例
            console.log(this.evalNum,'------',this.testNum)
            var myEcharts = this.$echarts.init(this.$refs.myEcharts);
            var myRadar = this.$echarts.init(this.$refs.myRadar);

            let data1 = ['全部结果', '量表结果', '问卷结果', '普查结果'];
            let data2 = this.evalNum;
            let barTopColor = ["#02c3f1", "#ffe000", "#9a7fd1", "#06fdbc", "#006ced"];
            let max;  
            if(this.testNum[0]<20){
                max =  20;
            }else if(this.testNum[0]>20){
                max = 50;
            }else if(this.testNum[0]>50){
                max = 100
            }else{
                max = 500
            }
            //柱状图
            let option = {
                //设置网格布局，影响图形位置top bottom left right (上下左右) 
                grid: {
                    top: 30,
                    left: 10,
                    right: 10,
                    bottom: 50,
                    containLabel: true
                },
                xAxis: {
                    data: data1,
                    axisTick: {
                        show: false
                    },
                    axisLine: {
                        show: false
                    },
                    axisLabel: {
                        show: true,
                        color: '#000',
                        fontSize:'.14rem',
                        margin: 35
                    },
                },
                yAxis: {
                    type: 'value',
                    splitLine: {
                        show: false
                    },
                    axisTick: {
                        show: false
                    },
                    axisLine: {
                        show: false
                    },
                    axisLabel: {
                        show: false
                    }
                },

                series: [
                    {
                        data: data2,
                        name: '柱顶部',
                        type: 'pictorialBar', //指定类型
                        //symbol标记类型包括 'circle', 'rect', 'roundRect', 'triangle', 'diamond','pin','arrow', 'none' 
                        //默认为圆形
                        symbolSize: ['45%', 10], //指定大小，[宽,高]
                        symbolOffset: [0, -3], //位置偏移 [右，下] 负数反方向
                        z: 12,
                        itemStyle: {
                            color: function(params) {
                                return barTopColor[params.dataIndex];
                            }
                        },
                        label: {
                            show: true,
                            position: 'top',
                            fontSize: '.14rem',
                            formatter:function(params){
                                return `${params.data}份`
                            }
                        },
                        symbolPosition: 'end'
                    },
                    {
                        name: '柱底部',
                        type: 'pictorialBar',
                        symbolSize: ['45%', 10],
                        symbolOffset: [0, 5],
                        z: 12,
                        itemStyle: {
                            color: function(params) {
                                return barTopColor[params.dataIndex];
                            }
                        },
                        data: data2
                    },
                    {
                        name: '第一圈',
                        type: 'pictorialBar',
                        symbolSize: ['60%', 18],
                        symbolOffset: [0, 11],
                        z: 11,
                        itemStyle: {
                            //transparent是全透明黑色(black)的速记法，即一个类似rgba(0,0,0,0)这样的值。
                            //将整个圆颜色设置为全透明黑色相当于把圆隐藏，然后只留下边框，变成一个环
                            color: 'transparent',
                            borderColor: '#3ACDC5',
                            borderWidth: 10   //线条粗细
                        },
                        data: data2[0]==0 ? null :  data2
                    },
                    {
                        name: '第二圈',
                        type: 'pictorialBar',
                        symbolSize: ['80%', 28],
                        symbolOffset: [0, 17],
                        z: 10,
                        itemStyle: {
                            color: 'transparent',
                            borderColor: barTopColor[2],
                            borderWidth: 10
                        },
                        data: data2[0]==0 ? null :  data2
                    },
                    {
                        type: 'bar',
                        itemStyle: {
                            color: function(params) {
                                return barTopColor[params.dataIndex];
                            },
                            opacity:0.4  
                        },
                        z: 1,
                        silent: true,
                        barWidth: '36%',   //柱体大小
                        barGap: '-100%', // Make series be overlap
                        data: data2
                    }
                ]
            };
            //雷达图
            let option2 = {
                grid: {
                    top:10
                },
                calculable : true,

                radar: {
                    axisName: { 
                        color: '#838D9E',
                        fontSize: '.14rem',         
                    },
                    indicator: [
                        {text: '量表测评', max: max},
                        {text: '普查测评', max: max},
                        {text: '咨询专家', max: max},
                        {text: '预约专家', max: max},
                        {text: '问卷测评', max: max}
                    ],
                    radius: '70%',
                    center: ['50%', '50%'],
                },
                series:[
                    {
                        type: 'radar',
                        //symbol: 'circle', // 拐点的样式，还可以取值'rect','angle'等
                        //symbolSize: 10, // 拐点的大小
                        data: [
                            {name: "能力值", value: this.testNum}
                        ],
                        // 设置区域边框和区域的颜色
                        itemStyle: {
                            color: 'rgba(10, 167, 244, 0.6)',
                            lineStyle: {
                                color: 'rgba(10, 167, 244, 1)',
                            },
                        },
                    }
                ]
            }
            // 使用刚指定的配置项和数据显示图表。
            myEcharts.setOption(option);
            myRadar.setOption(option2);
            //自适应
            //myEcharts.setOption(option, true);
            window.addEventListener('resize', function() {
                myEcharts.resize(); 
                myRadar.resize();
            });
        },
        getStatistic(){   //获取数据统计
            getStatistic({
                uid:this.uid
            }).then(res=>{
                if(res){
                    this.expert = res.data.list.expert;
                    let total = Object.values(res.data.list.reportTotal).reduce((total,curr)=>{   //计算评测总数
                        return total+curr
                    });
                    this.total = total;
                    this.evalNum = Object.values(res.data.list.reportTotal);
                    this.evalNum.unshift(total);
                    res.data.list.testGaugeCatTotal.forEach((item,index)=>{
                        this.testNum[index] = item.total;
                    })
                }
                console.log(this.evalNum)
                console.log(res)
                console.log(this.total)
                this.handEcharts();
            })
        }
    },
    mounted(){
        this.getStatistic();
    }
}
</script>

<style scoped lang='less'>
.boxWrap{
    font-size: 17px;
    background-color: #fff;
    margin-top: 10px;
    padding: 0 17px;
    .titleWrap{
        padding: 50px 0;
    }
    .title{
        font-weight: 400;
        color: #333333;
        line-height: 10px;
        text-align: center;
        span{
            margin: 0 10px;
        }
    }
    .msg{
        display: flex;
        justify-content: space-between;
        padding-bottom: 40px;
        .tips{
            width: 165px;
            height: 80px;
            color: #fff;   
            border-radius: 7px;
            text-align: center;
            p{
                width: 165px;
            }
        }
        .tips1{
            background-color: #0AA7F4;
        }
        .tips2{
            background-color: #2CD0CB;
        }
        .lib{
            font-size: 15px;
            margin: 10px 0;
        }
        .num{
            font-size: 20px;
        }
    }
}
.sizeBtn{
    margin: 30px 0 50px 0;
    width: 100%;
    height: 50px;
    line-height: 50px;
    border-radius: 8px;
    font-size: 16px;
}
///
.wrap{
    background: #fff;
    margin-top: 10px;
    padding: 0 15px;
    p{
        opacity: 1;
        font-size: 17px;
        color: #333333;
        text-align: center;
        padding-top: 45px;
    }
}
.bar{
    width: 100%;
    margin-top: -70px;
    .msg{
        margin-bottom: -20px;
    }
    .box{
        display: flex;
        margin-top:-10px;
        .num{
            display: flex;
            margin-left: 10px;
            color: #555555;
        }
    }
    span{
        font-size: 14px;
    }
    .progress{
        width:285px;
    }
}
</style>