<template>
    <div>
        <div class="wrap">
            <div class="resTitle"><span>评测结果分析</span></div>
            <div ref="myEcharts" style="width:100%; height:2.5rem"></div>
            <div class="legendWrap">
                <div class="legend">
                    <span class="msg" v-for="(item,index) in scores" :key="index"><span class="box" :style="{background:color[index]}"></span>{{item.name}}</span>
                </div>
            </div>
        </div>
        <div class="wrap">
            <div>
                <div class="msgTitle">
                    ——<span>报告分析详解</span>——
                </div>
                <div class="msgWrap" v-for="(item,index) in result" :key="index">
                    <p class="tip">【{{item.categoryName}}】：{{item.categoryScores}}</p>
                    <p class="deg">测评程度：{{item.degree}}</p>
                    <p class="res" v-html="item.result"></p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {getResultById} from '../../../utils/api/result';
export default {
    data(){
        return {
            uid:JSON.parse(localStorage.getItem("userInfo")).data.list.uid,
            color:['#0AA7F4','#ED6942','#F29EC2','#36D5E5','#12B5B0','#F9B552','#EC6941','#F19EC2','#EEAD0E','#E066FF','#B3EE3A'],
            result:'',  //结果列表
            scores:[],  //得分
        }
    },
    methods:{
        handEcharts(){
            //初始化echarts实例
            console.log(this.scores)
            let myChart = this.$echarts.init(this.$refs.myEcharts);
            let color = ['#0AA7F4','#ED6942','#F29EC2','#36D5E5','#12B5B0','#F9B552'];
            let data = this.scores;
            let option = {
                //设置网格布局，影响图形位置top bottom left right (上下左右) 
                grid: {
                    top: 40,
                    left:10,
                    right:10,
                    bottom: 20,
                    containLabel: true
                },
                xAxis: {
                    type: 'category',
                    data: Array.from({length:this.scores.length}, (x, i) => i + 1) ,
                    axisTick: {
                        show: false,    // 是否显示坐标轴刻度
                        inside: true,  
                        lineStyle: {
                            color: '#FFF',     // 刻度线的颜色
                            type: 'solid',     // 坐标轴线线的类型（'solid'，实线类型；'dashed'，虚线类型；'dotted',点状类型）
                        },
                    }
                },
                yAxis: {
                    type: 'value',
                },
                series: [
                    {
                        name:'前庭失衡',
                        barWidth: 20,   //柱子宽度
                        // //barGap: '30%',  //  不同系列的柱间距离
                        type:'bar',
                        itemStyle: { 
                            normal: { 
                                color: function(params) { 
                                    var colorList = color; 
                                    return colorList[params.dataIndex] 
                                },
                                barBorderRadius:[ 5, 5, 0, 0]   //圆角
                            } 
                        }, 
                        data:data,
                    }
                ]
            };
            // 使用刚指定的配置项和数据显示图表。
            myChart.setOption(option);
            //自适应
            myChart.setOption(option, true);
                window.addEventListener('resize', function() {
                    myChart.resize(); 
                }
            );
        
        },
        getResultById(){  //获取报告内容
            getResultById({
                uid:this.uid,
                id:this.$route.query.id,
                testType:this.$route.query.testType
            }).then(res=>{
                console.log(res)
                this.result = res.data.list.result;
                res.data.list.result.forEach(item=>{
                    this.scores.push({value:item.categoryScores,name:item.categoryName});
                })
                this.handEcharts();
            })
        }  
    },
    mounted(){
        this.getResultById();
    }
}
</script>

<style scoped lang='less'>
.wrap{
    background-color: #fff;
    margin-top: 10px;
    padding: 0 17px;
}
.resTitle{
    font-size: 17px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: #333333;
    padding: 30px 0 0 0;
}
.legendWrap{
    display: flex;
}
.legend{
    display: flex;
    flex-wrap: wrap;
    .box{
        display: inline-block;
        height: 12px;
        width: 12px;
        border-radius: 2px;
        margin-right: 15px;
    }
    .msg{
        font-size: 15px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: #555555;
        margin: 0 0 17px 0;
        display: inline-block;
        width: 170px;
    }
}
.msgTitle{
    color: #D2D2D2;
    font-size: 17px;
    text-align: center;
    padding: 30px 0 20px 0;
    span{
        color: #333333;
        margin: 0 15px;
    }
}
.msgWrap{
    font-size: 15px;
    color: #777777;
    border-bottom: 1px solid #eee;
    padding-bottom: 15px;
    margin-top: 30px;
    .tip{
        font-size: 16px;
        color: #333333;
        margin-bottom: 16px;
    }
    .deg{
        margin-bottom: 20px;
    }
    .res{
        line-height: 35px;
        text-indent:2em
    }
}
</style>