import { createRouter, createWebHistory, createWebHashHistory } from "vue-router";

import HomeView from "../views/Home.vue";
import LandmarksView from "../views/Landmarks.vue";
import LandmarkView from "../views/Landmark.vue";
import PlantsView from "../views/Plants.vue";
import PlantView from "../views/Plant.vue";
import TodayView from "../views/Today.vue";

const router = createRouter({
    scrollBehavior(to, from, savedPosition) {
        //https://router.vuejs.org/guide/advanced/scroll-behavior.html
        return { top: 0 }
    },
    history: createWebHashHistory(import.meta.env.BASE_RUL),
    routes: [
        {
            path: "/",
            name: "home",
            component: HomeView,
        },
        {
            path: "/plants",
            name: "plants",
            component: PlantsView,
        },
        {
            path: "/landmarks",
            name: "landmarks",
            component: LandmarksView,
        },
        {
            path: "/plants/:id",
            name: "plant",
            component: PlantView,
        },
        {
            path: "/landmarks/:id",
            name: "landmark",
            component: LandmarkView,
        },
        {
            path: "/today",
            name: "today",
            component: TodayView,
        },
        // Not Found, Redirect to Menu for now
        {
            path: "/:pathMatch(.*)*",
            name: "notFoundMenu",
            component: HomeView,
        }
    ]
});

export default router;