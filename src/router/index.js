import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import PrivateView from '../views/PrivateView.vue'
import QrCodeView from '../views/QrCodeView'
import store from '@/store'
const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView
  },
  {
    path : '/home',
    name : 'Private',
    component : PrivateView
  },
  {
    path: '/qrcode',
    name : 'QrCode',
    component :  QrCodeView
  }
]
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
router.beforeEach((to, from, next) => {
  // Check if API_TOKEN value exists in Local Storage
  const apiTokenPersist = localStorage.getItem('API_TOKEN');
  const apiTokenState = store.getters.getToken
  if ((to.name !== 'Home' && !apiTokenPersist) && (to.name !=='Home' && !apiTokenState)) {
    // If API_TOKEN value does not exist in Local Storage and the user is not on the login page, redirect to login page
    next({ name: 'Home' });
  } else {
    // Otherwise, allow the user to continue to their destination
    next();
  }
});

export default router


