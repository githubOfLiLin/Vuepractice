import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "contact",
      redirect: "/index", //重定向
      component: () => import("./views/page1.vue")
    },
    {
      path: "/index",
      name: "page1",
      component: () => import("./views/page1.vue")
    },
    {
      path: "/floor/",
      redirect: "/floor/F1", //重定向
      component: () => import("./views/contact.vue")
    },
    {
      path: "/floor/:floorid",
      component: () => import("./views/contact.vue")
    },
    {
      path:"/detailed/:detailId",
      component:() => import("./views/detailed-infor.vue")
    },
    {
      path:"/addcontact",
      component:() => import("./views/addcontact.vue")
    }
  ]
});
