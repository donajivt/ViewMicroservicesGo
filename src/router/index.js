import { createRouter, createWebHistory } from 'vue-router';
import Login from '../views/Login.vue';
import Register from '../views/Register.vue';
import ProductCatalog from '../views/ProductCatalog.vue';
import Carrito from '../views/CarritoView.vue';
import Cupones from '../views/CuponesView.vue';

const routes = [
  { path: '/', component: Login },
  { path: '/register', component: Register },
  {
    path: '/products',
    component: ProductCatalog,
    meta: { requiresAuth: true }
  },
  {
    path: '/carrito',
    component: Carrito,
    meta: { requiresAuth: true }
  },
  {
    path: '/cupones',
    component: Cupones,
    meta: { requiresAuth: true }
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

// 🔐 Guardia de autenticación
router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem('token');

  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/');
  } else {
    next();
  }
});

export default router;
