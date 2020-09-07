<template>
  <!-- paper条目 -->
  <div>
    <div class="data-item" v-for="(paper, index) in paper_data" :key=index>
      <!--标题-->
      <div v-if="paper.paperTitle!=''"><a :href="paper.paperUrl" target="_blank" class="result-title" v-html="paper.paperTitle"></a>
        <!-- <span class='icon-type bgColor-paper'>paper</span> -->
      </div>
      <!-- 作者 -->
      <p v-if="paper.paperAuthors!=''"><span class="word-field">Authors：</span>
        <!-- 循环取出数组中的作者名 -->
        <span v-for="(author,index) in paper.paperAuthors" :key=index>
          <span class="authors-inventor-source author-span-margin">{{author}},</span>
        </span>
      </p>
      <!-- 摘要 -->
      <!-- <p v-if="paper.paperAbstract!=''"><span class="word-field word-field-abstract">Abstract：</span><span class="result-content">{{paper.paperAbstract}}</span></p> -->
      <p v-if="paper.paperAbstract!=''">
        <span class="word-field word-field-abstract">Abstract：</span>
        <text-expand-shrink :text="paper.paperAbstract" :key="paper.paperTitle"></text-expand-shrink>
      </p>
      <!--出版年份-->
      <p v-if="paper.paperPublishYear>=0">
        <span class="word-field">Publish year: </span>
        <span class='result-content'>{{paper.paperPublishYear}}</span>
      </p>
      <!-- 被引次数 -->
      <p v-if="paper.paperCitationsNum>=0">
        <span class="word-field">Citation: </span>
        <span class='result-content'>{{paper.paperCitationsNum}}</span>
      </p>
      <!-- 期刊   -->
      <p v-if="paper.paperJournalFullName!=''">
        <span class='word-field'>Journal: </span>
        <span class='paper-reslt word-field-abstract' v-html="paper.paperJournalFullName"></span>
      </p>
      <!-- 会议 -->
      <p v-if="paper.paperConfFullName!=''">
        <span class='word-field'>Conference: </span>
        <span class='result-content word-field-abstract' v-html="paper.paperConfFullName"></span>
      </p>
    </div>
    <!-- 分页 -->
    <el-pagination 
      :current-page="page_paper.current_page" 
      :page-sizes="page_paper.page_sizes" 
      @current-change="page_paper_change"
      @size-change="page_paper_change_size" 
      :layout="page_paper.page_layout" 
      :total="paper_data_length">
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
        page_paper: {
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
      paper_data() {
        let papers = this.result.papers;
        let papers_list = [];
        if (papers) { // 若有 paper 数据
          // 当前页
          let curpage = this.page_paper.current_page;
          // 每页显示数目
          let size = this.page_paper.page_size;
          // 开始和结尾的索引
          let begin_index = size * (curpage - 1);
          let end_index = size * curpage;
          // 假分页，切分数据
          if (end_index >= papers.length) {
            // 若最后一页未铺满
            papers_list = papers.slice(begin_index);
          } else {
            papers_list = papers.slice(begin_index, end_index);
          }
        }
        return papers_list;
      },
      paper_data_length() {
        let papers = this.result.papers;
        if (papers)
          return papers.length;
        else
          return 0
      }
    },
    methods: {
      page_paper_change(currentPage) {
        this.page_paper.current_page = currentPage;
      },
      page_paper_change_size(size) {
        this.page_paper.page_size = size;
      }
    }
  }
</script>

<style scoped>

</style>
