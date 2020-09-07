<template>
  <!-- 需求图谱，基于散点图 -->
  <div class="hellotheworld">
	<div class="wrap">
		<aside class="left">
			<p>figure6</p>
			<div class="name">核心广告商影响力</div>
			<ul>
				<li>类型：动态特效点</li>
				<li>点：广告商</li>
				<li>相近度：影响力</li>
			</ul>
			<div class="texts">图片描述：展示对于[关键词]来说影响力前五的广告商，越接近[关键词]核心的广告商结点，其在竞价过程中的影响力越大，您可以通过此图找到针对某单个竞价词来说最具有影响力的那些广告商们，通过给予适当优惠刺激，提高[关键词]平均竞价水平。</div>
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
    name: "correlation",
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
        type: String,
        default () {
          return "keyString"
        }
      }
    },
    data() {
      return {}
    },
    mounted() {
      this.start_draw();
    },
    methods: {
      start_draw() {
        let itemData = this.items;
        for (var i in itemData) {
          //console.log("key :" + this.keyWord + "_" + i);
          let id = this.keyWord + "_" + i;
          this.draw_demandMap(id, itemData[i]);
        }
      },
      transform_data(data,max) {
        let result = [];
        for (let index in data) {
          let arr = [];
          // 计算坐标值，令点到中心的值=correlation，即correlation^2 = x^2 + y^2
          // 经过 abs() 和 log() 处理，平滑数据
          // let crela = Math.log(Math.abs(data[index].correlation)+1);
          let crela =max- data[index].value+100;
          crela = Math.abs(crela) + 1;
          crela = Math.log(crela);
          // 横坐标 x 不超过相关性的值
          let x = Math.random() * crela;
          // 随机正负
          x = x * (Math.random() > 0.5 ? 1 : -1);
          // 计算纵坐标 y
          let y = Math.sqrt(crela * crela - x * x);
          // 随机正负
          y = y * (Math.random() > 0.5 ? 1 : -1);

          arr.push(x);
          arr.push(y);
          arr.push(data[index].name);
          arr.push(data[index].value);

          result.push(arr);
        }
        return result;
      },
      get_max_min(data, label) {
        // label=1时，求最大值; label=-1时，求最小值；
        let result = data[0].value;
        for (let i in data) {
          if (i === "center" ) continue;
          //for (let j = 0; j < data[i].length; j++) {
            let flag = label * (result - data[i].value);
            if (flag < 0) {
              result = data[i].value;
            }
          }
        
        result = Math.log(Math.abs(result + 1))
        return result;
      },
      tooltip_format(params) {
        let name = params.data[2];
        let value = params.data[3];
        let x = params.data[0];
        let y = params.data[1];
        let crela = Math.round(x * x + y * y);
        // 拼接字符串
        let str = "" + name + "<br/> value: " + value + "<br/> value: " + crela;
        return str;
      },
      draw_demandMap(id, data) {
        let graph_data = data.data;
        let graph_title = data.title;


        let axis_max = this.get_max_min(graph_data.point, 1);
        let chart = document.getElementById(id);

        var initial = function () {
          let chartParent = chart.parentNode.parentNode;
          chart.style.width = chartParent.clientWidth - 30 + "px";
          chart.style.margin = "0 auto";
          chart.style.height = (chartParent.clientWidth *0.75 - 30) + "px";
        }
        initial();

        console.log(graph_data.point);
        var maxvalue=0;
        for (var i in graph_data.point)
        {   
            //console.log(graph_data.point[i]);
            //console.log(graph_data.point[i].value);
            if(graph_data.point[i].value>maxvalue)
                maxvalue=graph_data.point[i].value;
        }
        console.log("maxvalue");
        console.log(maxvalue);

        let center_data = this.transform_data(graph_data.center,-100);
        let point_data = this.transform_data(graph_data.point,maxvalue);


        let myChart = echarts.init(chart);

        // 组件高度
        // let contain_height = chart.offsetHeight;
        let chart_height = myChart.getWidth();
        // 组件宽度
        // let contain_width = chart.offsetWidth;
        let chart_width = myChart.getHeight();

        let option = {
          title: {
            text: graph_title,
            subtext: "距离中心点越近，影响力越强",
            left: "left"
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
          // 数据区域缩放
          dataZoom: [
            {
              type: 'slider',
                // 控制x轴
                xAxisIndex: 0,
                bottom: "1%",
                start: 0,
                end: 100,
                showDetail: false,
            },
            {
                type: 'inside',
                // 控制x轴
                xAxisIndex: 0,
                start: 0,
                end: 100,
                showDetail: false,
            },
            {
                type: 'slider',
                // 控制y轴
                yAxisIndex: 0,
                right: "1%",
                start: 0,
                end: 100,
                showDetail: false,
            },
            {
                type: 'inside',
                // 控制y轴
                yAxisIndex: 0,
                start: 0,
                end: 100,
                showDetail: false,
            }
          ],
          tooltip: {
            show: true,
            // formatter: this.tooltip_format(params),
            formatter: function (params) {
              let name = params.data[2];
              let value = params.data[3];
              // 计算相关性
              let x = params.data[0];
              let y = params.data[1];
              let crela = Math.round(x * x + y * y);
              // 拼接字符串
              let str = "" + name + "<br/> value: " + value + "<br/> distance: " + crela;
              return str;
            },
            position: "top"
          },
          legend: {
            show: true,
            x: "center",
            y: "5%",
            data: [{
                name: "上升"
              },
              {
                name: "下降"
              }
            ]
          },
          series: [{
              // 中心点-------------------
              name: "bidword",
              zlevel: -1,
              type: "effectScatter",
              effectType: "ripple",
              // 何时显示特效
              showEffectOn: "render",
              rippleEffect: {
                // 动画中波纹的最大缩放比例
                scale: 10,
                // 动画的周期，秒数
                period: 15,
                // 波纹绘制方式
                brushType: "fill"
              },
              // 图例 hover 时的联动高亮
              legendHoverLink: true,
              //是否开启鼠标 hover 的提示动画效果。
              hoverAnimation: true,
              // 使用的直角坐标系
              // coordinateSystem: "cartesian2d",
              encode: {
                x: 0,
                y: 1,
                label: 2,
              },
              symbol: 'circle',
              // symbolSize: axis_max,
              symbolSize: function (center_data) {
                // return center_data[3]
                return chart_width / 10;
              },
              // 图标样式
              itemStyle: {
                //color: 'rgb(129,179,185)',
                color: 'rgb(169,203,207)',

              },
              label: {
                show: true,
                color: "#555",
                fontSize: 20,
                fontWeight: "bold",
                position: "inside",
              },
              data: center_data
            },
            {
              name: "广告商",
              zlevel: 2,
              // 涟漪散点图
              type: "effectScatter",
              effectType: "ripple",
              showEffectOn: "emphasis",
              // 散点图
              // type: "scatter",
              // 图例 hover 时的联动高亮
              legendHoverLink: true,
              // 使用的直角坐标系
              // coordinateSystem: "cartesian2d",
              encode: {
                x: 0,
                y: 1,
                label: 2,
              },
              symbol: 'circle',
              // symbolSize: contain_width / 30,
              symbolSize: function (params) {
                return chart_width/20 + 2 * Math.log(params[3]);
              },
              // 图标样式
              itemStyle: {
                // color: "#FFCC66",
                color: "rgb(249,210,36)",
              },
              label: {
                show: true,
                color: "#555",
                fontSize: 15,
                position: "bottom",
              },
              emphasis: {
                label: {
                  fontWeight: "bold",
                  fontSize: 16,
                  backgroundColor: "#fff"
                }
              },
              data: point_data
            }
          ],
          // x轴--------------------------------------------------
          xAxis: [{
            show: true,
            zlevel: 20,
            type: 'value',
            // 坐标轴最大最小值
            min: -axis_max,
            max: axis_max,
            axisLine: {
              lineStyle: {
                color: "#aaa",
                opacity: 0.5
              }
            },
            axisLabel: {
              show: false,
              margin: chart_height / 25,
              fontWeight: "bold",
              formatter: function (value, index) {
                var xlabel = ["弱相关", " ", '强相关', " ", '强相关', " ", '弱相关'];
                return xlabel[index]
              },
            },
            // x轴分割线
            splitLine: {
              show: false,
            },
            splitArea: {
              show: false,
            },
          }],
          // y轴--------------------------------------------------
          yAxis: [{
            show: false,
            zlevel: 0,
            type: 'value',
            top: "10%",
            min: -axis_max,
            max: axis_max,
          }],
        }

        myChart.setOption(option);

        window.addEventListener('resize', function () {
          initial();
          // chart.style.width = this.initial_style(chart);
          myChart.resize()
        })

        myChart.on("click", function (params) {
        
    
          //console.log("click params.data[2]");
          //console.log(params.data[2]);
          var str = "2"+","+params.data[2];
          console.log(str);
          $search.to_display3(str)

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