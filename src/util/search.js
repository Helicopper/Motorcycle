import $bus from "./bus"
import $axios from "./../util/axios"
import $router from './router'
// import { type } from "os";
// let $echarts = require('echarts');
// import $echarts from 'echarts'

export default {
  to_display: (query) => {
    $router.push({
      path: "/displayInfo3",
      query: {
        query: query
      }
    })
  },
  to_display2: (query) => {
  $router.push({
      path: "/displayInfo",
      query: {
        query: query
      }
    })
  },

  to_display3: (query) => {
  $router.push({
      path: "/displayInfo2",
      query: {
        query: query
      }
    })
  },
  search_query: (query,SearchType) => {
    

    // ----------------------------------------------------
    //将数据拼接为php可接收的格式
    //转义字符处理
	console.log("query处理前");
	console.log(query);
	query=query.replace(/\*/g,"\\*");
	console.log("query");
	console.log(query);
	let send_query = new URLSearchParams();
    send_query.append('page', '1');
    send_query.append('search', query);
    send_query.append('SearchType',SearchType);
	// 更新 bus 的数据
    $bus.update_query_text(query);
    $bus.clean_last_result();

    console.log("发送请求");

    // 开始 loading……
    $bus.$emit("changeLoading", true)

    // 向114的 MINA 发送请求
	//console.log("query");
	//console.log(query);
    //query=query.replace(/\*/g,"\\*");
	//console.log(query);
	
	var myDate = new Date();
	var Time1 = myDate.getTime();
	//console.log("向php发送前时间");
	//console.log(Time1);
	console.log("send_query");
	console.log(send_query);
	//send_query.replace("*","\*");
	//console.log(send_query);
	$axios.post("/MINA_STEP_s/aitest3.php", send_query)

	// 开发环境，请求图的静态数据
    // $axios.get("/api/answer_liushi.json")
      .then(res => {
        //console.log("数据已接收");
        // console.log(res.data)
        $bus.receive_result(res.data);
        // this.$bus.$emit("changeLoading", false)
      })
      .catch(err => {
        console.log("Error" + err);
        $bus.$emit("changeLoading", false)
      });
	  var myDate2 = new Date();
	  var Time2 = myDate2.getTime();
	  console.log("接受完Php时间");
	  console.log(Time2);
	  console.log("向Php发送检索请求到接受完php数据的时间差");
	  console.log(Time2-Time1);
	}
}
