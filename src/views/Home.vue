<template>

	<div id="wrapper">
	    <header id="banner" class="scrollto clearfix" data-enllax-ratio=".5">
	        <div id="header" class="nav-collapse">
	            <div class="row clearfix">

					<div id="logo">

						<img src="images/logo.png" id="banner-logo" alt="Landing Page"/>
						<img src="images/logo-2.png" id="navigation-logo" alt="Landing Page"/>

					</div>

					<nav id="nav-main">
						<ul>
							<li>
								<a href="#banner">搜索</a>
							</li>
							<li>
								<a href="#services">简介</a>
							</li>
							<li>
								<a href="#about">服务</a>
							</li>
							<li>
								<a href="#gallery">展示</a>
							</li>
							<li>
								<a href="#testimonials">联系</a>
							</li>
							<li>
								<a href="#clients">影音</a>
							</li>
							<li>
								<a href="#pricing">团队</a>
							</li>
						</ul>
					</nav>

					<div id="nav-trigger"><span></span></div>
					<nav id="nav-mobile"></nav>

	            </div>
	        </div>
			
	        <div id="banner-content" class="row clearfix">
	            <div class="section-heading">
	                <h1>SEARCH FOR ADVERTISING BIDDING</h1>
					<h2>您可以通过广告商编号或者竞价词编号进行检索</h2>
					<a class="download" href="AllRetrevialWords.xlsx" download="help.xlsx">下载检索词帮助文档</a>
					<div class="tabBox" id="tabBox">
					    <ul>
					        <li class="active" @click="changeTab0">竞价词</li>
					        <li @click="changeTab1">广告商</li>
					    </ul>
						<hello class="active">
							<search-wrapper></search-wrapper>
						</hello>
						<nono>
							<search-wrapper2></search-wrapper2>
						</nono>
					</div>
					<span>检索竞价词：</span>
					<a target="_blank" href="http://180.76.249.27/ai/vue_project_gfy/#/displayInfo?query=1,%E6%97%B6%E5%B0%9A%E5%8D%AB%E8%A1%A3">时尚卫衣</a>
					&nbsp&nbsp
					<a target="_blank" href="http://180.76.249.27/ai/vue_project_gfy/#/displayInfo?query=1,%E7%BE%8E%E5%AE%B9">美容</a>
					&nbsp&nbsp
					<a target="_blank" href="http://180.76.249.27/ai/vue_project_gfy/#/displayInfo?query=1,%E6%99%BA%E8%83%BD%E6%89%8B%E6%9C%BA">智能手机</a>
					</br>
					<span>检索广告商：</span>
					<a target="_blank" href="http://180.76.249.27/ai/vue_project_gfy/#/displayInfo2?query=2,%E4%B8%AD%E5%9B%BD%2a%2a%2a%E5%8C%BB%E9%99%A2026">中国***医院026</a>
					&nbsp&nbsp
					<a target="_blank" href="http://180.76.249.27/ai/vue_project_gfy/#/displayInfo2?query=2,%E9%83%91%E5%B7%9E%2a%2a%2a%E8%AE%BE%E8%AE%A1002">郑州***设计002</a>
					&nbsp&nbsp
					<a target="_blank" href="http://180.76.249.27/ai/vue_project_gfy/#/displayInfo2?query=2,%E6%B2%B3%E5%8D%97%2a%2a%2a%E9%80%9A%E8%AE%AF001">河南***通讯001</a>
					
	            </div>
	        </div>
	    </header>


		<main id="content">

			<div id="services" class="secondary-color scrollto clearfix">
				<div class="row no-padding-bottom clearfix">
					<div class="col-2-3">
						<div class="section-heading">
							<h3>INTRODUCTION</h3>
							<h2 class="section-title">平台介绍</h2>
						</div>
						<p>方舟（Ark）是一个广告竞价检索平台，它通过大数据技术对3.4亿条广告竞价数据记录进行处理，搭建模型进行广告商竞价影响力分析，生成相关数据可视化图，从而提升平台服务商的整体收益。
						</p>
						<p>作为广告竞价平台服务商，您可以通过竞价词编号、广告商编号两种方式进行检索，得到您想要的结果。前者将为您呈现基于单个竞价词的竞争网络图，您可以点击图中的一个结点跳转到对应的广告商检索结果对面，后者将为您呈现多张基于单个广告商的数据分析结果图。
						</p>
						<a></a>
					</div>
					<div class="col-3">
						<img src="images/dancer.jpg" alt="Dancer"/>
					</div>
			
				</div>
			</div>

			<section id="about" class="introduction scrollto">
				<div class="row clearfix">
					<div class="col-3">
						<div class="section-heading">
							<h3>SERVICES</h3>
							<h2 class="section-title">我们将为您提供以下服务</h2>
							<p class="section-subtitle">基于HBase、MapReducer、Spark、HTML等技术</p>
						</div>

					</div>
					<div class="col-2-3">
						<div class="col-2 icon-block icon-top wow fadeInUp" data-wow-delay="0.1s">
							<div class="icon">
								<i class="fa fa-html5 fa-2x"></i>
							</div>
							<div class="icon-block-description">
								<h4>广告商竞价影响力评测</h4>
								<p>找到竞价中最具影响力的那些广告商，通过优惠使他们提高报价，从而带动其他商家，提高平台收益。</p>
							</div>
						</div>

						<div class="col-2 icon-block icon-top wow fadeInUp" data-wow-delay="0.3s">
							<div class="icon">
								<i class="fa fa-bolt fa-2x"></i>
							</div>
							<div class="icon-block-description">
								<h4>历史数据可视化</h4>
								<p>了解广告商在竞价词上的报价变化和排名变动并将这些历史数据可视化，掌握广告商的竞价历史信息。</p>
							</div>
						</div>
						
						<div class="col-2 icon-block icon-top wow fadeInUp" data-wow-delay="0.5s">

							<div class="icon">
								<i class="fa fa-tablet fa-2x"></i>
							</div>

							<div class="icon-block-description">
								<h4>分析广告商预算</h4>
								<p>了解某一个广告商在参与竞价的所有竞价词上的历史最高价，掌握广告商的价格承受范围及对不同竞价词的重视程度。</p>
							</div>
						</div>

						<div class="col-2 icon-block icon-top wow fadeInUp" data-wow-delay="0.5s">
							<div class="icon">
								<i class="fa fa-rocket fa-2x"></i>
							</div>
							
							<div class="icon-block-description">
								<h4>检索简便</h4>
								<p>平台便于操作使用，提供基于不同需求的选择检索功能。</p>
							</div>
						</div>

					</div>
				</div>			
			</section>

	        <aside id="gallery" class="row text-center scrollto clearfix" data-featherlight-gallery
	                 data-featherlight-filter="a">
	
	                <a href="images/gallery-images/gallery-image-1.jpg" data-featherlight="image" class="col-3 wow fadeIn"
	                   data-wow-delay="0.1s"><img src="images/gallery-images/gallery-image-1.jpg" alt="Landing Page"/></a>
	                <a href="images/gallery-images/gallery-image-2.jpg" data-featherlight="image" class="col-3 wow fadeIn"
	                   data-wow-delay="0.3s"><img src="images/gallery-images/gallery-image-2.jpg" alt="Landing Page"/></a>
	                <a href="images/gallery-images/gallery-image-3.jpg" data-featherlight="image" class="col-3 wow fadeIn"
	                   data-wow-delay="0.5s"><img src="images/gallery-images/gallery-image-3.jpg" alt="Landing Page"/></a>
	                <a href="images/gallery-images/gallery-image-4.jpg" data-featherlight="image" class="col-3 wow fadeIn"
	                   data-wow-delay="1.1s"><img src="images/gallery-images/gallery-image-4.jpg" alt="Landing Page"/></a>
	                <a href="images/gallery-images/gallery-image-5.jpg" data-featherlight="image" class="col-3 wow fadeIn"
	                   data-wow-delay="0.9s"><img src="images/gallery-images/gallery-image-5.jpg" alt="Landing Page"/></a>
	                <a href="images/gallery-images/gallery-image-6.jpg" data-featherlight="image" class="col-3 wow fadeIn"
	                   data-wow-delay="0.7s"><img src="images/gallery-images/gallery-image-6.jpg" alt="Landing Page"/></a>
	
	        </aside>

			<aside id="testimonials" class="secondary-color scrollto text-center" data-enllax-ratio=".2">
				<div class="row clearfix">
					<div class="section-heading">
						<h3>LINK</h3>
						<h2 class="section-title">通过以下方式联系我们</h2>
					</div>

					<!--User Testimonial-->
					<blockquote class="col-3 testimonial classic">
						<img src="images/user-images/user-1.jpg" alt="User"/>
						<h4>中山大学广州校区东校园资讯管理学院</h4>
						<footer>地址 - Location</footer>
					</blockquote>
					<!-- End of Testimonial-->

					<!--User Testimonial-->
					<blockquote class="col-3 testimonial classic">
						<img src="images/user-images/user-2.jpg" alt="User"/>
						<h4>linkark@qq.com</h4>
						<footer>邮箱 - Address</footer>
					</blockquote>
					<!-- End of Testimonial-->

					<!--User Testimonial-->
					<blockquote class="col-3 testimonial classic">
						<img src="images/user-images/user-3.jpg" alt="User"/>
						<h4>13242898979</h4>
						<footer>电话 - Phone</footer>
					</blockquote>
					<!-- End of Testimonial-->
				</div>
			</aside>

			<section id="clients" class="scrollto clearfix">
				<div class="row clearfix">
					<div class="col-3">
					<h3>&nbsp;</h3>
					<a href="#" data-videoid="UYJ5IjBRlW8" data-videosite="youtube" class="button video link-lightbox">
					WATCH VIDEO <i class="fa fa-play" aria-hidden="true"></i>
					</a>
					</div>
			
					<div class="col-2-3">
						<div>
							<h3>HELLO</h3>
							<h2 class="section-title">点击左侧视频播放按钮您可以观看到一个简短的关于我们平台是如何运作的视频</h2>
						</div>
					</div>
			
					<div class="col-1">
						<div class="section-heading">
							<h3>this video is</h3>
							<h2 class="section-title">TO BE CONTINUED</h2>
							<p>我们的视频仍在制作中，将为您展示竞争网络图中的某些关键结点是如何受到刺激，并且在通过边传导这些刺激，带来更大的利益回馈的。</p>
						</div>
					</div>
				</div>
			</section>

			<section id="pricing" class="secondary-color text-center scrollto clearfix ">
				<div class="row clearfix">

					<div class="section-heading">
						<h3>团队介绍</h3>
						<h2 class="section-title">在这里我们将为您介绍所有团队成员</h2>
					</div>

					<!--Pricing Block-->
					<div class="pricing-block col-3 wow fadeInUp" data-wow-delay="0.4s">
						<div class="pricing-block-content">
							<h3>Teacher</h3>
							<div class="pricing">
								<div class="price">李岱峰</div>
								<p>团队指导老师</p>
							</div>
							<ul>
								<li>资讯管理学院</li>
								<li>副教授</li>
							</ul>
						</div>
					</div>
					<!--End Pricing Block-->

					<!--Pricing Block-->
					<div class="pricing-block featured col-3 wow fadeInUp" data-wow-delay="0.6s">
						<div class="pricing-block-content">
							<h3>Student</h3>
							<div class="pricing">
								<div class="price">李祥</div>
								<p>团队主要成员</p>
							</div>
							<ul>
								<li>2019级硕士生</li>
								<li>情报学</li>
							</ul>
						</div>
					</div>
					<!--End Pricing Block-->

					<!--Pricing Block-->
					<div class="pricing-block col-3 wow fadeInUp" data-wow-delay="0.8s">
						<div class="pricing-block-content">
							<h3>Student</h3>
							<div class="pricing">
								<div class="price">阮小芸</div>
								<p>团队主要成员</p>
							</div>
							<ul>
								<li>2019级硕士生</li>
								<li>情报学</li>
							</ul>
						</div>
					</div>
					<!--End Pricing Block-->
					
					<!--Pricing Block-->
					<div class="pricing-block col-3 wow fadeInUp" data-wow-delay="0.4s">
						<div class="pricing-block-content">
							<h3>Student</h3>
							<div class="pricing">
								<div class="price">古风云</div>
								<p>团队主要成员</p>
							</div>
							<ul>
								<li>2017级本科生</li>
								<li>信息管理与信息系统专业</li>
							</ul>
						</div>
					</div>
					<!--End Pricing Block-->

					<!--Pricing Block-->
					<div class="pricing-block featured col-3 wow fadeInUp" data-wow-delay="0.6s">
						<div class="pricing-block-content">
							<h3>Student</h3>
							<div class="pricing">
								<div class="price">黄朝晖</div>
								<p>团队主要成员</p>
							</div>
							<ul>
								<li>2017级本科生</li>
								<li>信息管理与信息系统专业</li>
							</ul>
						</div>
					</div>
					<!--End Pricing Block-->

					<!--Pricing Block-->
					<div class="pricing-block col-3 wow fadeInUp" data-wow-delay="0.8s">
						<div class="pricing-block-content">
							<h3>Student</h3>
							<div class="pricing">
								<div class="price">粟静</div>
								<p>团队主要成员</p>
							</div>
							<ul>
								<li>2017级本科生</li>
								<li>信息管理与信息系统专业</li>
							</ul>
						</div>
					</div>
					<!--End Pricing Block-->
				</div>
			</section>
	    </main>
	</div>
</template>

<script>
  import Vue from 'vue'
  import SearchBox from "./../components/common/SearchBox.vue"
  import SearchBox2 from "./../components/common/SearchBox2.vue"
  import featherlightg from "./js/featherlight.gallery.min.js"
  import jquery1 from "./js/jquery.1.8.3.min.js"
  import wowm from "./js/wow.min.js"
  import featherlightm from "./js/featherlight.min.js"
  import jquerye from "./js/jquery.enllax.min.js"
  import jquerysc from "./js/jquery.scrollUp.min.js"
  import jqueryem from "./js/jquery.easing.min.js"
  import jqueryst from "./js/jquery.stickyNavbar.min.js"
  import jqueryw from "./js/jquery.waypoints.min.js"
  import lightboxm from "./js/lightbox.min.js"
  import site from "./js/site.js"
  import test from "./js/test.js"

  export default {
    name: 'home',
    components: {
      "search-wrapper": SearchBox,
	  "search-wrapper2": SearchBox2,
    },
    data() {
      return {
        // 检索建议
        search_suggestion: ["svm","baidu","finance"]
      }
    },
    mounted() {
      this.$axios.post("/wordcloud.json")
        .then(res => {
          let data = res.data;
          for (let i in data) {
            let subclass = Vue.extend(wordcloud);
            new subclass({
              propsData:{
                items:data[i],
                keyString:i
              }
            }).$mount("#"+i);
          }
        })
        .catch(err => {
          console.log("Error" + err);
        })
    },
    methods: {
		changeTab0(){
			var tabBox = document.getElementById('tabBox');
			console.log(tabBox);
			var tabList = tabBox.getElementsByTagName('li');
			console.log(tabList);
			var hello = tabBox.getElementsByTagName("hello");
			console.log(hello);
			var nono = tabBox.getElementsByTagName("nono");
			console.log(nono);
			nono[0].className='';
			tabList[1].className='';
			tabList[0].className='active';
			hello[0].className='active';
		},
		changeTab1(){
			var tabBox = document.getElementById('tabBox');
			console.log(tabBox);
			var tabList = tabBox.getElementsByTagName('li');
			console.log(tabList);
			var hello = tabBox.getElementsByTagName("hello");
			console.log(hello);
			var nono = tabBox.getElementsByTagName("nono");
			console.log(nono);
			hello[0].className='';
			tabList[0].className='';
			tabList[1].className='active';
			nono[0].className='active';
		}
    }
  }
</script>

<style>
	.tabBox {
	  margin: 20px auto;
	  width:500px;
	 }
	.tabBox ul {
	  position:relative;
	  top:1px;
	  text-align: center;
	  /* 相对于之前的位置向下移动1px,使边框重合 */
	 }
	.tabBox ul li {
	  display: inline-block;
	  background-color: #fff;
	  /* 同一行，块标签 */
	  margin-right:10px;
	  padding:0 10px;
	  line-height: 33px;
	  border:1px solid #AAA;
	  cursor: pointer;
	 }
	.tabBox ul li.active {
	  color:#31859b;
	  font-weight:bold;
	  border-bottom-color:#fff;
	 }
	.tabBox hello {
	  display:none;
	  line-height: 50px;
	  text-align: center;
	  border:0px solid #AAA;
	  }
	.tabBox hello.active {
	  display: block;
	  }
	.tabBox nono {
	  display:none;
	  line-height: 50px;
	  text-align: center;
	  border:0px solid #AAA;
	  }
	.tabBox nono.active {
	  display:block;
	  /* div .active加空格是后代筛选，先搜索div在div中筛选，div .active不加空格当前div标签的二次筛选，同级筛选 */
	  }
	.section-heading download {
	  font-size: 20px;
	  font-weight: bold;
	  border-bottom: 3px solid #ffffff;
	  text-align: center;
	  color:black;
	  font-family:serif;}
	.section-heading a {
	    font-size: 14px;
	    text-align: center;
	    color:"#00b0f0";
	    font-family:"黑体";
	  }
	.section-heading span {
	    font-size: 14px;
		color:"#00b0f0";
	    font-family:"黑体";
		color:black;
	  }
	@import 'css/style.css';
	@import 'css/namari-color.css';
	@import 'css/font-awesome.min.css';
	@import 'css/animate.css';
	@import 'ttps://fonts.googleapis.com/css?family=Open+Sans:400,300,600,700,800';
</style>
