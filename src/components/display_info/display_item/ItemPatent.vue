<template>
  <!-- patent 条目 -->
  <div>
    <div class="data-item" v-for="(patent, index) in patent_data" :key=index>
      <p v-if="patent.title!=''">
        <span class="result-title" v-html="patent.title"></span>
      </p>
      <!-- 拥有者 -->
      <p v-if="patent.inventors!=''">
        <span class="word-field">Inventor：</span>
        <span class="authors-inventor-source">{{patent.inventors}}</span>
      </p>
      <!-- <p v-if="patent.abstract!=''"><span class="word-field word-field-abstract">Abstract：</span><span>{{patent.abstract}}</span></p> -->
      <p v-if="patent.abstract!=''"><span class="word-field word-field-abstract">Abstract：</span>
        <text-expand-shrink :text="patent.abstract" :key="patent.title"></text-expand-shrink>
      </p>
      <p v-if="patent.patent_assignees!=''">
        <span class="word-field">Assignees：</span>
        <span class='result-content'>{{patent.patent_assignees}}</span>
      </p>
      <!-- 日期 -->
      <p v-if="patent.publication_date!=''">
        <span class="word-field">Publication Date：</span>
        <span class='result-content'>{{patent.publication_date}}</span>
      </p>
    </div>
    <!-- 分页 -->
    <el-pagination 
      :current-page="page_patent.current_page" 
      :page-sizes="page_patent.page_sizes" 
      @current-change="page_patent_change"
      @size-change="page_patent_change_size" 
      :layout="page_patent.page_layout" 
      :total="patent_data_length">
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
        page_patent: {
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
      patent_data() {
        let patent = this.result.patents;
        let patent_list = [];
        if (patent) { // 若有 patent 数据
          // 当前页
          let curpage = this.page_patent.current_page;
          // 每页显示数目
          let size = this.page_patent.page_size;
          // 开始和结尾的索引
          let begin_index = size * (curpage - 1);
          let end_index = size * curpage;
          // 假分页，切分数据
          if (end_index >= patent.length) {
            // 若最后一页未铺满
            patent_list = patent.slice(begin_index);
          } else {
            patent_list = patent.slice(begin_index, end_index);
          }
        }
        return patent_list;
      },
      patent_data_length() {
        let patent = this.result.patents;
        if (patent)
          return patent.length;
        else
          return 0
      }
    },
    methods: {
      page_patent_change(currentPage) {
        this.page_patent.current_page = currentPage;
      },
      page_patent_change_size(size) {
        this.page_patent.page_size = size;
      }
    }
  }
</script>

<style scoped>

</style>
