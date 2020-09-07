<template>
  <div class="hellotheworld">
	<div class="wrap">
		<aside class="left">
			<p>figure7</p>
			<div class="name">平均价预测</div>
			<ul>
				<li>类型：折线图</li>
				<li>X轴：时间</li>
				<li>Y轴：价格</li>
			</ul>
			<div class="texts">图片描述：通过历史数据，预测竞价词将来的价格走势。您可以根据平均价的变化趋势，预判需要投入多少成本，并针对这些信息调整对该关键词的竞价策略。</div>
		</aside>
		<section class="right">
			<el-tabs type="border-card">
			  <el-tab-pane v-for="(data,index) in items" :key=index :label="index">
				  <div class="graph" :id="keyWord+'_'+index"></div>
			  </el-tab-pane>
			</el-tabs>
		</section>
	</div>
  </div>
</template>
<script>
    import $search from "./../../util/search.js"
    let echarts = require('echarts');

    export default {
        name: "linefold3",
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
           
                var initial = function () {
                  
                   
                    let chartParent = chart.parentNode.parentNode;
                    chart.style.width = chartParent.clientWidth - 30 + "px";
                    chart.style.margin = "0 auto";
                    chart.style.height = (chartParent.clientWidth *0.75 - 30) + "px";
                }
                initial();

                let myChart = echarts.init(chart);
                let datakey = [];
                var year = [];
                var series = [];
                var j = 0;
                var colors=['rgb(180,227,205)'];
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
                    if(j>4) break;
                    //console.log(value)
                    series.push({
                        name: key,
                        type: 'line',
                        data: value,
                        smooth: false,

                        itemStyle : {
                            normal : {
                              
                                lineStyle : {  //线的颜色
                                        color :'rgb(129,179,185)',
                                        width:3
                                },
                                color : '#53A9C3',
                                //以及在折线图每个日期点顶端显示数字
                                label: {      
                                    show: false,
                                    position: 'top',
                                    textStyle: {
                                           // color: 'white'
                                }
                            }
                        }
                    },
                    markPoint: {
                    data: [
                        {type: 'max', name: '最大值'},
                        {type: 'min', name: '最小值'}
                    ],
                    itemStyle:{
                            color: 'rgb(129,179,185)'
                        }
                    },
                  
                    })
                }
 
                const option = {
                    title: {
                        text: title
                    },
                    tooltip: {
                        trigger: 'axis'
                    },
                   
                    grid: {
                        left: '0%',
                        right: '3%',
                        bottom: '0%',
                        top:"18%",
                        containLabel: true
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
                    //backgroundColor:'#F0F5F8',
                    symbolSize:5

                };

                myChart.setOption(option);
                window.addEventListener('resize', function () {
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
