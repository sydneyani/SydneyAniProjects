import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        requiresAuth: true,
        role: "employee" // Add meta field to indicate protected route
      }
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/login.vue')
    },
    {
      path: '/newcustomer',
      name: 'newcustomer',
      meta: {
        requiresAuth: true,
        role: "employee" // Add meta field to indicate protected route
      },
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/newcustomer.vue')
    },
    {
      path: '/returningcustomers',
      name: 'returningcustomers',
      meta: {
        requiresAuth: true,
        role: "employee" // Add meta field to indicate protected route
      },
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/returningcustomers.vue')
    },
    {
      path: '/editcustomer/:id',
      name: 'editcustomer',
      meta: {
        requiresAuth: true,
        role: "employee" // Add meta field to indicate protected route
      },
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/newcustomer.vue')
    },
    {
      path: '/signup',
      name: 'signup',
      component: () => import('../views/Signup.vue')
    },
    {
      path: '/chart',
      name: 'chart',
      meta: {
        requiresAuth: true,
        role: "admin" // Add meta field to indicate protected route
      },
      component: () => import('../views/LineChart.vue')
    }

  ]
})

router.beforeEach((to, from, next) => {

  const token = localStorage.getItem('token');
  let user = localStorage.getItem('user');
  user = !!user && typeof user === 'string' ? JSON.parse(user) : null

  if ((to.path === '/login' || to.path === '/signup') && token && user) {
    // If the user is already authenticated, redirect to the default route
    next(from.path);
  }
  else if (to.meta.requiresAuth) {

    if (token && user) {

      if (user.role === to.meta.role) {
        next();
      } else {
        next(from.path);
      }



    } else {
      // User is not authenticated, redirect to login
      next('/login');
    }
  } else {
    // Non-protected route, allow access
    next();
  }
});

export default router
