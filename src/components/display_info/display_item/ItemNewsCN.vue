<template>
  <!-- 新闻 条目（中文） -->
  <div>
    <div class="data-item" v-for="(news, index) in news_CN_data" :key=index>
      <p v-if="news.title!=''">
        <a :href="news.url" target="_blank" class="result-title" v-html="news.title"></a>
        <!-- <span class='icon-type bgColor-news'>news</span> -->
      </p>
      <p v-if="news.author!=''">
        <span class="word-field">Author: </span>
        <span class="authors-inventor-source" v-html="news.author"></span>
      </p>
      <!-- <p v-if="news.summary!=''"><span class="word-field word-field-abstract">Abstract: </span><span class='result-content'>{{news.summary}}</span></p> -->
      <p v-if="news.summary!=''">
        <span class="word-field word-field-abstract">Abstract: </span>
        <text-expand-shrink :text="news.summary" :key="news.title"></text-expand-shrink>
      </p>
      <!-- <p v-if="news.id">ID: {{news.id}}</p> -->
      <p v-if="news.release_time!=''">
        <span class="word-field">Date: </span>
        <span class='result-content'>{{news.release_time}}</span>
      </p>
    </div>
    <!-- 分页 -->
    <el-pagination 
      :current-page="page_news_CN.current_page" 
      :page-sizes="page_news_CN.page_sizes" 
      @current-change="page_news_CN_change"
      @size-change="page_news_CN_change_size" 
      :layout="page_news_CN.page_layout" 
      :total="news_CN_data_length">
    </el-pagination>
  </div>
</template>

<script>
  import textExpandShrink from "@/components/textExpandShrink.vue"

  export default {
    components: {
      "text-expand-shrink": textExpandShrink
    },
    data() {
      return {
        page_news_CN: {
          current_page: 1,
          page_sizes: [10, 15],
          page_size: 10,
          // page_layout: "sizes, prev, pager, next, total",
          page_layout: "prev, pager, next, total"
        }
      }
    },
    computed: {
      result() {
        return this.$bus.get_result()
      },
      news_CN_data() {
        let news_CN = this.result.CN_News;
        let news_CN_list = [];
        if (news_CN) {
          // 当前页
          let curpage = this.page_news_CN.current_page;
          // 每页显示数目
          let size = this.page_news_CN.page_size;
          // 开始和结尾的索引
          let begin_index = size * (curpage - 1);
          let end_index = size * curpage;
          // 假分页，切分数据
          if (end_index >= news_CN.length) {
            // 若最后一页未铺满
            news_CN_list = news_CN.slice(begin_index);
          } else {
            news_CN_list = news_CN.slice(begin_index, end_index);
          }
        }
        return news_CN_list;
      },
      news_CN_data_length() {
        let news_CN = this.result.CN_News;
        if (news_CN)
          return news_CN.length;
        else
          return 0
      }
    },
    methods: {
      page_news_CN_change(currentPage) {
        this.page_news_CN.current_page = currentPage;
      },
      page_news_CN_change_size(size) {
        this.page_news_CN.page_size = size;
      }
    }
  }
</script>

<style scoped>

</style>
