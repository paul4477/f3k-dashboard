import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('./views/Home.vue')
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('./views/About.vue')
  },
  {
    path: '/showevent',
    name: 'Event',
    component: () => import('./views/ShowEvent.vue')
  }  
]

const router = new Router({
  routes
})

export default router
