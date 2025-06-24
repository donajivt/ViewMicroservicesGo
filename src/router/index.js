import { createRouter, createWebHistory } from 'vue-router';
import Login from '../views/Authentication/Login.vue';
import Home from '../views/Home.vue';
import Register from '../views/Authentication/Register.vue';
import ProductCatalog from '../views/Products/ProductCatalog.vue';
import ProductsView from '../views/Products/ProductsView.vue';
import Carrito from '../views/ShoppingCart/CarritoView.vue';
import Cupones from '../views/Coupons/CouponsView.vue';
import AddEditProductView from '../views/Products/AddEditProductView.vue';
import AdminCouponsView from '../views/Coupons/AdminCouponsView.vue';
import AddEditCouponView from '../views/Coupons/AddEditCouponView.vue';

const routes = [
  { path: '/login', component: Login },
  { path: '/register', component: Register },
  { path: '/', component: Home },
  {
    path: '/home',
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
    path: '/couponsUser',
    component: Cupones,
    meta: { requiresAuth: true }
  },
  {
    path: '/coupons',
    component: AdminCouponsView,
    meta: { requiresAuth: true }
  },
  {
    path: '/coupons/add',
    component: AddEditCouponView,
    meta: { requiresAuth: true, isEdit: false }
  },
  {
    path: '/coupons/edit/:id',
    component: AddEditCouponView,
    meta: { requiresAuth: true, isEdit: true },
    props: true
  },
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
