<template>
	<div class="wrap">
		<aside class="left">
			<p>figure4</p>
			<div class="name">竞价词报价前十</div>
			<ul>
				<li>类型：玫瑰图</li>
				<li>花瓣：广告商</li>
				<li>花瓣长度：平均报价</li>
			</ul>
			<div class="texts">图片描述：为您展示在[关键词]竞价过程中平均报价前十的广告商，您可以通过此图找到针对某单个竞价词来说投入最高的那些广告商们，通过给予适当优惠刺激，提高[关键词]平均竞价水平。</div>
		</aside>
		<section class="right">
			<el-tabs type="border-card">
			  <el-tab-pane v-for="(data,index) in items" :key=index :label="index">
				  <div class="graph" :id="keyWord+'_'+index"></div>
			  </el-tab-pane>
			</el-tabs>
		</section>
		<div class="blank"></div>
	</div>
</template>
<script>
    import $search from "./../../util/search.js"

    let echarts = require('echarts');
    export default {
        name: "rose",
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
                    this.draw_rose(id,itemData[i]);
                }
            },
            draw_rose(id,data) {
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
                for (var key in graph_data) {
                    seriesData.push({
                        name: graph_data[key].name,
                        value: graph_data[key].avePrice,
                        influence:graph_data[key].influence
                    });
                }
				console.log("玫瑰");
                //console.log("seriesData");
                //console.log(seriesData);
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
                      show:true,
                      top:"10%",
                      data: legendData,
                  },
                  color:['rgb(212,158,78)','rgb(144,178,156)','rgb(164,207,187)',
       				'rgb(220,155,131)','rgb(128,179,185)','rgb(91,111,124)','rgb(206,93,90)'],
                  calculable: true,
                  series: [
                      {
                          type: 'pie',
                          //radius: '55%',
                          //center: ['50%', '65%'],
                            radius: [30, 110],
                           // center: ['75%', '50%'],
                            roseType: 'area',
                          
                          itemStyle: {
                              emphasis: {
                                  label: {
                                      show: true,
                                      textStyle: {
                                          fontWeight: 'bold'
                                      },
                                      shadowBlur: 10,
                                      shadowOffsetX: 0,
                                      shadowColor: 'rgba(0, 0, 0, 0.5)'
                                  }
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

               // myChart.on("click",function(params){
                    
                    //$search.to_display3("2",+","+params.data.name);
                //})
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
