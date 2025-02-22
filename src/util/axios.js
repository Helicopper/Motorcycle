// import Vue from "vue"
import axios from "axios"

let http = axios.create({
  // baseURL: process.env.BASE_API,
  timeout: 100000
})

// 环境的切换
// 开发环境
if (process.env.NODE_ENV == 'development') {    
  http.defaults.baseURL = '/api/';} 
// 生产环境
  else if (process.env.NODE_ENV == 'production') {    
  http.defaults.baseURL = '/ai/';
}

export default http;
