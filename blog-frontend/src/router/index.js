import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import AllPostsView from '../views/AllPostsView.vue'
import UserPage from '../views/UserPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/allposts',
      name: 'posts',
      component: AllPostsView
    },
    {
      path: '/userpage',
      name: 'user',
      component: UserPage
    }
  ]
})

export default router
