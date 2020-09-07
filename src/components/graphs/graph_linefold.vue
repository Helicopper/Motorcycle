<template>
  <div class="hellotheworld">
	<div class="wrap">
		<aside class="left">
			<p>figure1</p>
			<div class="name">竞价词报价变化</div>
			<ul>
				<li>类型：折线图</li>
				<li>X轴：时间</li>
				<li>Y轴：价格</li>
			</ul>
			<div class="texts">图片描述：描述[广告商]参与[关键词]竞价的报价随时间的变化，其中最低价与最高价已在图中标明，您可以通过此图了解[广告商]参与[关键词]竞价过程中的竞价能力区间，结合竞价平台市场信息，以及时适当调整针对该[广告商]的整体刺激力度。</div>
		</aside>
		<section class="right">
			<el-tabs type="border-card">
			  <el-tab-pane v-for="(data,index) in items" :key=index :label="index">
				  <div class="graph" :id="keyWord+'_'+index"></div>
			  </el-tab-pane>
			</el-tabs>
		</section>
	</div>
	<div class="blank"></div>
  </div>
</template>
<script>
    import $search from "./../../util/search.js"
    let echarts = require('echarts');

    export default {
        name: "linefold",
        props: {
            items: {
                type: Object,
                default () {
                    return {
                        "test": "test"
                    }
                }
            },
            keyWord:{
                type:String,
                default(){
                    return "keyString"
                }
            }
        },
        data() {
            return {
                 //tabItem:"AllTab"
            }
        },
        mounted() {
            // this.draw_linefold();
            this.start_draw();
        },
        // watch:{
        //     items:function() {
        //         // this.draw_linefold();
        //         console.log("watch items:"+ items);
        //     },
        //     deep:true
        // },
        // updated:function() {
        //     this.$nextTick(function(){
        //         console.log("updated!");
        //         this.start_draw();
        //     })
        // },
        methods: {
            start_draw() {
                // let key = [];
                // console.log("start_draw! this.items="+JSON.stringify(this.items));
                let itemData = this.items;
                // console.log("itemData="+JSON.stringify(itemData));
                for (let i in itemData){
                    console.log("key :"+this.keyWord+"_"+i);
                    let id = this.keyWord+"_"+i;
                    // console.log("before draw_linefold();id:"+id+"  data:"+itemData[i]);
                    this.draw_linefold(id,itemData[i]);
                }
            },
            draw_linefold(id, data) {

                let title = data['title'];
                let testdata = data['data'];
                let chart = document.getElementById(id);
                
                // 给echart初始化宽度，替代系统的初始值100px。参考博客：https://unordered.org/timelines/5a0c74067b000000
                var initial = function () {
                  
                    
                    // 获取 chart 的父父结点chartParent，再根据其算宽度
                    let chartParent = chart.parentNode.parentNode;
                    chart.style.width = chartParent.clientWidth - 30 + "px";
                    chart.style.margin = "0 auto";
                    chart.style.height = (chartParent.clientWidth *0.75 - 30) + "px";
                }
                initial();
                
                // 初始化图的宽度
                // chart.style.width = this.initial_style(chart);

                let myChart = echarts.init(chart);
                let datakey = [];
                var year = [];
                var series = [];
                var j = 0;
                for (var key in testdata) {
                    datakey.push(key);
                    var value = [];
                    for (var i in testdata[key]) {
                        if (j == 0) {
                            year.push(i);
                        }
                        var oneword = testdata[key];
                        value.push(oneword[i]);
                    }
                    j++;
                    //console.log(value)
                    series.push({
                        name: key,
                        type: 'line',
                        data: value,
                        smooth: true,

                        itemStyle : {
                            normal : {
                                areaStyle : {
                                type : 'default',
                                    //渐变色实现
                                color : new echarts.graphic.LinearGradient(0, 0, 0, 1,//变化度
                                //三种由深及浅的颜色
                                    [  
                                       
                                        {
                                        offset : 0,
                                        color : '#B2F4DA'
                                    },
                                        {
                                        offset : 0.5,
                                        color : '#76C5CB'
                                    },
                                     {
                                        offset : 1,
                                        color : '#53A9C3'
                                    }

                                    ]),
                                },
                                lineStyle : {  //线的颜色
                                        color : '#53A9C3'
                                },
                                color : '#53A9C3',
                                //以及在折线图每个日期点顶端显示数字
                                label: {      
                                    show: true,
                                    position: 'top',
                                    textStyle: {
                                            color: 'white'
                                }
                            }
                        }
                    },
                    markPoint: {
                    data: [
                        {type: 'max', name: '最大值'},
                        {type: 'min', name: '最小值'}
                    ]
                    },
                     markLine: {
                        data: [
                            {type: 'average', name: '平均值'}
                        ]
                    },
                    areaStyle : {}

                    })
                }
                //console.log(year)
                //console.log(datakey);
                //console.log(series);

                const option = {
                    title: {
                        text: title
                    },
                    tooltip: {
                        trigger: 'axis'
                    },
                    legend: {
                        // data:['cnn','rnn','lstm','svm','gbdt','perception']
                        data: datakey,
                        y:"10%"
                    },
                    grid: {
                        left: '0%',
                        right: '3%',
                        bottom: '0%',
                        top:"18%",
                        containLabel: true
                    },
                    toolbox: {
                        feature: {
                            dataZoom: {},
                            saveAsImage: {},
                        },
                    },
                    xAxis: {
                        type: 'category',
                        boundaryGap: false,
                        data: year
                    },
                    yAxis: {
                        type: 'value'
                        // type:'log'
                    },
                    series: series,
                   
                    backgroundColor:'#F0F5F8',
                   
                    symbolSize:5

                };

                myChart.setOption(option);

                // 当多个图形渲染时，调用以下方法只能实现最后一个图的自适应效果
                // window.onresize = function(){
                //     console.log("window resize!")
                //     initial();
                //     myChart.resize();
                //     console.log("myChart resize!")
                // }

                // 生成多个图时实现全部都能自适应。参考博客：https://blog.csdn.net/qq_25816185/article/details/82414529
                window.addEventListener('resize', function () {
                    initial();
                    // chart.style.width = this.initial_style(chart);
                    myChart.resize()
                })

                // 这种写法无法实现自适应，不知道为什么
                // window.onresize = ("resize",function() {
                //     initial();
                //     echart.resize()
                // })
                myChart.on("click",function(params){
                    // console.log(params);
                    // window.open("https://www.baidu.com/baidu?wd="+params.seriesName);
                    // $router.push({
                    //     path:"/displayInfo",
                    //     query:{query:params['seriesName'].toLowerCase()}
                    // })
                    let query = params['seriesName'].toLowerCase();
                    $search.to_display(query);
                })
            }
        }
    }
</script>

<style scoped>
  .wrap{
  	width:900px;
  	margin:0 auto;
  	position: relative;
	}   
  
  .left{
		width:300px;
		height:500px;
		position: absolute;
		top:0;
		left:0;
		margin: 0% -3%;
		background: #E1E1E1;
		border:7px solid #FFFFFF;}
  
  .right{
		width:600px;
		height:500px;
		background: #dbeef3;
		position: absolute;
		top:0;
		right:0;
		margin: 0% -3%;
		border:7px solid #FFFFFF;}
  
  .blank{
		width:600px;
		height:550px;}
	
  .name{
		display: inline-block;
		font-size: 25px;
		font-weight: 700;
		background: #f5f5f5;
		padding: 25px;
		width:100%;
		text-align: center;}
		
	p{
		font-size:12px;
		text-align:center;
		color: #999999;}
		
	body{
	background:#F2F2F2;}
   
  .left ul {
    list-style: none;
    margin: 25px 30px 15px 30px;}

  .left li {
    padding: 10px 0;
	font-size: 13px;
    border-bottom: 1px solid #999999;
	text-align: center;}
	
   .texts{
	   width:300px;
	   height:auto;
	   font-size: 14px;
	   padding: 25px;
	   font-family: "arial black";
   }
</style>
