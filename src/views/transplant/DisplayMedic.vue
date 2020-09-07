<template>
  <div class="display-view container">
    <!-- 展示数据和可视化 -->
    <div class="display-info container">
      <el-row :gutter="24">
        <el-col :md="14" :sm="24" :xs="24">
          <el-card 
            shadow="hover" 
            class="display-query">
            <!-- 展示检索词 -->
            <p>what you search:</p>
            <p id="query">{{ query }}</p>
          </el-card>
	<!--	  <div>
		 <info-card
		 v-for="(person,index) in authors"
           class="info-card"
		   v-on:click="onclick($event)"
		   :name="person.name"
		   :img="person.img"
		   :department="person.department"
		   :country="person.country"
		   :affiliation="person.affiliation"
		   >
		  </info-card>
		  </div>-->
		    <div
			   v-for="(person,index) in authors"
			   :key="index"
			   class="info-card">
			   <el-row>
			   <el-col :xs="8" :sm="8" :md="6" :lg="6">
			   <img style="width:100px;height:100px" src="./../../assets/img/icon_person.png" alt="person">
			   </el-col>
			   <el-col :xs="8" :sm="8" :md="6" :lg="6">
			   <el-button @click="getvalue(person)">
	<!--		  <ul style="list-style:none;">-->
	           <ul>
			   <li class="name">NAME:{{person.name}}</li>
			   <li class="affiliation">AFFILIATION:{{person.affiliation}}</li>
			   <li class="country">COUNTRY:{{person.country}}</li>
			   <li class="department">DEPARTMENT:{{person.department}}</li>
			 </ul>
			   </el-button>
			   </el-col>
			</div>
          <!-- 展示数据 -->
          <div 
            class="display-data" 
            v-loading="isLoading" 
            element-loading-text="loading……">
            <display-data></display-data>
          </div>
        </el-col>
        <el-col :md="10" :sm="24" :xs="24">
          <!-- 展示可视化图 -->
          <div class="display-visual">
            <p class="title _font-blue">visualization</p>
            <display-visual 
              class="display-visual" 
              v-if="true" 
              v-loading="isLoading" 
              element-loading-text="loading……">
            </display-visual>
          </div>
        </el-col>
      </el-row>
    </div>
    <!-- <back-top/> --> 
  </div>
</template>

<script>
  import DisplayData from '@/components/display_info/DisplayData'
  import DisplayVisual from "@/components/display_info/DisplayVisual"
  import backtop from "@/components/common/backtop"
  import DevInfoCard from "@/components/common/DevInfoCard"

  export default {
    components: {
      "display-data": DisplayData,
      "display-visual": DisplayVisual,
      "back-top": backtop,
	  "info-card": DevInfoCard
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
	  this.search();
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
        return this.$route.query.query
      },
	  authors() {
	    if(this.$bus.query_data.query_result.authors) {
	        return this.$bus.query_data.query_result.authors;        
	    }
	        return "";      
	  }
    },
    mounted() {
      // 监听"changeLoading"事件，改变loading状态
      this.$bus.$on("changeLoading", isLoading => {
        this.isLoading = isLoading;
      })   
    },
	methods:{
	 onclick:function(e)
	 {
	   let el=e.target;
	 },
	 getvalue(person){
       //let query = "name=" + person.name +'&'+ "department=" + person.department;(适应后端新接口)
	   //this.$search.search_query(query);
	   let query = person.name+ '-' + person.department;
	   console.log("重新发送请求，更新页面");
	   this.$bus.update_query_text(query);
	   let url = "/json/medic_data_" + query + ".json";
	   this.$axios.get(url)
	       .then(res =>{
		      this.$bus.clean_last_result();
              this.$bus.query_data.query_result = res.data;
		   })
		   .catch(err =>{
              console.log("err: " + err);
		   })
	 },
	 search() {
   	  let query = this.$route.query.query;
      this.$bus.update_query_text(query);
	  let url = "/json/medic_data_" + query + ".json";
	  this.$axios.get(url)
          .then(res => {
   	         this.$bus.clean_last_result();
	         this.$bus.query_data.query_result = res.data;
		           
		 })
          .catch(err => {

            console.log("err: " + err);           
		  })
	       
	 }
	}
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

  .el-button {
	font-size: 20px;
	text-align: left;
	float:left;
    padding: 0;
	border-radius: 0;
	vertical-align: top;
  }
  .ul{
    list-style: none;
    margin: 0;
  }

  
</style>
