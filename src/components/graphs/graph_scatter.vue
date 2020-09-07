<template>
  <div class="hellotheworld">
	<div class="wrap">
		<aside class="left">
			<p>figure2/3</p>
			<div class="name">竞价影响力与价值分布</div>
			<ul>
				<li>类型：散点图</li>
				<li>点：竞价词</li>
				<li>维度：平均价格/影响力</li>
			</ul>
			<div class="texts">图片描述：展示[广告商]参与竞价的所有竞价词的影响力与价值分布，每一个点表示该广告商参与竞价过的一个竞价词，您可以通过此图了解[广告商]参与竞价的广度，也可以通过选择某一结点了解对应的平均价格与影响力，选出对于[广告商]而言平均报价大同时影响力也大的竞价词。</div>
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
        name: "scatter",
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
                    this.draw_scatter(id,itemData[i]);
                }
            },
            draw_scatter(id, data) {

                let title = data['title'];
                let testdata = data['data'];
                let chart = document.getElementById(id);
                
               
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
                
                var bidword=[];
                var avePrice=[];
                var influence=[];
                var series = [];
                var j = 0;
                var xy=[];
                var min=99999;
                var max=0;

                for (var key in testdata){
                    var onedata = testdata[key];
                    //bidword.push(onedata.bidword);
                    if(onedata.influence>max) max =onedata.influence;
                    if(onedata.influence<min) min=onedata.influence; 
                    bidword.push(onedata.bidword);
                    avePrice.push(onedata.avePrice);
                    influence.push(onedata.influence);
                    xy.push([onedata.avePrice,onedata.influence,onedata.bidword]);
                }
                series.push({
                        name: 'bidword',
                        type: 'scatter',
                        symbolSize: 9,
                        data: xy
                    })
                        
                
                const option ={

                    title: {
                            text: title,
                            left: 'left',
                            top: 0
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
                                    show: true,
                                }
                            }
                    },
                    visualMap: {     
                        min: min,
                        max:  max,                 
                        dimension: 1,
                        orient: 'vertical',
                        right: 10,
                        top: 'center',
                        text: ['HIGH', 'LOW'],
                        calculable: true,
                        inRange: {
                            color: ['#37ecba', '#72afd3']
                        }
                    },
                    
                    tooltip: {
                        trigger: 'item',
                        //backgroundColor : 'rgba(0,0,250,0.2)' ,
                        padding: 10,
                        //backgroundColor: '#222',
                        //borderColor: '#777',
                        //borderWidth: 1,
                        formatter: function (obj) {
                            var value = obj.value;
                             return '<div style="border-bottom: 1px solid rgba(255,255,255,.3); font-size: 18px;padding-bottom: 7px;margin-bottom: 7px">'
                               +'name: '+ value[2] +'<br>'
                              + 'avePrice: ' + value[0] + '<br>' + 'influence: '+value[1]
                              +'</div>';
                        },
						
                        /*
                        axisPointer: {
                            type: 'cross'
                        },
                        padding: 10,
                        backgroundColor: '#222',
                        borderColor: '#777',
                        borderWidth: 1,
                        
                        */
                    },
                    
                    xAxis: [{
                        type: 'value',
                        name : 'avePrice'
                    }],
                    yAxis: [{
                        type: 'value',
                        name: 'influence'
                    }],
                    series: series 
                   
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
                window.addEventListener('resize', function () 
                {
                    initial();
               
                    myChart.resize()
                })

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
                console.log("哈哈哈");
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
		font-size: 20px;
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
