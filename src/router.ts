import { createRouter, createWebHistory } from "vue-router";

import FeaturedView from "./views/FeaturedView.vue";
import CharactersView from "./views/CharactersView.vue";
import ArtworksView from "./views/ArtworksView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  linkActiveClass: "header__nav-link--active",
  linkExactActiveClass: "header__nav-link--active",
  scrollBehavior: (to, from, savedPosition) => {
    return { top: 0 };
  },
  routes: [
    {
      path: "/featured",
      name: "featured",
      component: FeaturedView,
    },
    {
      path: "/characters",
      name: "characters",
      component: CharactersView,
    },
    {
      path: "/artworks",
      name: "artworks",
      component: ArtworksView,
    },
    {
      path: "/:catchAll(.*)*",
      redirect: "/featured",
    },
  ],
});

export default router;
