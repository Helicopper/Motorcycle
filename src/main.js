import Vue from 'vue'
import 'url-search-params-polyfill';
// 引入element-ui，注意放置位置
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue'
import router from './util/router'
// 引入 axios
// import axios from 'axios'
import axios from "./util/axios"
// 引入echarts
import echarts from 'echarts'
import "./assets/css/main.css"
import "./assets/css/icon-type.css";
// 引入bus
import Bus from "./util/bus"
import search from "./util/search"

// 引入画图的公共函数
import drawGraphs from "./util/drawGraphs"
// Vue.use(drawGraphs);
Vue.prototype.$graphs = drawGraphs

Vue.use(ElementUI);

// 写入vue的原型，便于调用
Vue.prototype.$axios = axios
Vue.prototype.$echarts = echarts
Vue.prototype.$bus = Bus
Vue.prototype.$search = search

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
