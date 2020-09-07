<template>
  <div class="hellotheworld">
	<div class="wrap">
		<aside class="left">
			<p>figure1/4</p>
			<div class="name">竞价词均价对比</div>
			<ul>
				<li>类型：雷达图</li>
				<li>轴：竞价词</li>
				<li>放射线：均价</li>
			</ul>
			<div class="texts">图片描述：展示[广告商]高投入参与竞价的[竞价词]，并通过放射线展示其历史最高均价，您可以通过此图了解到[广告商]参与竞价的深度与趋势，锁定[广告商]主要竞价方向，个性化推荐替补竞价词或其他相关竞价词。</div>
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
        name: "radar",
        props: {
            items: {
                type: Object,
                default () {
                    return {
                        "test": "test"
                    }
                }
            },
            keyWord: {
                type:String,
                default() {
                    return "test"
                }
            }
        },
        data() {
            return {
                // tabItem:"Paper"
            }
        },
        mounted() {
            this.start_draw();
        },
       
        methods: {
            start_draw() {
                // let key = [];
                // console.log("start_draw! this.items="+JSON.stringify(this.items));
                let itemData = this.items;
                // console.log("itemData="+JSON.stringify(itemData));
                for (var i in itemData){
                    // console.log("key :"+this.keyWord+"_"+i);
                    let id = this.keyWord+"_"+i;
                    // console.log("before draw_linefold();id:"+id+"  data:"+itemData[i]);
                    this.draw_radar(id,itemData[i]);
                }
            },
            draw_radar(id,data) {
                let chart = document.getElementById(id);
                var initial = function () {
                    // 根据想要的效果调整的公式，不是固定的
                    // chart.style.width = (window.innerWidth/4)+80+"px";
                    
                    // 获取 chart 的父父结点chartParent，再根据其算宽度
                    let chartParent = chart.parentNode.parentNode;
                    chart.style.width = chartParent.clientWidth - 30 + "px";
                    chart.style.margin = "0 auto";
                    chart.style.height = (chartParent.clientWidth *0.75 - 30) + "px";
                }
                initial();

                let myChart = echarts.init(chart);
                let title = data['title'];
                let graph_data = data['data'];
               
                //console.log(graph_data);
                let year = []; //图例，同时也是key值数组
                let indicatorName = []; //存放name值
                let indicator = [];  //赋给echarts的indicator
                let seriesData = []; //json对象数组，每一个json对象包含name和value数组
                let seriesValue = []; //遍历时临时数组，结束一轮遍历之后赋值给seriesData
                let seriesName = [];
                let max = 0; //所有value的最大值
                let series = []; //赋给echarts的series
                let j = 0;//计数器
                let valuei=[];
                for (var key in graph_data){
                    //year.push(key);
                    var oneyear = graph_data[key];
                     //console.log("oneyear")
                     //console.log(oneyear);
                    //for (var i=0; i<oneyear.length; i++){
                        if(max<oneyear.value){max=oneyear.value};
                        seriesValue.push(oneyear.value);
                        seriesName.push(oneyear.name);
                        indicatorName.push(oneyear.name);
                        valuei.push(oneyear.value);
                        //if(j==0){indicatorName.push(oneyear.name);}
                    //}
                    j++;
                    
                    seriesData.push({
                        value:seriesValue
                    })
                  
                    seriesValue = [];
                    seriesName = [];
                };
                //console.log("seriesData");
                    //console.log(seriesData);
                
                //console.log(indicatorName);
                for(var i=0; i<indicatorName.length; i++){
                    indicator.push({
                        text:indicatorName[i],
                        max:max
                    })
                }
                console.log("valuei");
                console.log(valuei);
                console.log("seriesData[0].value");
                console.log(seriesData[0].value);
               
                    series.push({
                        name:'参与竞争的竞价词',
                        type: 'radar',
                        symbol: 'none', //拐角点是否显示。默认显示圆形的点 | "rect"显示方形点
                        symbolSize:5,  //拐角点的大小，等于0不显示
                 
                        emphasis: {
                            areaStyle: {
                                // color: 'rgba(0,250,0,0.3)', //鼠标移动到数据区域内时显示的颜色
                            }
                        },
                        
                        lineStyle:
                        {
                            color:'#5F9EA0'
                        },

                        itemStyle: {
                            color: '#5F9EA0'
                        },
                        areaStyle: {
                            opacity: 0.4
                        },                   
                        data:[
                        {
                            //value: seriesData[0].value,
                            value: valuei,
                            //name:"bidword1"
                        }
                       
                           
                        ]
                    });
                console.log("series");
                console.log(series);

                const option = {
                    title: {
                        text: title,
                        top: 10,
                        left: 10
                    },
                    tooltip: {
                        trigger: 'item',
                        backgroundColor : 'rgba(0,0,250,0.2)'
                    },
                    legend: {
                        type: 'scroll',
                        bottom: 10,
                        data: year
                    },
                     toolbox: {
                              show: true,
                              feature: {
                                  saveAsImage: {
                                      show: true,
                                      type: "png",
                                      pixelRatio: 3
                                  },
                                  restore: {
                                      show: true
                                    }
                              }
                          },
                 
                    radar: {
                        shape: 'circle',
                        indicator:indicator
                    },
                    
                    splitNumber: 5,
                    splitLine: {
                        lineStyle: {
                            color: [
                                'rgba(238, 197, 102, 0.1)', 'rgba(238, 197, 102, 0.2)',
                                'rgba(238, 197, 102, 0.4)', 'rgba(238, 197, 102, 0.6)',
                                 'rgba(238, 197, 102, 0.8)', 'rgba(238, 197, 102, 1)'
                            ].reverse()
                        }
                    },
                    splitArea: {
                        show: false
                    },
                     axisLine: {
                        lineStyle: {
                            color: 'rgba(238, 197, 102, 0.5)'
                        }
                    },
                    triggerEvent:true,  //配置文字绑定点击事件！
                     
                    series : series, //具体格式见上方series的处理过程
                    //color: ["#60acfc","#32d3eb","#5bc49f","#feb64d","#ff7c7c","#9287e7"] //每一个数据区域的颜色，循环显示
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
                    if(params['componentType'] == 'radar'){
                        // $router.push({
                        //     path:"/displayInfo",
                        //     query:{query:params['name'].toLowerCase()}
                        // })
                        $search.to_display(params['name'].toLowerCase())
                    }
                    if(params['componentType'] == 'series'){
                        // $router.push({
                        //     path:"/displayInfo",
                        //     query:{query:params['data']['name'].toLowerCase()}
                        // })
                        $search.to_display(params['data']['name'].toLowerCase())
                    }

                })
            },
            // set_color(){
            //     let testcolor = ["rgb(129, 212, 250)","rgb(239, 154, 154)","rgb(128, 203, 196)","rgb(129, 199, 132)","rgb(156, 204, 101)","rgb(212, 225, 87)","rgb(255, 213, 79)","rgb(255, 167, 38)","rgb(255, 110, 64)","rgb(161, 136, 127)","rgb(248, 187, 208)","rgb(128, 203, 196)","rgb(209, 196, 233)"]
            //     let num = Math.floor(Math.random() * testcolor.length);
            //     return testcolor[num]
            // }
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
