import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("./views/Home.vue")
  },
  {
    path: "/roundstatus",
    name: "Round Status",
    component: () => import("./views/RoundStatus.vue")
  },
  {
    path: "/scoring",
    name: "Scoring",
    component: () => import("./views/Scoring.vue")
  },
  {
    path: "/about",
    name: "About",
    component: () => import("./views/About.vue")
  },
  {
    path: "/event/:id?",
    name: "Event",
    component: () => import("./views/ShowEvent.vue")
  }
];

const router = new Router({
  routes
});

export default router;
