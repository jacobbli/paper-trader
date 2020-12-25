import Vue from 'vue'
import VueRouter from 'vue-router'
import BaseDashboard from '../components/pages/BaseDashboard.vue'
import Login from '../components/pages/Login.vue'
import store from '../store/store.js'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    redirect: '/login'
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: BaseDashboard,
    meta: { requiresAuth: true }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.getters.isLoggedIn) {
      next('/login');
    } else {
      next();
    }
  }
  else {
    next();
  }
});

export default router
