import Vue from "vue";
import Router from "vue-router";
import List from "./views/List.vue";
import Item from "./views/Item.vue";

Vue.use(Router);

export default new Router({
    mode: "history",
    base: process.env.BASE_URL,
    routes: [
        {
            path: "/",
            name: "list",
            component: List
        },
        {
            path: "/:type/:id",
            name: "item",
            component: Item
        }
    ]
});
