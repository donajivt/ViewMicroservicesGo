<template>
    <AppFrame />
  <div class="container">
    <h2 class="mb-4 text-center" style="color: var(--yellow-light)">Panel de Administración</h2>

    <div class="d-flex justify-content-end mb-3">
      <button class="btn btn-primary-custom" @click="agregarProducto">Agregar Producto</button>
    </div>

    <input v-model="searchId" class="input-custom mb-3" placeholder="Buscar por ID..." />
    <button @click="verDetallesPorId" class="btn btn-secondary-custom mb-3">Buscar</button>

    <div v-if="productoDetalle">
      <ProductCard :product="productoDetalle" />
      <div class="alert alert-info mt-3">Detalles del producto mostrado arriba</div>
    </div>

    <table class="table table-bordered table-striped table-hover">
      <thead class="table-dark">
        <tr>
          <th>Nombre</th>
          <th>Stock</th>
          <th>Categoría</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="prod in productos" :key="prod.product_id">
          <td>{{ prod.name }}</td>
          <td>{{ prod.stock }}</td>
          <td>{{ prod.category }}</td>
          <td>
            <button class="btn btn-sm me-2" @click="verDetalles(prod.product_id)">Detalles</button>
            <button class="btn btn-sm me-2" @click="editarProducto(prod.product_id)">Editar</button>
            <button class="btn btn-sm" @click="eliminarProducto(prod.product_id)">Eliminar</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import AppFrame from '../components/AppFrame.vue';
import ProductCard from '../components/ProductCard.vue';
import { useRouter } from 'vue-router';

const productos = ref([]);
const productoDetalle = ref(null);
const searchId = ref("");
const router = useRouter();

const fetchProducts = async () => {
  try {
    const res = await fetch("http://localhost:2222/api/products/", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token")
      }
    });
    const data = await res.json();
    if (data.is_success) productos.value = data.result;
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
  router.push(`/editar/${id}`);
};

const agregarProducto = () => {
  router.push(`/agregar`);
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
