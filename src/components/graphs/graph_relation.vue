// 关系图
<template>
  <div>
	<div class="wrap">
		<div class="jieshao">
			<ul>
				<li> '关键词' 竞争网络图</li>
			</ul>
			<div class="detail">图中结点表示参与竞价的公司，边表示竞争关系。两个广告商之间的竞争表现在：提高价格，导致二者排名顺序关系的改变。只有两个广告商发生过两次以上过程才可以充分认定二者存在稳定的竞争关系。您可以通过点击结点查看对应广告商的详细信息与数据。</div>
		</div>
	</div>
	
	<div class="blank3"></div>

	<div class="picture">
		<el-tabs type="border-card">
		  <el-tab-pane v-for="(data, index) in items" :key=index :label="index">
			<div class="graph" :id="keyWord+'_'+index"></div>
		  </el-tab-pane>
		</el-tabs>
	</div>

	<div class="blank2"></div>
  </div>
</template>
<script>
  import $search from "./../../util/search.js"
  import $graphs from "./../../util/drawGraphs.js"
  let echarts = require('echarts');

  export default {
    name: "relation",
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
      return {
        // graph_title: "专家合作网络"
      }
    },
    mounted() {
      this.start_draw();
    },
    methods: {
      start_draw() {
        let itemData = this.items;
        for (var i in itemData) {
          console.log("key :" + this.keyWord + "_" + i);
          let id = this.keyWord + "_" + i;
          this.draw_relation(id, itemData[i]);
        }
      },
      draw_relation(id, graph_data) {
        let graph_title = graph_data.title;
        let data = graph_data.data;
		let bidword = graph_data.bidword;
 // 专家信息
        let graph_detail = graph_data.detail;

        // 初始化
        let chart = document.getElementById(id);

        var initial = function () {
          let chartParent = chart.parentNode.parentNode;
          chart.style.width = chartParent.clientWidth - 30 + "px";
          chart.style.margin = "0 auto";
          chart.style.height = (chartParent.clientWidth *0.75 - 30) + "px";
          // chart.style.height = (chartParent.clientHeight) + "px";
        }
        initial();

        // 数据中点的个数
        let nodes = data.node;
        let node_num = nodes.length;

        // 色盘
        // let colors = ["#D53A35", "#334B5C", "#D48265", "#9FDABF","#8E8DBE", "#7A306C", "#7FAE90", "#DE9325", "#CFB2A9", "#797B7F"]
        // let colors = [ "rgba(90, 125, 124, 1)", "#12569B","#DE9325", "#CFB2A9", "#797B7F"]
        let colors = ["rgba(90,136,149,1)",  "rgba(75,192,192,0.8)", "rgba(210,179,224,1)",  "rgba(255,206,86,0.8)", "rgba(168,196,252,1)","rgba(255,159,64,0.8)"]
    
        // echarts 实例初始化
        let myChart = echarts.init(chart);

        // 计算节点大小
        let min_size = myChart.getWidth() / node_num * 0.8;
        let max_size = myChart.getWidth() / node_num * 4;
        let minus = max_size - min_size;

        let option = {
           title: {
              text: graph_title,
              subtext: '点击结点可查看该广告商的详细信息',
              left: 'left',
            //backgroundColor: 'rgba(0,0,0,0)',//标题背景颜色，默认'rgba(0,0,0,0)'透明
            borderColor: '#778899',//标题边框颜色
            borderWidth: 5,//标题边框线宽，单位px，默认为0（无边框）
            padding: 5,//标题内边距，单位px
            textStyle: {
                fontSize: 26
            },
            subtextStyle: {
                fontSize: 20
            },
             zlevel:2

          },
          animationDurationUpdate: 50,
          animationEasingUpdate: 'quinticInOut',
          draggable:true,
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
          tooltip:{
            show: true,
            trigger:'item',
            formatter: function (params) {
           
            var htmlStr ='<div>';
            htmlStr += params.name + '<br/>';//x轴的名称
            //为了保证和原来的效果一样，这里自己实现了一个点的效果
            htmlStr += '<span ></span>';
            
            //添加一个汉字，这里你可以格式你的数字或者自定义文本内容
            //htmlStr += params.seriesName + '：'+params.value + '笔';
            
            htmlStr += '</div>';
            
            return htmlStr;
          }

		  },
          series: [{
            type: 'graph',
            // --------------------------
            // 布局类型
            // layout: "none",
            // layout: 'circular',
            // circular: {
            //   rotateLabel: true,
            // },
            layout: 'force',
            force: {
              initLayout: "circular",
              // 斥力
              repulsion: 400,
              gravity: 0.25,
              // edgeLength: [(myChart.getWidth()/node_num), (myChart.getWidth() / node_num +200)]
              edgeLength: [(myChart.getWidth()/12)+min_size, (myChart.getWidth()/8)+min_size]
            },
            // --------------------------

            // 位置
            top: "15%",
            bottom: "10%",
            right: "15%",
            left: "15%",
            progressiveThreshold: 500,
            roam: true,
            focusNodeAdjacency: true,
            // 点的数据  ---------------------------------
            data: data.node.map(function (node, index) {

              //let symbolSize = min_size + (node.value / 100 * minus);
              let symbolSize = 35;
              let color_index = ((node.value/10) > colors.length)? ((node.value/10)%colors.length) : (node.value/10);
              color_index = parseInt(color_index)

              return {
                name: node.name,
                value: node.value,
                symbolSize: symbolSize,
                symbol:"image://data:image/png;base64,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",
                // symbolSize: node_num>20 ? (chart.parentNode.parentNode.clientWidth / 17) : (chart.parentNode.parentNode.clientWidth / 10),
                itemStyle: {
                  color: colors[color_index],
                  opacity: 0.8
                },
                tooltip: {
                  position: ["1%", "8%"],
                  formatter: function (params) {
                    if (params.dataType === "edge") {
                      return params.data.source + " + " + params.data.target;
                    } else if (params.dataType === "node") {
                      return $graphs.get_detail(node.name, graph_detail)
                    }
                  }
                }
              };
            }),
            // 边的数据  ---------------------------------
            links: data.link.map(function (link) {
              return {
                source: link.source,
                target: link.target
              };
            }),
            // 边两端标记
            edgeSymbol: ['none', 'none'],
            edgeSymbolSize: 5,
            label: {
              show: true,
              position: "right",
              color: "#000"
            },
            lineStyle: {
              width: 1,
              curveness: 0.3,
              opacity: 0.9
            },
            // 强调样式
            emphasis: {
              label: {
                show: true,
                position: 'inside',
                fontSize: 18,
                fontWeight: "bold",
                color: "#000",
                textBorderColor: "#fff",
                textBorderWidth: 2
              },
              itemStyle: {
                shadowColor: 'rgba(0, 0, 0, 0.5)',
                shadowBlur: 5,
                opacity: 1
              },
              lineStyle: {
                width: 1.5,
                color: "#000",
                opacity: 1,
                // shadowColor: 'rgba(0, 0, 0, 0.7)',
                // shadowBlur: 5,
              },
              edgeLabel: {
                show: false,
                color: "#000",
                // formatter: function (params) {
                //   return params.data.source + "-->" + params.data.target;
                // }
              }
            }
          }]
        };

        myChart.setOption(option);

        window.addEventListener('resize', function () {
          initial();
          // chart.style.width = this.initial_style(chart);
          myChart.resize()
        })

        myChart.on("click", function (params) {
          if (params.dataType === "node") {
            // $router.push({
            //   path: "/displayInfo",
            //   query: {query: params.data.name}
            // })
           //str=params.data.name.replace(/\*/g,"\\*");
		   $search.to_display("3,"+bidword+","+params.data.name)  
		   //$search.to_display("3,"+bidword+","+params.data.name.replace(/\*/g,"\\*"))
          }
        })
      }
    }
  }
</script>

<style scoped>
   .jieshao {
   	width:650px;
   	height:150px;
   	position: absolute;
   	top:0;
   	left:50%;
	margin-left:-325px;
   	background: #E1E1E1;
   	border:2px solid #FFFFFF;
   }
   
    .detail{
		width:650px;
		height:auto;
		font-size: 14px;
		padding: 20px;
		font-family: "arial black";				      
	  }

   .jieshao ul {
     list-style: none;
     margin: 0px 100px 0px 100px;}
   
   .jieshao li {
    padding: 10px 0;
   	font-size: 16px;
	font-weight: bold;
    border-bottom: 1px solid #999999;
   	text-align: center;
	font-family: "Microsoft YaHei";}
	
	.wrap{
		width:900px;
		margin:0 auto;
		position: relative;}

  .blank2{
		width:600px;
		height:80px;}
  .blank3{
		width:600px;
		height:170px;
	}
</style>
