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
        placeholder: "Whatever comes to your mind"
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

        this.$router.push({
          path: "/displayInfo",
          query: {
            query: this.query
          }
        });
      }
    }
  }
</script>

<style>
  .search-box {
    /* display: inline-block; */
  }
</style>
