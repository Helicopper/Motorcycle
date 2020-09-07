<template>
  <div class="hellotheworld">
	<div class="wrap">
		<aside class="left">
			<p>figure4</p>
			<div class="name">CTR评估</div>
			<ul>
				<li>类型：饼图</li>
				<li>区块：竞价词</li>
				<li>区块面积：点击率占比</li>
			</ul>
			<div class="texts">图片描述：展示对于[广告商]来说参与竞价的竞价词点击率对比，评估[广告商]对不同竞价词的投入与产出之比，预测[广告商]未来的投入方向，适当提高高点击量的竞价词价格，而对低点击量的竞价词进行降价处理。</div>
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

<script src="echarts.js"></script>
<!-- 引入 vintage 主题 -->
<script src="theme/vintage.js"></script>


<script>
    import $search from "./../../util/search.js"

    let echarts = require('echarts');
    export default {
        name: "pie",
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
               
                console.log("start_draw! this.items="+JSON.stringify(this.items));
                let itemData = this.items;
                
                for (let i in itemData){
                    let id = this.keyWord+'_'+i;
                    this.draw_pie(id,itemData[i]);
                }
            },
            draw_pie(id,data) {

               //var chart = echarts.init(document.getElementById('main'), 'vintage');
                let chart = document.getElementById(id);
                // 给echart初始化宽度，替代系统的初始值100px。参考博客：https://unordered.org/timelines/5a0c74067b000000
                var initial = function () {
            
                    let chartParent = chart.parentNode.parentNode;
                    chart.style.width = chartParent.clientWidth - 30 + "px";
                    chart.style.margin = "0 auto";
                    chart.style.height = (chartParent.clientWidth *0.75 - 30) + "px";
                }
                initial();
                let title = data['title']
                let graph_data = data['data']
                let legendData = Object.keys(graph_data);
                let seriesData = [];
                let min =graph_data[0].value;
                let max =graph_data[0].value;

                  function sortValue(a,b){  

                        return a.value-b.value;  

                  }
                graph_data.sort(sortValue);

                for (var key in graph_data) {
                    seriesData.push({
                        name: graph_data[key].name,
                        value: graph_data[key].value,
                    });
                    if(graph_data[key].value>max) max = graph_data[key].value;
                    if(graph_data[key].value<min) min=graph_data[key].value;
                }

                console.log("seriesData");
                console.log(seriesData);
                let myChart = echarts.init(chart);

                const option = {
                  title: {
                      text: title,
                  
                      y: 'top'
                  },
                  tooltip: {
                      trigger: 'item',
                      formatter: "{b} : {c} ({d}%)"
                  },
                  legend: {
                      
                    type: 'scroll', // 图例过多加上滚动条
                    //   orient: 'vertical',
                      show:true,
                    //   right: 10,
                      top:"10%",
                    //   bottom: 0,
                      data: legendData,
                      // selected: data.selected
                  },
                    visualMap: {
                  
                        show: true, 
                        min: min, max: max,
                        inRange: {
                            color: ['rgb(117, 212, 207)'],
                            colorLightness: [0.5, 0.8]
                        }
                }, 
                //  color: ["rgb(255, 138, 128)","rgb(225, 190, 231)","rgb(130, 177, 255)","rgb(128, 222, 234)","rgb(129, 199, 132)","rgb(255, 183, 77)","rgb(245, 124, 0)","rgb(248, 187, 208)"],
                  calculable: true,
                  series: [
                      {
                          type: 'pie',
                           radius: ['50%', '70%'],
                           label: {
                                       
                                            show: false,
                                            position: 'center'
                                  },
                          emphasis: {
                                            show: true,
                                            textStyle: {
                                                fontSize: '30',
                                                fontWeight: 'bold'
                                            }
                          },
                       
                          itemStyle: {
                              emphasis: {
                                   
                              }
                          },
                          data: seriesData,
                          //roseType: 'radius'  // 玫瑰图
                      }
                  ]
              };

                myChart.setOption(option);

                // 生成多个图时实现全部都能自适应。参考博客：https://blog.csdn.net/qq_25816185/article/details/82414529
                window.addEventListener('resize', function () {
                    initial();
                    myChart.resize()
                })

                myChart.on("click",function(params){
                    let query = params.data.name.toLowerCase()
                    var str="1"+","+query;
                    $search.to_display(str);

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
