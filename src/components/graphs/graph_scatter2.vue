<template>
  <div class="hellotheworld">
	<div class="wrap">
		<aside class="left">
			<p>figure5</p>
			<div class="name">竞价词检索频率</div>
			<ul>
				<li>类型：散点图</li>
				<li>跨度：天</li>
				<li>点：检索频次</li>
			</ul>
			<div class="texts">图片描述：以一周中的一天为基本单位，展示24h内的[关键词]的检索频率，点越大，检索频次越高，若没有点，则表示该时段没有人进行检索。您可以通过此图了解到每天在什么时候有更多的人查询该[关键词]，并针对高频检索区间加大竞争力度。</div>
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
        name: "scatter2",
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
            this.start_draw();
        },

        methods: {
            start_draw() {
                 //console.log("start_draw! this.items="+JSON.stringify(this.items));
                let itemData = this.items;
                 //console.log("itemData="+JSON.stringify(itemData));
                for (let i in itemData){
                    //console.log("key :"+this.keyWord+"_"+i);
                    let id = this.keyWord+"_"+i;
                    this.draw_scatter(id,itemData[i]);
                }
            },
            draw_scatter(id, data_ori) {

                let title = data_ori['title'];
                let tempdata = data_ori['data'];
                let chart = document.getElementById(id);

                tempdata=tempdata.replace(/\[1/g,"[0");
                tempdata=tempdata.replace(/\[2/g,"[1");
                tempdata=tempdata.replace(/\[3/g,"[2");
                tempdata=tempdata.replace(/\[4/g,"[3");
                tempdata=tempdata.replace(/\[5/g,"[4");
                tempdata=tempdata.replace(/\[6/g,"[5");
                tempdata=tempdata.replace(/\[7/g,"[6");
     
				        let data =eval(tempdata);
             
                var initial = function () { 
                    let chartParent = chart.parentNode.parentNode;
                    chart.style.width = chartParent.clientWidth - 30 + "px";
                    chart.style.margin = "0 auto";
                    chart.style.height = (chartParent.clientWidth *0.75 - 30) + "px";
                }
                initial();

                let myChart = echarts.init(chart);
                let datakey = [];

                var hours = ['12am', '1am', '2am', '3am', '4am', '5am', '6am','7am', '8am', '9am','10am','11am',
                '12pm', '1pm', '2pm', '3pm', '4pm', '5pm','6pm', '7pm', '8pm', '9pm', '10pm', '11pm'];
                var days = ['Monday','Tuesday', 'Wednesday','Thursday','Friday','Saturday', 'Sunday'];
            
                const option = {
                          
                          title: {
                              //text: graph_title,
                              text:'检索频率分布图',
                              // subtext: "副标题",
                              show: true,
                          },
                          tooltip: {
                                  position: 'top'
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
                          title: [],
                          singleAxis: [],
                          series: []
                };

                echarts.util.each(days, function (day, idx) {
                    option.title.push({
                        textBaseline: 'middle',
                        top: (idx + 0.5) * 100 / 7 + '%',
                        text: day
                    });
                    option.singleAxis.push({
                        left: 150,
                        type: 'category',
                        boundaryGap: false,
                        data: hours,
                        top: (idx * 100 / 7 + 5) + '%',
                        height: (100 / 7 - 10) + '%',
                        axisLabel: {
                            interval: 2
                        }
                    });
                    option.series.push({
                        singleAxisIndex: idx,
                        coordinateSystem: 'singleAxis',
                        type: 'scatter',
                        data: [],
                        symbolSize: function (dataItem) {
                            return dataItem[1]*4;
                        }
                    });
              });

              echarts.util.each(data, function (dataItem) {
                  option.series[dataItem[0]].data.push([dataItem[1], dataItem[2]]);
              });
                myChart.setOption(option);
    
                window.addEventListener('resize', function () 
                {
                    initial();
                    myChart.resize()
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
