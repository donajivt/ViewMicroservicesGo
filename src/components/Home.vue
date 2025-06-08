<template>
  <div class="min-h-screen bg-yellow-50 py-10 px-4">
    <h1 class="text-4xl font-bold text-center text-yellow-800 mb-10">🛒 Catálogo de Productos</h1>

    <!-- Buscador -->
    <div class="flex justify-center items-center mb-10 gap-3 flex-wrap">
      <input
        v-model="searchTerm"
        type="text"
        placeholder="Buscar por nombre..."
        class="w-80 px-4 py-2 rounded-full border border-yellow-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
      />
      <button
        @click="buscarProducto"
        class="bg-yellow-500 text-white px-4 py-2 rounded-full hover:bg-yellow-600 transition"
      >
        Buscar
      </button>
      <button
        @click="fetchProducts"
        class="bg-yellow-200 text-yellow-900 px-4 py-2 rounded-full hover:bg-yellow-300 transition"
      >
        Ver todos
      </button>
    </div>

    <!-- Grid de tarjetas -->
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-7xl mx-auto px-4">
      <div
        v-for="product in productos"
        :key="product.product_id"
        class="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-1 p-6 flex flex-col items-center text-center"
      >
        <img
          :src="product.image_url"
          alt="Imagen del producto"
          class="w-44 h-44 object-cover rounded-lg mb-4 shadow-sm"
        />
        <h2 class="text-lg font-bold text-yellow-800">{{ product.name }}</h2>
        <p class="text-base text-yellow-600 font-semibold mt-2">${{ product.price.toFixed(2) }}</p>
        <p class="text-sm text-yellow-500 mt-1">Categoría: {{ product.category_name }}</p>
        <p class="text-sm text-yellow-700 mt-3">{{ product.description }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      productos: [],
      searchTerm: ""
    };
  },
  methods: {
    async fetchProducts() {
      try {
        console.log("Obteniendo todos los productos...");
        const response = await fetch("http://localhost:2222/api/products/", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token")
          }
        });

        const data = await response.json();
        console.log("Respuesta completa:", data);

        if (data.is_success) {
          this.productos = data.result;
          console.log("Productos guardados:", this.productos);
        } else {
          console.error("Error en la respuesta:", data.message);
        }
      } catch (error) {
        console.error("Error al obtener productos:", error);
      }
    },
    async buscarProducto() {
      try {
        const nombre = this.searchTerm.trim().toLowerCase();
        console.log("Buscando producto con nombre:", nombre);

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
            console.log("Producto encontrado:", producto);
            const response = await fetch(`http://localhost:2222/api/products/${producto.product_id}`, {
              headers: {
                Authorization: "Bearer " + localStorage.getItem("token")
              }
            });
            const resultado = await response.json();
            this.productos = [resultado.result];
          } else {
            alert("Producto no encontrado");
            this.productos = [];
          }
        }
      } catch (error) {
        console.error("Error al buscar producto:", error);
      }
    }
  },
  mounted() {
    this.fetchProducts();
  }
};
</script>
