<template>
  <!--新闻条目（英文） -->
  <div>
    <div class="data-item" v-for="(news, index) in news_EN_data" :key=index>
      <p v-if="news.title!=''">
        <a :href="news.url" target="_blank" class="result-title" v-html="news.title"></a>
        <!-- <span class='icon-type bgColor-news'>news</span> -->
      </p>
      <p v-if="news.author!=''">
        <span class="word-field">Author: </span>
        <span class="authors-inventor-source" v-html="news.author"></span>
      </p>
      <!-- <p v-if="news.summary!=''"><span class="word-field word-field-abstract">Abstract: </span><span class='result-content'>{{news.summary}}</span></p> -->
      <p v-if="news.content!='Null'">
        <span class="word-field word-field-abstract">Content: </span>
        <text-expand-shrink :text="news.content" :key="news.title"></text-expand-shrink>
      </p>
      <!-- <p v-if="news.id">ID: {{news.id}}</p> -->
      <p v-if="news.release_time!=''">
        <span class="word-field">Date: </span>
        <span class='result-content'>{{news.release_time}}</span>
      </p>
    </div>
    <!-- 分页 -->
    <el-pagination 
      :current-page="page_news_EN.current_page" 
      :page-sizes="page_news_EN.page_sizes" 
      @current-change="page_news_EN_change"
      @size-change="page_news_EN_change_size" 
      :layout="page_news_EN.page_layout" 
      :total="news_EN_data_length">
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
        page_news_EN: {
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
        return this.$bus.get_result();
      },
      news_EN_data() {
        let news_EN = this.result.news;
        let news_EN_list = [];
        if (news_EN) {
          // 当前页
          let curpage = this.page_news_EN.current_page;
          // 每页显示数目
          let size = this.page_news_EN.page_size;
          // 开始和结尾的索引
          let begin_index = size * (curpage - 1);
          let end_index = size * curpage;
          // 假分页，切分数据
          if (end_index >= news_EN.length) {
            // 若最后一页未铺满
            news_EN_list = news_EN.slice(begin_index);
          } else {
            news_EN_list = news_EN.slice(begin_index, end_index);
          }
        }
        return news_EN_list;
      },
      news_EN_data_length() {
        let news_EN = this.result.news;
        if (news_EN)
          return news_EN.length;
        else
          return 0
      }
    },
    methods: {
      page_news_EN_change(currentPage) {
        this.page_news_EN.current_page = currentPage;
      },
      page_news_EN_change_size(size) {
        this.page_news_EN.page_size = size;
      }
    }
  }
</script>

<style scoped>

</style>