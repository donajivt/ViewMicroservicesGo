<template>
  <nav class="navbar navbar-expand navbar-light bg-light shadow-sm sticky-top">
    <div class="container">
      <router-link class="navbar-brand fw-bold" style="color: var(--green);" to="/products">
        <i class="bi bi-bag-heart-fill"></i> VDVT ♡
      </router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ms-auto">
          <li class="nav-item">
            <router-link class="nav-link" to="/">Home</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/carrito">Carrito</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/cupones">Coupons</router-link>
          </li>
          <li class="nav-item" v-if="isAdmin">
            <router-link class="nav-link" to="/products">Admin Products</router-link>
          </li>
          <li class="nav-item" v-if="isLoggedIn">
            <button class="btn btn-link nav-link text-decoration-none text-danger" @click="logout">
              <i class="bi bi-box-arrow-right"></i> Cerrar sesión
            </button>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const isAdmin = ref(false);
const isLoggedIn = ref(!!localStorage.getItem("token"));

onMounted(() => {
  const token = localStorage.getItem("token");
  if (token) {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const role = payload?.role || payload?.Role;
      isAdmin.value = role === 'ADMINISTRATOR' || role === 'SUPER ADMINISTRATOR';
    } catch (e) {
      console.error("Token inválido");
    }
  }
});
const logout = () => {
  localStorage.removeItem("token");
  isLoggedIn.value = false;
  isAdmin.value = false;
  router.push("/login");
};
</script>
