<template>
  <div class="hellotheworld">
	<div class="wrap">
		<aside class="left">
			<p>figure2</p>
			<div class="name">广告商地理分布</div>
			<ul>
				<li>类型：地理图</li>
				<li>点：广告商</li>
				<li>点的大小：影响力</li>
			</ul>
			<div class="texts">图片描述：参与竞价[关键词]的广告商的地理分布。您可以通过此图地域性地划分市场，识别潜在客户，提高参与竞价[关键词]的广告商数量，为竞价流程注入新的活力与刺激。</div>
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
// 直接导入地理图所需的json文件，注意一定记得register这个文件
import worldJson from 'echarts/map/json/world.json'
// import $router from '../../util/router' 
import $search from "./../../util/search.js"

    let echarts = require('echarts');
    export default {
        name: "geo",
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
                let itemData = this.items;
                // console.log("itemData="+JSON.stringify(itemData));
                for (var i in itemData){
                    // console.log("key :"+this.keyWord+"_"+i);
                    let id = this.keyWord+"_"+i;
                    // console.log("before draw_linefold();id:"+id+"  data:"+itemData[i]);
                    this.draw_geo(id,itemData[i]);
                }
            },
            draw_geo(id,data) {
                let chart = document.getElementById(id);
                var initial = function () {
                    let chartParent = chart.parentNode.parentNode;
                    chart.style.width = chartParent.clientWidth - 30 + "px";
                    chart.style.margin = "0 auto";
                    chart.style.height = (chartParent.clientWidth *0.75 - 30) + "px";
                }
                initial();
                // let color = this.set_color();
                let myChart = echarts.init(chart);
                let title = data['title'];
                let graph_data = data['data'];
                let geoCoordMap = graph_data["location"];
                let influ = graph_data["influence"];
             
                echarts.registerMap('world', worldJson);
                let influence = influ.sort(this.$graphs.sortNumber).slice(-100);

				function sortNumber(a,b)
				{
						return a.value[2] - b.value[2];
				}
                let convertData = [];
                for (var i = 0; i < influence.length; i++) {
                    var geoCoord = geoCoordMap[influence[i].name];
                    if (geoCoord) {
                        convertData.push({
                            name: influence[i].name,
                            value: geoCoord.concat(influence[i].value)
                        });
                    }
                }
               // convertData=convertData.sort(sortNumber);
                // console.log("convertData===="+JSON.stringify(convertData));
				
                let data_max = 1;
                let data_min = 100000;
                let max_index=0;
                for (var i = 0; i < convertData.length; i++) {
                    if (convertData[i]['value'][2] > data_max){
                        data_max = convertData[i]['value'][2];
                        max_index = i;
                    };
                    if (convertData[i]['value'][2]< data_min){
                        data_min = convertData[i]['value'][2];
                    }
                };
                //console.log("geoCoordMap");
                //console.log(geoCoordMap);
   				//console.log("geoCoordMap[[influence[max_index].name]]");
                //console.log(geoCoordMap[[influence[max_index].name]]);
                let linesdata=[];

                for (var i = 0; i < influence.length; i++) {
                    var coord = geoCoordMap[influence[i].name];
                
                    let temp;
                    //temp
                    linesdata.push({

                    	 name: influence[i].name,
                         coords: [geoCoordMap[[influence[max_index].name]],coord]
                    })
        
                }
                console.log("linesdata");
             	console.log(linesdata);

               
                const option = {
               
                     title: {
              				text: title,
              				//subtext: '点击结点可查看该广告商的详细信息',
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
                        formatter: function (data) {
                        if (data.seriesName == 'a'){
                            return data.marker + data.name + '：' + data.value[2];
                        }
                        return data.seriesName + '<br/>' +data.marker + data.name + '：' + data.value[2];
                        }
                    },
                    toolbox: {
                        show: false,
                        orient: 'vertical',
                        x: 'right',
                        y: 'center',
                        feature: {
                            mark: { show: true },
                            dataView: { show: true, readOnly: false },
                            restore: { show: true },
                            saveAsImage: { show: true }
                        }
                    },
                    visualMap: {
                        min: data_min,
                        max: data_max,
                        calculable: true,
                        inRange: {
                            color: ['#50c9c3', '#50c9c3'],
                            //opacity:0.3
                        },
                        range:[data_min, data_max],
                        textStyle: {
                            color: '#4E4E4E'
                        },
                        left: '5%',
                        bottom: '10%'
                    },
                    geo: {
                        map: 'world',
                       
                        center: [104.114129, 37.550339],
                        roam: true,
                        zoom:5,
                        label: {
                            emphasis: {
                                show: false
                            }
                        },
                        itemStyle: {
                            normal: {
                                // areaColor: '#f3f3f3',
                                areaColor:"#ffffff",
                                // borderColor: '#111'
                                borderColor: '#C0B9B9'
                            },
                            emphasis: {
                                // areaColor: 'rgba(224, 31, 84, 0.2)'
                                areaColor: "#60acfc",
                            }
                        }
                    },
                    series: [
                        {
                            //name: 'Top 100',
                            type: 'effectScatter',
                            coordinateSystem: 'geo',
                            // data: convertData(influence.sort(function (a, b) {
                            //     return b.value - a.value;
                            // }).slice(0,10)),         
                            data: convertData,
                            symbol: 'circle',

                            symbolSize: function (val) {
                             
                                return 10 + (val[2]-data_min)/(data_max - data_min)*50;
                            },
                            effectType:"ripple", 
            				showEffectOn: 'render',
            				rippleEffect: {
                					brushType: 'stroke'
            				},
            				hoverAnimation: true,

                            label: {
                                normal: {
                                    formatter: '{b}',
                                    position: 'top',
                                    show: false,
                                    // color:'rgb(224,31,84)'
                                    color: "#4E4E4E",
                                },
                                emphasis:{
                                    formatter:'{b}',
                                    position:'top',
                                    show:true,
                                    color:"#4E4E4E",
                                    backgroundColor: "#fff",
                                }
                            },
                            itemStyle: {
                                normal: {
                                    // color: 'rgb(224, 31, 84)',
                                    //color: "#60acfc",
                                    //opacity:0.3,
                                    shadowBlur: 2,
                                    shadowColor: '#333',
                                    borderWidth : 4
                                }
                            }//,
                            //zlevel: 1
                        },
                         {
            					type: 'lines',
            
          						data:linesdata,
          						symbol: ['none', 'arrow'],
            					symbolSize: 20,
            					coordinateSystem: 'geo',
            				
            					lineStyle: {
                					normal: {
                   					 	color: '#50c9c3',
                    					width: 1,
                    					opacity: 1,
                    					curveness: -0.1
                					}
            					},
            					effect: {
                					show: true,
                					smooth: false,
                					period: 6,
                					trailLength: 0,  //特效尾迹的长度
                					symbol: "arrow",
                					color: '#50c9c3',
                					symbolSize: 10
            					},

            					/*
            					 effect : {
                    				show: true,
                    				scaleSize: 2,
                    				period: 30,
                    				color: '#fff',
                    				shadowBlur: 10
                				},
 								*/
            					smooth:true,
               
                				itemStyle : {
                    				normal: {
                        				borderWidth:1,
                        				lineStyle: {
                            				type: 'solid',
                            				//shadowBlur: 2
                        				}
                    				}
                				}
            					
        				}
                    ]
                
                };

                myChart.setOption(option);

            
                window.addEventListener('resize', function () {
                    initial();
                    myChart.resize()
                })

              myChart.on("click", function (params) {
          
             		console.log(params.data.name);
              		$search.to_display3("2"+","+params.data.name)
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
