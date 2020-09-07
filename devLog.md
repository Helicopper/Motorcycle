# 项目开发记录

## 技术栈

- [Vue.js](https://cn.vuejs.org)
- [vue-cli-3](https://cli.vuejs.org/zh/)
- vue-router
- [webpack](https://www.webpackjs.com/)
- [aixos](https://github.com/axios/axios)
- [Element-UI](http://element-cn.eleme.io/#/zh-CN)
- [echarts](https://echarts.baidu.com/)

## 项目结构

```
|-- pulic
|    |-- favicon.ico
|    |-- index.html
|
|-- src
|    |-- App.vue                          // 主组件
|    |-- main.js
|    |-- assets                           // 静态资源
|    |     |-- logo.png
|    |     |-- css
|    |          |-- icon-type.css
|    |
|    |-- views                            // 主要页面
|    |     |-- Home.vue                   // 主页
|    |     |-- DisplayInfo.vue            // 检索结果展示页
|    |
|    |-- components
|    |     |-- textExpandShrink.vue       // 组件--显示更多
|    |     |-- common                     // 公共组件
|    |     |     |-- Footer.vue                     // 组件--网页尾部
|    |     |     |-- SearchBox.vue                     // 组件--检索框
|    |     |     |-- TopNav.vue                     // 组件--导航栏
|    |     |
|    |     |-- display_info               // 搜索结果页面的组件
|    |     |     |-- display_item
|    |     |           |-- ......
|    |     |     |-- DisplayData.vue               // 搜索结果--文字信息
|    |     |     |-- DisplayVisual.vue             // 搜索结果--可视化信息
|    |     |
|    |     |-- graphs                     // echarts图组件
|    |           |-- ......
|    |
|    |-- util                             // 工具
|          |-- bus.js                     // bus总线，数据控制中心
|          |-- router.js                  // router 路由设置
|
|-- .gitignore
|-- babel.config.js
|-- devLog.md           // 开发日志
|-- package-lock.json
|-- package.json
|-- readme.md
|-- vue.config.js
```

## 开发进程

待解决的问题
[https://docs.qq.com/doc/DZG5aVElOakRsbU1S?opendocxfrom=admin](https://docs.qq.com/doc/DZG5aVElOakRsbU1S?opendocxfrom=admin)
1.专家展示节点 简介（机构+影响力+专业特长）+节点大小+点击跳转到专家的界面（检索专家名词）
2.柱状图 横轴没有跟着排序 数据归一化
3.



## 踩过的坑

### npm run build 后，部署网页到服务器，出现404错误

#### 描述

#### 原因

因为 vue-cli-3 默认打包后的项目放在域名的根目录，使用绝对路径来引用资源，则在index.html中引用资源的目录的`src`开头都为`"/"`.

vue-cli-3 官方文档在 [publicPath](https://cli.vuejs.org/zh/config/#publicpath) 的说明：
>默认情况下，Vue CLI 会假设你的应用是被部署在一个域名的根路径上，例如 `https://www.my-app.com/`。如果应用被部署在一个子路径上，你就需要用这个选项指定这个子路径。例如，如果你的应用被部署在 `https://www.my-app.com/my-app/`，则设置 publicPath 为 `/my-app/`。
这个值也可以被设置为空字符串 ('') 或是相对路径 ('./')，这样所有的资源都会被链接为相对路径，这样打出来的包可以被部署在任意路径

#### 解决
在 vue.config.js 中，修改以下语句，

```js
module.exports = {
  // 使用相对路径引用 js、css 等资源
  publicPath: "./"
}
```
### 图片静态资源的存放

#### 描述
  图片资源应该如何存放，路径引用方式：绝对路径和相对路径
#### 原因
  图片如果存放在public文件夹下，那么是不会经过webpack打包的，也就不会增加md5字符串，不利于版本控制。
#### 解决
参考博客：https://juejin.im/post/5a75c8ce5188257a624c9ff1；https://www.cnblogs.com/cckui/p/10315204.html
开发环境
  如果存放在public文件夹，则直接引用"/img/xxxx.png"。
  如果存放在assets文件夹下，则直接使用文件之间的相对路径。
生产环境
  如果存放在public文件夹，使用"/ai-project/dist/img/xxxx.png"
  如果存放在assets文件夹下，还未测试过。

### v-for 下的组件复用，导致paper的abstract在换页后不变

#### 描述

```html
<!-- 文件结构 -->
<div class="data-item" v-for="(paper, index) in paper_data" :key=index>
  <!-- 略 -->
  <text-expand-shrink :text="paper.paperAbstract"></text-expand-shrink>
  <!-- 略 -->
</div>
```

在换页后，文章的概要abstract没有跟着文章一起改变，导致文章和概要错位。

#### 原因

Vue会最大限度地复用组件。虽然换页后，显示的是v-for里的另一个paper，但是vue认为里面的组件`<text-expand-shrink></text-expand-shrink>`仍是同一个，直接复用，导致内容未改变。

#### 解决

在使用的组件里绑定一个特异的key值，就不会直接复用该组件。

```html
<!-- 文件结构 -->
<div class="data-item" v-for="(paper, index) in paper_data" :key=index>
  <!-- 略 -->
  <text-expand-shrink :text="paper.paperAbstract" :key="paper.paperTitle"></text-expand-shrink>
  <!-- 略 -->
</div>
```

### 在360浏览器输入检索词后，按回车没有进行检索

#### 描述

同题目。

#### 原因

输入检索词后，按回车就会调用`search_query()`方法。在`search_query()`方法中，会使用URLSearchParams处理axios发送的数据，然后query传给后端，再跳转到检索结果页面。而URLSearchParams在特定浏览器（如360浏览器）中不被兼容。

#### 解决

在项目中安装 url-search-params-polyfill，在main.js中引入URLSearchParams 的类，之后可以按照正常操作使用 URLSearchParams。

```
npm i --save url-search-params-polyfill
……

import "url-search-params-polyfill"
```