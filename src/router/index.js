import Vue from 'vue';
import VueRouter from 'vue-router'
import IndexPage from '../views/IndexPage';
import Menu from '../views/Menu';

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
];

const router = new VueRouter({
  routes
});

export default router
