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
			<p id="query">{{ query.split(",")[1]+"&nbsp;"+query.split(",")[2] }}</p>
			</el-card>
		</el-col>
	</el-row>

  <el-row>
		<el-col :md="10" :sm="24" :xs="24">
			<!-- 展示可视化图 -->
			<div class="display-visual3">
			<p class="title _font-blue">visualization</p>
			<display-visual3 
				class="display-visual3" 
				v-if="true" 
				v-loading="isLoading" 
				element-loading-text="loading……">
			</display-visual3>
			</div>
		</el-col>
  </el-row>
</div>
<!-- <back-top/> --> 
</div>
</template>

<script>
  import DisplayData from '@/components/display_info/DisplayData'
  import DisplayVisual3 from "@/components/display_info/DisplayVisual3"
  import backtop from "@/components/common/backtop"

  export default {
    components: {
      "display-data": DisplayData,
      "display-visual3": DisplayVisual3,
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
