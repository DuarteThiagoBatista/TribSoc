import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/ConverterPage.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    // meta: {
    //   styleSheet: '/public/style.css'
    // }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
