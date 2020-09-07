<template>
  <!-- 检索框 -->
  <div class="search-box">
    <el-input 
      v-model="query" 
      @keyup.enter.native="search" 
      :placeholder="placeholder">
      <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
    </el-input>
    <!-- <el-button type="primary" @click="search_query">submit</el-button> -->
  </div>
</template>

<script>
  export default {
    name: "SearchBox",
    data() {
      return {
        query: "",
        placeholder: "give me a advertiser number"
      }
    },
    methods: {
      // 发送检索请求
      search() {
        // 处理医疗页面的请求----------
      let medic_word = ["doctor", "sysu", "p53", "david_j._wild", "same", "samezhongshandaxue"];
        if(medic_word.some(el => el === this.query.toLowerCase())) {
          this.$router.push({
            path: "/medic",
            query: {
              query: this.query
            }
          });
          return;
        }
        //----------------------------

		let routeData=this.$router.resolve({
		  path:"/displayInfo2",
		  query:{
			query:"2,"+this.query
		  }
		});
		window.open(routeData.href,'_blank');
      }
    }
  }
</script>
    .search-box{
	box-shadow: 2px 2px 10px #f5f5f5;
	display: block;
  }
