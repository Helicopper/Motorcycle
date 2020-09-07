import Vue from 'vue';
import Router from 'vue-router';
import Home from './../views/Home.vue';
// import DisplayInfo from './../views/DisplayInfo.vue';
// import About from "./../views/About.vue"

Vue.use(Router);

export default new Router({
  // mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/displayInfo',
      name: 'displayInfo',
      // component: DisplayInfo
      component: () => import("./../views/DisplayInfo.vue")
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      //component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
     {
      path: '/displayInfo2',
      name: 'displayInfo2',
      component: () => import("./../views/DisplayInfo2.vue")     
    },
	{
		path:'/displayInfo3',
		name:'displayInfo3',
		component: () => import("./../views/DisplayInfo3.vue")
	},
    {
      path: "/about",
      name: "about",
      // component: About
      component: () => import('./../views/About.vue')
    },
    {
      path: "/medic",
      name: "medic",
      component: () => import("./../views/transplant/DisplayMedic.vue")
    }
  ]
})
