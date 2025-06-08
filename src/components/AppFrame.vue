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
            <router-link class="nav-link" to="/products">Productos</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/carrito">Carrito</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/cupones">Cupones</router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script >
export default {
  name: "AppFrame"
};
</script>
