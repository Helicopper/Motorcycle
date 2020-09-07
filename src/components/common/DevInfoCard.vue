<template>
  <!-- 开发者名片 -->
  <el-card class="info-card" :body-style="{ padding: '0px' }" shadow="hover">
    <el-row :gutter="6">
      <el-col :md="4" :lg="4">
        <div class="info-image" >
          <img src="./../../assets/img/icon_person.png" class="center image">
        </div>
      </el-col>
      <el-col :md="4" :lg="4">
        <div class="info-text">
          <div class="info-item">
            <span id="name" class="info-item-title">{{name}}</span>
          </div>
		  <div class="info-item" v-if="country">
		     <span class="info-item-title">Country:</span><span>{{country}}</span>
          </div>
          <div class="info-item" v-if="affiliation">
            <span class="info-item-title">Affiliation:</span><span>{{affiliation}}</span>
          </div>
          <!-- person site -->
          <!-- work -->
          <div class="info-item" v-if="department">
            <span class="info-item-title">Department:</span><span>{{department}}</span>
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
    country: {
      type: String,
      default: ""
    },
    affiliation: {
      type: String,
      default: ""
    },
    department: {
      type: String,
      default: ""
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
  margin-left: .25em;
  margin-right: 50em;
  margin-top: 1em;
}
.info-text{
  margin-left: 100em 0;
}
.info-item {
  margin: .25em 0;
}
.info-item-title {
  font-weight: normal;
  text-transform: capitalize;
  margin-right: .25em;
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
