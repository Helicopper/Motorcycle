<template>
  <div class="hellotheworld">
	<div class="wrap">
		<aside class="left">
			<p>figure3</p>
			<div class="name">竞价词投入</div>
			<ul>
				<li>类型：条形图</li>
				<li>纵轴：时间</li>
				<li>横轴：投入</li>
			</ul>
			<div class="texts">图片描述：描述[广告商]在多个竞价词上面的投入情况。其中投入=点击次数*单次点击价格，您可以通过此图，综合性了解不同时段的不同竞价词的被检索情况和大致价格，评估单个广告商带来的收益。</div>
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
        name: "bar",
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
             
                //console.log("start_draw! this.items="+JSON.stringify(this.items));
                let itemData = this.items;
                // console.log("itemData="+JSON.stringify(itemData));
                for (let i in itemData){
                    let id = this.keyWord+"_"+i;
                    this.draw_bar(id,itemData[i]);
                }
            },
            draw_bar(id, data) {

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
                var series = [];
                
                function compare(property){
                    return function (obj1,obj2){
                        let ave1=0;
                        let ave2=0;
                        for(var i in obj1[property])
                            ave1+=i;
                        for(var i in obj2[property])
                            ave2+=i;
                        ave1/=7;  ave2/=7;
                        return ave1-ave2;
                     }
                }
                
                testdata=testdata.sort(compare('value'));
                console.log("testdata");
                console.log(testdata);
                var count=0;
                for (var i in testdata)
                {
                    count+=1;
                    if(count>10) break;
                    var name =testdata[i].name
                    var value = testdata[i].value;
                    series.push({
                        name: name,
                        type: 'bar',
                        stack:'总量',
                        label: {
                                    show: true,
                                    color:'black',
                                    position: 'top'
                        },
                        data: value
                        
                    })
                }
                
                const option = {
                         tooltip: {
                            trigger: 'axis',
                            axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                                type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                            }
                        },
                        legend: {
                                data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
                        },
                        grid: {
                            left: '3%',
                            right: '4%',
                            bottom: '3%',
                            containLabel: true
                        },
                        xAxis: {
                            type: 'value'
                        },
                        yAxis: {
                            type: 'category',
                            data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
                        },
                         // color:['#1e824c', '#049372','#019875',  '#16a085','#03a678',
   // '#4daf7c', '#90c695'],
                         color:['rgb(132,248,179)','rgb(134,243,189)','rgb(135,239,195)','rgb(136,236,201)',
  'rgb(137,231,209)','rgb(138,227,216)','rgb(140,223,223)','rgb(140,220,228)',
  'rgb(141,217,233)','rgb(142,213,240)',
  ],
                        series:series
                };

                myChart.setOption(option);

             
                window.addEventListener('resize', function () {
                    initial();
                    // chart.style.width = this.initial_style(chart);
                    myChart.resize()
                })

              
                myChart.on("click",function(params){
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
