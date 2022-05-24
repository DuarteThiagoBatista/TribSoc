import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomePage.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    // meta: {
    //   styleSheet: '/public/style.css'
    // }
  },
  {
    path: '/companies',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/CompaniesPage.vue')
  },
  {
    path: '/converter',
    name: 'converter',
    component: () => import('../views/ConverterPage.vue')
  },
  {
  path: '/teste',
  name: 'teste',
  component: () => import('../views/TestePage.vue')
}
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router