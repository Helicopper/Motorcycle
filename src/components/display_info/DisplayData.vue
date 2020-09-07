<template>
  <div class="data-board">
  <el-row>
    <el-tabs value="papers">
      <el-tab-pane name="papers" label="PAPER" :lazy="true">
        <!-- <span slot="label"><i class="el-icon-document"></i> PAPER</span> -->
        <!-- 展示论文 -->
        <div class="show-pane">
          <item-paper></item-paper>
        </div>
      </el-tab-pane>

      <el-tab-pane name="news_CN" label="NEWS(CN)" :lazy="true">
        <!-- <span slot="label"><i class="el-icon-document"></i> NEWS(CN)</span> -->
        <!-- 展示新闻（中文） -->
        <div class="show-pane">
          <item-news-cn></item-news-cn>
        </div>
      </el-tab-pane>

      <el-tab-pane name="news_EN" label="NEWS(EN)" :lazy="true">
        <!-- <span slot="label"><i class="el-icon-document"></i> NEWS(EN)</span> -->
        <!-- 展示新闻（英文） -->
        <div class="show-pane">
          <item-news-en></item-news-en>
        </div>
      </el-tab-pane>

      <el-tab-pane  name="patent" label="PATENT" :lazy="true">
        <!-- <span slot="label"><i class="el-icon-document"></i> PATENT</span> -->
        <!-- 展示专利 -->
        <div class="show-pane">
          <item-patent></item-patent>
        </div>
      </el-tab-pane>
    </el-tabs>
   </el-row>

  </div>
</template>

<script>
  import textExpandShrink from "@/components/textExpandShrink.vue"
  import ItemPaper from "@/components/display_info/display_item/ItemPaper";
  import ItemNewsCN from "@/components/display_info/display_item/ItemNewsCN";
  import ItemNewsEN from "@/components/display_info/display_item/ItemNewsEN";
  import ItemPatent from "@/components/display_info/display_item/ItemPatent";

  export default {
    name: "DisplayData",
    components: {
      "text-expand-shrink": textExpandShrink,
      "item-paper": ItemPaper,
      "item-news-cn": ItemNewsCN,
      "item-news-en": ItemNewsEN,
      "item-patent": ItemPatent,
    },
    data() {
      return {
      }
    },
    computed: {
      result() {
        return this.$bus.get_result();
      },
	  authors() {
        return this.result.authors;
	  },
      news_CN_data() {
        return this.result.CN_News;
      },
      news_EN_data() {
        return this.result.news;
      },
      patent_data() {
        return this.result.patents;
      }
    },
    methods: {
    }
  }
</script>

<style>
  /* override------------------------------ */
  /* .el-tabs__nav-wrap::after, */
  .el-tabs__active-bar {
    height: 4px;
  }
  /* -------------------------------------- */
  .show-pane {
    margin: 5px auto 20px auto;
  }

  .data-board {
    margin: 0 auto;
    padding: 5px;
  }

  .data-item {
    margin: 0.7em;
    margin-bottom: 1em;
    padding-bottom: 1em;
    border-bottom: 0.1em solid rgba(150, 150, 150, 0.2) 
  }

  .author-span-margin {
    margin: 0.2em;
  }
</style>
