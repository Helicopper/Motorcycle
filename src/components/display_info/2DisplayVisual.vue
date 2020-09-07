<template>
  <div class="display-visual">

    <!--根据数据循环生成所有的图的挂载点-->
    <div class="display-graph" v-for="(graphData, index) in graph_data" :key=index>
      <!-- <div :id="index">图形id：{{index}}。这个图形还未完成  请期待......</div>  -->
      <div :id="index"></div>
    </div>

  </div>
</template>

<script>
  import Vue from 'vue'
  import linefold from "../graphs/graph_linefold.vue"
  import radar from "../graphs/graph_radar.vue"
  import sun from "../graphs/graph_sun.vue"
  import pie from "../graphs/graph_pie.vue"
  import entity from "./../graphs/graph_entity.vue"
  import geo from "./../graphs/graph_geo.vue"
  import bar from "./../graphs/graph_bar.vue"
  import pieline from "./../graphs/graph_pieline.vue"
  import relation from "./../graphs/graph_relation.vue"
  import river from "./../graphs/graph_river.vue"
  import tree from "./../graphs/graph_tree.vue"

  export default {
    name: "DisplayVisual",
    data() {
      return {
        // iftree: true
      }
    },
    mounted() {
      // 生成可视化图表
      // this.generate_charts();
    },
    computed: {
      graph_data() {
        return this.$bus.get_result_graph();
      },

    },
    /*
    还需要优化的问题：
    1. 按需加载图表组件，不要一次性导入全部组件。异步组件
    */
    updated: function() {
      // generate_charts需要在dom元素更新之后才能调用，故使用updated，而不是用mounted
      this.generate_charts(); 
    },
    methods:{ 
      // 生成所有图
      generate_charts() { 

        // 获取可视化数据
        let visual_data = this.$bus.get_result_graph();

        // 获得每一个图的数据，调用图表组件，传入数据
        for (let key in visual_data) {
          // console.log(key);
          // 调用constructor
          let ifUnknown = JSON.stringify(visual_data[key]);
          // console.log(ifUnknown);
          // console.log(ifUnknown.indexOf('"data":"UNKNOWN"'));
          // data数据存在
          if(ifUnknown.indexOf('"data":"UNKNOWN"') === -1){ 
              if (this.typeOf(key)){
                // console.log("key=="+key+",visual_data[key]=="+visual_data[key]);
                // 调用construct_graph方法，传入key和data
                this.construct_graph(key,visual_data[key]);
              }
          }else { // data数据不存在
            console.log("===================================");
            console.log(key+"图的data数据为unknown");
            console.log("===================================");
          }
        }
      },
      // 构造图组件子类，实现挂载
      construct_graph(keyString, data) {
        // Vue.extend全局API，组件构造器，必须要import Vue才能使用
        let component_subclass = Vue.extend(this.typeOf(keyString));
        // new一个子类，实现挂载
        new component_subclass({
          // propsData：数据传输管道，将图的数据传给调用的组件
          propsData:{
            items: data,
            keyWord: keyString
          }
          //$mount方法将构造器返回的"未挂载的"组件"graph_linefold"挂载到相应id的挂载点
        }).$mount("#" + keyString);
      },

      // 查询key对应需要的组件
      typeOf(keyString){
        // 所有图的key，用数字表示图的类型。
        let keyType = {
          "aiTech_time": linefold,
          "field_aiTech_time": linefold,
          "aiTech_entity": entity,
          "aiTech_ins_geo": geo,
          "field_aiTech_geo": geo,
          "aiTech_knowledge_tree": tree,
          "ins_aiTech_themeRiver": river,
          "aiTech_expert_graph": relation,
          "field_expert_graph": relation,
          "aiTech_field_pie": pie,
          "ins_field_pie": pie,
          "aiTech_subfield_pie": sun,
          "field_ins_subfield_pie": sun,
          "field_aiTech_radar": radar,
          "ins_competition_radar": radar,
          "field_prediction_barPie": "",
          "ins_field_time_pieline": pieline,
          "ins_expert_influence_bar": bar,
        }
        return keyType[keyString];
      }
    },
    components: {
      "graph_linefold": linefold,
      "graph_radar":radar,
      "graph_sun":sun,
      "graph_pie":pie,
      "graph_demand": entity,
      "graph_geo":geo,
      "graph_bar":bar,
      "graph_pieline":pieline,
      "graph_river": river,
      "graph_tree": tree
      // 'test':function(resolve) {
      //   require(['../test.vue'],resolve);
    }
  }

</script>

<style>
.display-visual {
}
.display-graph {
  margin: 1em 0;
}
</style>
