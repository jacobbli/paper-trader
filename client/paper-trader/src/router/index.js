import Vue from 'vue'
import VueRouter from 'vue-router'
import BaseDashboard from '../components/pages/BaseDashboard.vue'
import Login from '../components/pages/Login.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: BaseDashboard
  },
  {
    path: '/',
    name: 'Login',
    component: Login
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
