import { createRouter, createWebHistory } from 'vue-router'
import { useLoggedInUserStore } from '../store/loggedInUser'

// make all paths and names lowercase for consistency
const routes = [
  {
    path: '/',
    component: () => import('../views/home.vue')
  },
  {
    path: "/login",
    name: "login",
    component: () => import('../views/login.vue')
  },
  {
    path: "/signup",
    name: "signup",
    component: () => import('../views/signup.vue')
  },
  
  {
    path: '/thecode',
    name: 'thecode',
    meta: { requiresAuth: true },
    component: () => import('../views/thecode.vue')
  },
  
  {
    path: '/voicechat',
    name: 'voicechat',
    meta: { requiresAuth: true },
    component: () => import('../views/voicechat.vue')
  },
  
  
  {
    path: '/addfriends',
    name: 'addfriends',
    meta: { requiresAuth: true },
    component: () => import('../views/addfriends.vue')
  },
  
]
const router = createRouter({
  history: createWebHistory(),
  routes
})

// protecting the routes
router.beforeEach((to) => {
  const store = useLoggedInUserStore()
  if (to.meta.requiresAuth && !store.isLoggedIn) {
    return {
      path: '/login',
      // save the location we were at to come back later
      query: { redirect: to.fullPath },
    }
  }
})

export default router

