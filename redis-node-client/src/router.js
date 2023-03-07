import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('./views/HomeView.vue')
  },
  {
    path: '/book',
    name: 'book',
    component: () => import('./views/BookView.vue')
  },
  {
    path: '/user',
    name: 'user',
    component: () => import('./views/UserView.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router;