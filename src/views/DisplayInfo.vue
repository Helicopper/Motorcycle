<template>
<div class="display-view container">
<div class="display-info container">
  <el-row :gutter="24">
	<el-col :md="14" :sm="24" :xs="24">
	  <el-card 
		shadow="hover" 
		class="display-query">
		<!-- 展示检索词 -->
		<p>what you search:</p>
		<p id="query">{{ query.split(",")[1] }}</p>
		<p id="SearchType">{{SearchType}}</p>
	  </el-card>
	</el-col>
  </el-row>

      <!-- 展示可视化图 -->
      <div class="display-visual_f1">
      <display-visual_f1
        class="display-visual_f1" 
        v-if="true" 
        v-loading="isLoading" 
        element-loading-text="loading……">
      </display-visual_f1>
      </div>

      <!-- 展示可视化图 -->
      <div class="display-visual_f6">
     
      <display-visual_f6
        class="display-visual_f6" 
        v-if="true" 
        v-loading="isLoading" 
        element-loading-text="loading……">
      </display-visual_f6>
      </div>

      <!-- 展示可视化图 -->
      <div class="display-visual_f10">
    
      <display-visual_f10
        class="display-visual_f10" 
        v-if="true" 
        v-loading="isLoading" 
        element-loading-text="loading……">
      </display-visual_f10>
      </div>

      <!-- 展示可视化图 -->
      <div class="display-visual_f8">
     
      <display-visual_f8
        class="display-visual_f8" 
        v-if="true" 
        v-loading="isLoading" 
        element-loading-text="loading……">
      </display-visual_f8>
      </div>

      <div class="display-visual_f9">
    
      <display-visual_f9
        class="display-visual_f9" 
        v-if="true" 
        v-loading="isLoading" 
        element-loading-text="loading……">
      </display-visual_f9>
      </div>

      <!-- 展示可视化图 -->
      <div class="display-visual_f13">
    
      <display-visual_f13
        class="display-visual_f13" 
        v-if="true" 
        v-loading="isLoading" 
        element-loading-text="loading……">
      </display-visual_f13>
      </div>

      <!-- 展示可视化图 -->
      <div class="display-visual_f14">
    
      <display-visual_f14
        class="display-visual_f14" 
        v-if="true" 
        v-loading="isLoading" 
        element-loading-text="loading……">
      </display-visual_f14>
      </div>
</div>
<!-- <back-top/> --> 
<div class="blank"></div>
</div>
</template>

<script>
  import DisplayData from '@/components/display_info/DisplayData'
  //import DisplayVisual from "@/components/display_info/DisplayVisual"
  import DisplayVisual_f1_graph from "@/components/display_info/DisplayVisual_f1_graph"
  import DisplayVisual_f6_geo from "@/components/display_info/DisplayVisual_f6_geo"
  import DisplayVisual_f8_tree from "@/components/display_info/DisplayVisual_f8_tree"
  import DisplayVisual_f9_rose from "@/components/display_info/DisplayVisual_f9_rose"
  import DisplayVisual_f10_scatter from "@/components/display_info/DisplayVisual_f10_scatter"
  import DisplayVisual_f13_correlation from "@/components/display_info/DisplayVisual_f13_correlation"
  import DisplayVisual_f14_linefold3 from "@/components/display_info/DisplayVisual_f14_linefold3"
 
  import backtop from "@/components/common/backtop"

  export default {
    components: {
      "display-data": DisplayData,
      //"display-visual": DisplayVisual,

      "display-visual_f1" :DisplayVisual_f1_graph,
      "display-visual_f6" :DisplayVisual_f6_geo,
      "display-visual_f8" :DisplayVisual_f8_tree,
      "display-visual_f9" :DisplayVisual_f9_rose,
      "display-visual_f10" :DisplayVisual_f10_scatter,
	   // "display-visual_f12" :DisplayVisual_f12_pie,
      "display-visual_f13" :DisplayVisual_f13_correlation,
      "display-visual_f14" :DisplayVisual_f14_linefold3,
      "back-top": backtop,
      // testbar
    },
    data() {
      return {
        // 控制是否 loading
        isLoading: true,
        
      }
    },
    // 解决刷新页面问题
    created() {
      if (this.$route.query.query) {
        let query = this.$route.query.query;
        this.$search.search_query(query);
      }
    },
    watch: {
      // deep: true,
      $route() {
        if(this.$route.query.query) {
          let query = this.$route.query.query;
           console.log("路由变化发生!");
          this.$search.search_query(query);
        }
      }
    },
    computed: {
      query() {
        // 返回路由中的query，注意用的是$route
        console.log("computed");
        return this.$route.query.query
      }
    },
    mounted() {
      // 监听"changeLoading"事件，改变loading状态
      this.$bus.$on("changeLoading", isLoading => {
        this.isLoading = isLoading;
      })
      
    },

  }
</script>

<style>
  .container {
    max-width: 1500px;
    /* width: 100%; */
    margin: 0 auto;
    padding: .5em;
  }

  .display-view {
    width: 100%;
    /* max-width: 970px; */
    /* margin: 0 auto; */
  }

  .display-query {
    margin-bottom: 1.5em;
  }
  .display-query #query {
    /* text-transform: uppercase; */
    font-weight: bold;
    font-size: 1.5em;
  }

  .display-info {
    min-height: 30em;
  }


  .display-data {
    border-right: 1px solid rgba(150,150,150,0.2);
  }

  .display-visual .title {
    text-transform: capitalize;
    /* color: #409EFF; */
  }
  
  .blank{
  		width:600px;
  		height:700px;}
</style>
