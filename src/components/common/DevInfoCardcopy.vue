<template>
  <!-- 开发者名片 -->
  <el-card class="info-card" :body-style="{ padding: '0px' }" shadow="hover">
    <el-row :gutter="20">
      <el-col :md="24" :lg="8">
        <div class="info-image" >
          <img src="./../../assets/img/icon_person.png" class="center image">
        </div>
      </el-col>
      <el-col :md="24" :lg="16">
        <div class="info-text">
          <div class="info-item">
            <span id="name" class="info-item-title">{{name}}</span>
          </div>
          <!-- mail -->
          <div class="info-item" v-if="descript">
            <span class="info-descript">{{descript}}</span>
          </div>
          <!-- mail -->
          <div class="info-item" v-if="mail">
            <span class="info-item-title">Mail:</span><span>{{mail}}</span>
          </div>
          <!-- person site -->
          <div class="info-item" v-if="personSite">
            <span class="info-item-title">Person site:</span><span><a :href="personSite" target="_blank">{{personSite}}</a></span>
          </div>
          <!-- phone -->
          <div class="info-item" v-if="phone">
            <span class="info-item-title">Phone:</span><span>{{phone}}</span>
          </div>
          <!-- Github -->
          <div class="info-item" v-if="github">
            <span class="info-item-title">Github:</span><span><a :href="github"  target="_blank">{{github}}</a></span>
          </div>
          <!-- work -->
          <div class="info-item" v-if="work">
            <span class="info-item-title">Work:</span><span>{{work}}</span>
          </div>
        </div>
      </el-col>
    </el-row>
  </el-card>
</template>

<script>
export default {
  props: {
    img: {
      type: String,
      default: ""
    },
    name: {
      type: String,
      required: true
    },
    descript: {
      type: String,
      default: ""
    },
    mail: {
      type: String,
      default: ""
    },
    phone: {
      type: String,
      default: ""
    },
    github: {
      type: String,
      default: ""
    },
    personSite: {
      type: String,
      default: ""
    },
    work: {
      type: String,
      defalut: ""
    }
  },
  data() {
    return {
    }
  }
}
</script>

<style scoped>
.center {
  margin: 0 auto;
}
.info-card {
  /* margin: 0 auto; */
  padding: 1em;
}
.info-image {
  /* border-bottom: 1px solid #ebeef5; */
  margin-bottom: .5em;
}
.info-image img {
  width: 100%;
  max-width: 12.5em;
  margin: 1em;
}
.info-text{
  margin: .5em 0;
}
.info-item {
  margin: .5em 0;
}
.info-item-title {
  font-weight: normal;
  text-transform: capitalize;
  margin-right: .5em;
}
#name {
  font-size: 2em;
  margin-bottom: .5em;
}
.info-descript {
  color: rgba(0,0,0,.5);
  margin-bottom: .5em;
}
</style>
