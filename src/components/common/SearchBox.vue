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
        placeholder: "give me a bidding word number"
      }
    },
    methods: {
      // 发送检索请求
      
	  search() {
      
	   console.log("Search前");
	   var myDate = new Date();
	   var Time1 = myDate.getMilliseconds();
	  console.log(Time1);

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
		  path:"/displayInfo",
		  query:{
			query:"1,"+this.query
		  }
		});
		window.open(routeData.href,'_blank');

		console.log("进入disolayInfo");
		var myDate2 = new Date();
		var Time2 = myDate2.getMilliseconds();
		console.log(Time2);
      }
    }
  }
</script>
<style>
  .search-box{
	box-shadow: 2px 2px 10px #000000;
	display: none;
	}
<style>
