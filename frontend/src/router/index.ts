import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/pages/Home.vue'),
    },
    {
      path: '/products',
      name: 'products',
      component: () => import('@/pages/Products.vue'),
    },
    {
      path: '/products/:id',
      name: 'product-detail',
      component: () => import('@/pages/ProductDetail.vue'),
    },
    {
      path: '/auth',
      name: 'auth',
      component: () => import('@/pages/Auth.vue'),
    },
    {
      path: '/cart',
      name: 'cart',
      component: () => import('@/pages/Cart.vue'),
    },
    {
      path: '/checkout',
      name: 'checkout',
      component: () => import('@/pages/Checkout.vue'),
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('@/pages/About.vue'),
    },
    {
      path: '/contact',
      name: 'contact',
      component: () => import('@/pages/Contact.vue'),
    },
    {
      path: '/privacy',
      name: 'privacy',
      component: () => import('@/pages/Privacy.vue'),
    },
  ],
  scrollBehavior() {
    return { top: 0 };
  },
});

export default router;

