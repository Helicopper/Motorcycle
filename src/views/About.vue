<template>
  <div class="about _container">
    <div class="show-developer">
      <h1 class=""><span class="_font-blue _bd-bottom-blue">team member</span></h1>
      <info-card 
        v-for="(person, index) of developers" 
        :key="index" 
        class="info-card" 
        :name="person.name" 
        :img="person.img"
        :descript="person.descript" 
        :phone="person.phone" 
        :mail="person.mail" 
        :github="person.github"
        :personSite="person.personSite"
        :work="person.work">
      </info-card>
    </div>
  </div>
</template>

<script>
  import DevInfoCard from "./../components/common/DevInfoCard"

  export default {
    name: "about",
    components: {
      "info-card": DevInfoCard
    },
    data() {
      return {
        developers: [
          {
            name: "daifeng li",
            mail: "lidaifeng@mail.sysu.edu.cn",
            work: "团队导师。"
          }, 
          {
            name: "shuo chen",
            mail: "c1094829085@gmail.com",
            github: "https://github.com/chenxshuo",
            personSite: "chenxshuo.cn",
            work: "负责后端检索框架搭建与维护；利用BERT模型进行智能索引构建。"
          },
          {
            name: "zixi huang",
            mail: "471522021@qq.com",
            work: "机构索引和部分可视化索引构建。"
          },
          {
            name: "ruikun hu",
            mail: "huiskelvin@qq.com",
            github: "https://github.com/huiskelvin",
            personSite: "huiskelvin.github.io",
            work: "负责前端页面构建和可视化展现"
          },
          {
            name: "jianbin liao",
            mail: "562941501@qq.com",
            work: "负责专家索引和部分可视化索引构建。"
          },
          {
            name: "shi liu",
            mail: "563489052@qq.com",
            work: "负责前端页面构建和可视化展现"
          }
        ],
      }
    }

  }
</script>

<style>
  h1 {
    text-transform: capitalize;
    font-size: 2em;
    font-weight: 400;
  }

  .show-developer {
    margin: 1.5em auto;
  }

  .info-card {
    max-width: 50em;
    /* width: 40em; */
    /* display: inline-block; */
    margin: 2em auto;
  }

</style>
