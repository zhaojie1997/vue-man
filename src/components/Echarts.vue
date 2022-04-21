<template>
<!-- Echarts 封装组件 -->
    <div ref="echart"></div>
</template>
<script>
// 引入无版本echarts
import * as echart from "echarts"
export default{
    props:{
        //定义一个属性用于区分柱状图，饼状图，折线图
        // 折线图
        isAxisChart:{
            type:Boolean,
            default:true
        },
        // 接收传进来的option参数
        chartData:{
            type:Object,
            default(){ //定义默认值  为了防止调用组件不传当前属性时的容错性
                return{
                    xData:[], //默认x轴数据
                    series:[]
                }
            }
        }
    },
    // 数据进行监听
    watch:{
        chartData:{
            handler:function(){
                this.initChart() //调用初始化方法
            },
            deep:true//首次对数据监听的时候也需要触发
        }
    },
    // 初始化
    methods:{
        initChart(){    
            // 调用Chart初始化，处理数据
            this.initChartData()// 进行方法调用
            // 调用完成后  需要渲染echarts
            if(this.echart){//判断当前echarts有没有渲染
                // 如果渲染了就直接进行渲染
                this.echart.setOption(this.options)
            }else{//如果没有被渲染
                // 初始化 echart对象进行赋值
                this.echart = echart.init(this.$refs.echart)
                // 绘图
                this.echart.setOption(this.options)
            }

        },
        initChartData(){
            // 对数据进行处理
            // 处理数据时需要分两种情况
            // 1.对折线图和柱状图
            if(this.isAxisChart){  //isAxisChart如果存在的时候
                //设置x轴的坐标 axisOption属性中设置x坐标 this.axisOption.xAxis.data 的data是从组件外chartData获取到的
                this.axisOption.xAxis.data = this.chartData.xData
                this.axisOption.series = this.chartData.series
            }else{//2.如果不是折线图和柱状图  是饼状图
                this.normalOption.series = this.chartData.series
            }
        }
    },
    data(){
        return{
            //柱状图  折线图
            axisOption:{
                // 图例文字颜色
                textStyle: {
                    color: "#333",
                },
                grid: {
                left: "20%",
                },
                // 提示框
                tooltip: {
                trigger: "axis",
                },
                xAxis: {
                type: "category", // 类目轴
                data: [],
                axisLine: {
                    lineStyle: {
                    color: "#17b3a3",
                    },
                },
                axisLabel: {
                    interval: 0,
                    color: "#333",
                },
                },
                yAxis: [
                {
                    type: "value",
                    axisLine: {
                    lineStyle: {
                        color: "#17b3a3",
                    },
                    },
                },
                ],
                color: ["#2ec7c9", "#b6a2de", "#5ab1ef", "#ffb980", "#d87a80", "#8d98b3"],
                series: [],
            },
            //饼状图
            normalOption:{
                tooltip: {
                    trigger: "item",
                },
                color: [
                    "#0f78f4",
                    "#dd536b",
                    "#9462e5",
                    "#a6a6a6",
                    "#e1bb22",
                    "#39c362",
                    "#3ed1cf",
                ],
                series: [],
            },
            echart:null  //定义一个数据用来判断echarts有没有被渲染
        }
    },
    //对传入进来的option数据进行判断
    computed:{
        options(){
            return this.isAxisChart ? this.axisOption : this.normalOption
        }
    }
}
</script>
