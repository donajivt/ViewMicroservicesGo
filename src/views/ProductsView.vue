<template>
  <AppFrame />
  <h2 class="mb-4 text-center panel-title pt-3">Panel de Administración</h2>
  <div class="container admin-panel">
    <div class="admin-controls mb-4">
      <div class="row g-3 align-items-center">
        <div class="col-md-6">
          <div class="input-group">
            <input v-model="searchId" class="form-control search-input" placeholder="Buscar por ID..." />
            <button @click="verDetallesPorId" class="btn btn-search">
              <i class="bi bi-search"></i> Buscar
            </button>
          </div>
        </div>
        <div class="col-md-6 text-md-end">
          <button class="btn btn-add" @click="agregarProducto">
            <i class="bi bi-plus-circle"></i> Agregar Producto
          </button>
        </div>
      </div>
    </div>

    <div v-if="productoDetalle" class="product-detail-container mb-4">
      <ProductCard :product="productoDetalle" />
      <div class="alert alert-info mt-3 detail-alert">Detalles del producto mostrado arriba</div>
    </div>

    <div class="table-responsive">
      <table class="table table-hover admin-table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Stock</th>
            <th>Categoría</th>
            <th class="text-end">Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="prod in paginatedProducts" :key="prod.product_id">
            <td>{{ prod.name }}</td>
            <td :class="{'low-stock': prod.stock < 5}">{{ prod.stock }}</td>
            <td>{{ prod.category_name }}</td>
            <td class="text-end">
              <button class="btn btn-sm btn-action me-2" @click="verDetalles(prod.product_id)">
                <i class="bi bi-eye"></i>
              </button>
              <button class="btn btn-sm btn-action me-2" @click="editarProducto(prod.product_id)">
                <i class="bi bi-pencil"></i>
              </button>
              <button class="btn btn-sm btn-action btn-danger" @click="eliminarProducto(prod.product_id)">
                <i class="bi bi-trash"></i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <nav v-if="totalPages > 1" class="mt-4">
      <ul class="pagination justify-content-center">
        <li class="page-item" :class="{disabled: currentPage === 1}">
          <button class="page-link" @click="prevPage">&laquo;</button>
        </li>
        <li class="page-item" v-for="page in totalPages" :key="page" :class="{active: currentPage === page}">
          <button class="page-link" @click="goToPage(page)">{{ page }}</button>
        </li>
        <li class="page-item" :class="{disabled: currentPage === totalPages}">
          <button class="page-link" @click="nextPage">&raquo;</button>
        </li>
      </ul>
    </nav>

    <div class="row mt-3">
      <div class="col-md-6">
        <div class="showing-entries">
          Mostrando {{ startItem }}-{{ endItem }} de {{ productos.length }} productos
        </div>
      </div>
      <div class="col-md-6 text-md-end">
        <select v-model="itemsPerPage" class="form-select items-per-page" @change="resetPagination">
          <option value="5">5 por página</option>
          <option value="10">10 por página</option>
          <option value="20">20 por página</option>
          <option value="50">50 por página</option>
        </select>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import AppFrame from '../components/AppFrame.vue';
import ProductCard from '../components/ProductCard.vue';
import { useRouter } from 'vue-router';

const productos = ref([]);
const productoDetalle = ref(null);
const searchId = ref("");
const router = useRouter();

// Variables de paginación
const currentPage = ref(1);
const itemsPerPage = ref(5);

// Computed properties para paginación
const totalPages = computed(() => Math.ceil(productos.value.length / itemsPerPage.value));
const paginatedProducts = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;
  return productos.value.slice(start, end);
});
const startItem = computed(() => (currentPage.value - 1) * itemsPerPage.value + 1);
const endItem = computed(() => {
  const end = currentPage.value * itemsPerPage.value;
  return end > productos.value.length ? productos.value.length : end;
});

// Métodos de paginación
const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
};

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
};

const goToPage = (page) => {
  currentPage.value = page;
};

const resetPagination = () => {
  currentPage.value = 1;
};

// Resto de tus métodos existentes
const fetchProducts = async () => {
  try {
    const res = await fetch("http://localhost:2222/api/products/", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token")
      }
    });
    const data = await res.json();
    if (data.is_success) {
      productos.value = data.result;
      resetPagination();
    }
  } catch (err) {
    console.error(err);
  }
};

const verDetalles = async (id) => {
  const res = await fetch(`http://localhost:2222/api/products/${id}`, {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token")
    }
  });
  const data = await res.json();
  productoDetalle.value = data.result;
};

const verDetallesPorId = () => {
  if (searchId.value.trim()) {
    verDetalles(searchId.value.trim());
  }
};

const eliminarProducto = async (id) => {
  if (confirm("¿Estás seguro de eliminar este producto?")) {
    const res = await fetch(`http://localhost:2222/api/products/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token")
      }
    });
    const data = await res.json();
    if (data.is_success) {
      alert("Producto eliminado correctamente");
      fetchProducts();
    } else {
      alert("Error al eliminar");
    }
  }
};

const editarProducto = (id) => {
  router.push(`/products/edit/${id}`);
};

const agregarProducto = () => {
  router.push(`/products/add`);
};

onMounted(() => {
  const token = localStorage.getItem("token");
  if (!token) {
    alert("Acceso denegado");
    router.push("/productos");
    return;
  }

  const role = JSON.parse(atob(token.split('.')[1])).role;
  if (role !== "ADMINISTRATOR" && role !== "SUPER ADMINISTRATOR") {
    alert("Acceso restringido");
    router.push("/productos");
  } else {
    fetchProducts();
  }
});
</script>