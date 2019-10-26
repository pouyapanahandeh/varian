import Vue from 'vue';
import VueRouter from 'vue-router'
import IndexPage from '../views/IndexPage';
import Menu from '../views/Menu';
import LevelSlides from '../views/LevelSlides';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'index',
    component: IndexPage
  },
  {
    path: '/menu',
    name: 'menu',
    component: Menu
  },
  {
    path: '/slides/realm/:realm_id/level/:level_id',
    component: LevelSlides
  }
];

const router = new VueRouter({
  routes
});

export default router
