<template>
  <div class="min-vh-100 py-2">
    <AppFrame></AppFrame>
    <h1 class="text-center fw-bold my-4" style="color: var(--yellow-light);"><i class="bi bi-bag"></i> Catálogo de Productos</h1>

    <!-- Buscador -->
    <div class="d-flex justify-content-center align-items-center flex-wrap gap-3 mb-5">
      <input
        v-model="searchTerm"
        type="text"
        placeholder="Buscar por nombre..."
        class="input-custom"
      />
      <button @click="buscarProducto" class="btn btn-primary-custom rounded-pill px-4">
        Buscar
      </button>
      <button @click="verTodos" class="btn btn-secondary-custom rounded-pill px-4">
        Ver todos
      </button>
    </div>

    <!-- Grid -->
    <div class="container">
      <div class="row g-4">
        <div v-for="product in productos" :key="product.product_id" class="col-12 col-sm-6 col-md-4">
          <ProductCard :product="product" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import ProductCard from '../components/ProductCard.vue';
import AppFrame from '../components/AppFrame.vue';

const productos = ref([]);
const searchTerm = ref("");

const fetchProducts = async () => {
  try {
    const response = await fetch("http://localhost:2222/api/products/", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token")
      }
    });
    const data = await response.json();
    if (data.is_success) {
      productos.value = data.result;
    } else {
      console.error("Error en la respuesta:", data.message);
    }
  } catch (error) {
    console.error("Error al obtener productos:", error);
  }
};
const verTodos = () => {
  searchTerm.value = ""; // Limpia el campo de búsqueda
  fetchProducts();       // Vuelve a cargar todos los productos
  window.scrollTo({ top: 0, behavior: 'smooth' });
};
const buscarProducto = async () => {
  try {
    const nombre = searchTerm.value.trim().toLowerCase();

    const todos = await fetch("http://localhost:2222/api/products/", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token")
      }
    });
    const data = await todos.json();

    if (data.is_success) {
      const producto = data.result.find(p =>
        p.name.toLowerCase().includes(nombre)
      );
      if (producto) {
        const response = await fetch(`http://localhost:2222/api/products/${producto.product_id}`, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token")
          }
        });
        const resultado = await response.json();
        productos.value = [resultado.result];
      } else {
        alert("Producto no encontrado");
        productos.value = [];
      }
    }
  } catch (error) {
    console.error("Error al buscar producto:", error);
  }
};

onMounted(() => {
  fetchProducts();
});
</script>
