<template>
  <div class="min-vh-100 py-2">
    <AppFrame></AppFrame>
    <h1 class="text-center fw-bold my-4" style="color: var(--yellow-light);">
      <i class="bi bi-bag"></i> Catálogo de Productos
    </h1>

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

    <!-- Sección por categoría -->
    <div v-for="(productos, categoria) in productosPaginados" :key="categoria" class="mb-5 container">
      <h2 class="text-white border-bottom border-light pb-2 mb-4">{{ categoria }}</h2>
      <div class="row g-4">
        <div
          v-for="product in productos"
          :key="product.product_id"
          class="col-12 col-sm-6 col-md-4"
        >
          <ProductCard :product="product" />
        </div>
      </div>

      <!-- Paginación -->
      <div class="d-flex justify-content-center mt-4">
        <button
          class="btn btn-secondary me-2"
          :disabled="(currentPages[categoria] || 1) === 1"
          @click="cambiarPagina(categoria, (currentPages[categoria] || 1) - 1)"
        >
          <<
        </button>
        <span class="text-white align-self-center px-2">
          Página {{ currentPages[categoria] || 1 }}
        </span>
        <button
          class="btn btn-secondary ms-2"
          :disabled="(productosPorCategoria[categoria]?.length || 0) <= ((currentPages[categoria] || 1) * itemsPerPage)"
          @click="cambiarPagina(categoria, (currentPages[categoria] || 1) + 1)"
        >
          >>
        </button>
      </div>
    </div>
  </div>
</template>


<script setup>
import { ref, computed, onMounted } from 'vue';
import ProductCard from '../components/ProductCard.vue';
import AppFrame from '../components/AppFrame.vue';

const productos = ref([]);
const searchTerm = ref("");

// Mapeo de paginación por categoría
const itemsPerPage = 6;
const currentPages = ref({});

const productosPorCategoria = computed(() => {
  const agrupados = {};
  productos.value.forEach(p => {
    if (!agrupados[p.category_name]) agrupados[p.category_name] = [];
    agrupados[p.category_name].push(p);
  });
  return agrupados;
});

const productosPaginados = computed(() => {
  const paginados = {};
  for (const categoria in productosPorCategoria.value) {
    const todos = productosPorCategoria.value[categoria];
    const paginaActual = currentPages.value[categoria] || 1;
    const inicio = (paginaActual - 1) * itemsPerPage;
    const fin = inicio + itemsPerPage;
    paginados[categoria] = todos.slice(inicio, fin);
  }
  return paginados;
});

const cambiarPagina = (categoria, pagina) => {
  currentPages.value = {
    ...currentPages.value,
    [categoria]: pagina
  };
};

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
      // Resetear página de cada categoría
      currentPages.value = {};
    } else {
      console.error("Error en la respuesta:", data.message);
    }
  } catch (error) {
    console.error("Error al obtener productos:", error);
  }
};

const verTodos = () => {
  searchTerm.value = "";
  fetchProducts();
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
      const filtrados = data.result.filter(p =>
        p.name.toLowerCase().includes(nombre)
      );
      productos.value = filtrados;
      currentPages.value = {}; // Reinicia páginas
    }
  } catch (error) {
    console.error("Error al buscar producto:", error);
  }
};

onMounted(fetchProducts);
</script>

