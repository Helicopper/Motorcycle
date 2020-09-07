<template>
  <!-- 树图  -->
  <div class="hellotheworld">
	<div class="wrap">
		<aside class="left">
			<p>figure3</p>
			<div class="name">相关推荐词</div>
			<ul>
				<li>类型：树图</li>
				<li>点：检索词</li>
				<li>边：相关性</li>
			</ul>
			<div class="texts">图片描述：为您展示所有检索信息中与[关键词]相关性最强的相关检索词，您可以通过此图了解有关[关键词]的检索方向、替补竞价词、互补竞价词等信息。</div>
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
    name: "tree",
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
          this.draw_tree(id, itemData[i]);
        }
      },
      draw_tree(id, data) {
        let graph_data = data.data;
        let graph_title = data.title;


        let chart = document.getElementById(id);

        var initial = function () {
          let chartParent = chart.parentNode.parentNode;
          chart.style.width = chartParent.clientWidth - 30 + "px";
          chart.style.margin = "0 auto";
          chart.style.height = (chartParent.clientWidth * 0.75 - 30) + "px";
        }
        initial();

        let contain_height = chart.offsetHeight;
        let contain_width = chart.offsetWidth;
        let myChart = echarts.init(chart);
        let option = {
          title: {
            //text: graph_title,
            text:'相关推荐词',
            // subtext: "副标题",
            show: true,
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
          tooltip: {
            trigger: 'item',
            triggerOn: 'mousemove'
          },
          legend: {
            top: '2%',
            left: '3%',
            orient: 'vertical',
            data: {
              // 单棵树的名字
              name: 'tree2',
              icon: 'rectangle'
            },
          },
          
          series: {
            type: 'tree',
            name: 'test-tree',
            // top: '20%',

            top: '10%',
            left: '37%',
            bottom: '10%',
            right: '50%',

            //layout: 'radial',//环形
            // 树的初始层数，从0开始
            initialTreeDepth: 2,
            // 子树折叠和展开的交互
            expandAndCollapse: true,
            // 初始动画的时长
            animationDuration: 300,
            // 数据更新动画的时长。
            animationDurationUpdate: 750,
            data: [graph_data],
            // 可以设置回调函数 (value: Array|number, params: Object) => number|Array
            symbolSize: 15,
            
            label: {
              position: 'left',
              verticalAlign: 'middle',
              align: 'right',
              fontSize: '20'
            },
 			      leaves: {
              		label: {
                		fontSize: 15,
                		position: 'right',
                    verticalAlign: 'middle',
                    align: 'left'
              		}
            },
            emphasis: {
              itemStyle: {
                color: "#ff4040",
                // borderColor: "#555",
              },
              label: {
                fontWeight: "bold",
                // fontSize:20,
              },
              lineStyle: {
                color: "#fff",
                width: 2,
              }
            },
          }
        }

        myChart.setOption(option);

        window.addEventListener('resize', function () {
          initial();
       
          myChart.resize()
        })

          myChart.on("click", function (params) {
          
              //console.log("CLICK");
              //console.log(params.data.name);
              $search.to_display2("1"+","+params.data.name)
         
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
