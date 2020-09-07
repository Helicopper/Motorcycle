<template>
  <!-- 导航栏 -->
  <div class="topnav">
    <div class="_container">
      <div class="framework-width">
        <div id="icon">
          <router-link to="/" tag="div">
            <a href="#">ADVERTISER</a>
          </router-link>
        </div>
        <router-link to="/about" tag="div">
          <a class="link" href="#">ABOUT</a>
        </router-link>
        <router-link to="/" tag="div">
          <a class="link" href="#">HOMEPAGE</a>
        </router-link>
        <transition name="el-zoom-in-top">
          <search-box class="search-box" v-if="ifSearchBox"></search-box>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
  import SearchBox from './../common/SearchBox.vue'

  export default {
    components: {
      "search-box": SearchBox,
    },
    computed: {
      ifSearchBox() {
        return this.$route.name !== "home"
      },
      routeName() {
        return this.$route.name;
      }
    }
  }
</script>

<style>
  * {
    box-sizing: border-box;
  }

  /* 
  导航栏样式
   */
  .topnav {
    overflow: hidden;
    background-color:grey; 
    /* box-shadow: 0px 1px 2px #aaaaaa; */
    /* position: fixed; */
    border-bottom: 1px solid #e1e1e1;
    top: 0;
    width: 100%;
  }

  /* 
   * ---------------------------------------------
   *  暂时的网站标识
   */
  #icon {
    float: left;
    display: block;
    line-height: 80px;
    font-weight: bold;
  }
  #icon a {
    font-size: 1.7em;
    padding-left: .5em;
  }
  /* 
   * ---------------------------------------------
  */

  .topnav a,
  .topnav .link {
    float: right;
	font-family: Arial;
    display: inline-block;
    color: #ffc000;
    font-weight: bold;
    text-decoration: none;
    text-align: center;
    padding: 30px 20px;
    font-size: 2em;
    line-height: 40px;
    border-bottom: 4px solid transparent;
  }

  .topnav .link:hover {
    border-bottom: 4px solid #ffc000; 
    border-bottom-color: #ffc000;
  }

  .topnav .search-box {
    float: right;
    display: inline-block;
    margin: 10px 16px;
    padding: 10px 0;
    line-height: 40px;
  }
</style>
