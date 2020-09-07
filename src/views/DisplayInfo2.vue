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

<el-row>
      <div class="display-visual2_f5_radar">
  
      <display-visual2_f5_radar
        class="display-visual2_f5_radar" 
        v-if="true" 
        v-loading="isLoading" 
        element-loading-text="loading……">
      </display-visual2_f5_radar>
      </div>

</el-row>

<el-row>
      <div class="display-visual2_f7_scatter">
  
      <display-visual2_f7_scatter
        class="display-visual2_f7_scatter" 
        v-if="true" 
        v-loading="isLoading" 
        element-loading-text="loading……">
      </display-visual2_f7_scatter>
      </div>

</el-row>

<el-row>
      <div class="display-visual2_f11_bar">
  
      <display-visual2_f11_bar
        class="display-visual2_f11_bar" 
        v-if="true" 
        v-loading="isLoading" 
        element-loading-text="loading……">
      </display-visual2_f11_bar>
      </div>

</el-row>

<el-row>
      <div class="display-visual2_f12_pie">
  
      <display-visual2_f12_pie
        class="display-visual2_f12_pie" 
        v-if="true" 
        v-loading="isLoading" 
        element-loading-text="loading……">
      </display-visual2_f12_pie>
      </div>

</el-row>

</div>
<!-- <back-top/> --> 
</div>
</template>

<script>
  import DisplayData from '@/components/display_info/DisplayData'
  //import DisplayVisual2 from "@/components/display_info/DisplayVisual2"
  import DisplayVisual2_f5_radar from "@/components/display_info/DisplayVisual2_f5_radar"
  import DisplayVisual2_f7_scatter from "@/components/display_info/DisplayVisual2_f7_scatter"
  import DisplayVisual2_f11_bar from "@/components/display_info/DisplayVisual2_f11_bar"
  import DisplayVisual2_f12_pie from "@/components/display_info/DisplayVisual2_f12_pie"
  import backtop from "@/components/common/backtop"

  export default {
    components: {
      "display-data": DisplayData,
      //"display-visual2": DisplayVisual2,
      "display-visual2_f5_radar":DisplayVisual2_f5_radar,
      "display-visual2_f7_scatter":DisplayVisual2_f7_scatter,
      "display-visual2_f11_bar":DisplayVisual2_f11_bar,
      "display-visual2_f12_pie":DisplayVisual2_f12_pie,
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
          // console.log("路由变化发生!");
          this.$search.search_query(query);
        }
      }
    },
    computed: {
      query() {
        // 返回路由中的query，注意用的是$route
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
</style>
