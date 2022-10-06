import { defineAsyncComponent } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import Stocks from "../views/Stocks.vue";
import Country from "../views/Country.vue";
import Franchise from "../views/Franchise.vue";
import League from "../views/League.vue";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "stocks",
      component: Stocks,
    },
    {
      path: "/country",
      component: Country,
    },
    {
      path: "/franchise",
      component: Franchise,
    },
    {
      path: "/league",
      component: League,
    },
  ],
});

export default router;
