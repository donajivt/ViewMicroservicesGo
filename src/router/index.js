import { createRouter, createWebHistory } from 'vue-router';
import Login from '../views/Login.vue';
import Register from '../views/Register.vue';
import ProductCatalog from '../views/ProductCatalog.vue';
import ProductsView from '../views/ProductsView.vue';
import Carrito from '../views/CarritoView.vue';
import Cupones from '../views/CuponesView.vue';
import AddEditProductView from '../views/AddEditProductView.vue'

const routes = [
  { path: '/login', component: Login },
  { path: '/register', component: Register },
  {
    path: '/',
    component: ProductCatalog,
    meta: { requiresAuth: true }
  },
  {
    path: '/products',
    component: ProductsView,
    meta: { requiresAuth: true }
  },
  {
    path: '/products/add',
    component: AddEditProductView,
    meta: { requiresAuth: true, isEdit: false }
  },
  {
    path: '/products/edit/:id',
    component: AddEditProductView,
    meta: { requiresAuth: true, isEdit: true },
    props: true
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
    next('/login');
  } else {
    next();
  }
});

export default router;
