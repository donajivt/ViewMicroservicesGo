<template>
  <div class="card h-100">
    <img :src="product.image_url" class="card-img-top" :alt="product.name" />
    <div class="card-body text-center">
      <h5 class="card-title">{{ product.name }}</h5>
      <p class="card-text">${{ product.price.toFixed(2) }}</p>
      <p class="card-text"><small>Categoría: {{ product.category_name }}</small></p>
      <p class="card-text">{{ product.description }}</p>
      <button class="btn btn-warning mt-3" @click="addToCart">
        <i class="bi bi-cart-plus"></i> Agregar al carrito
      </button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: "ProductCard",
  props: {
    product: Object
  },
  methods: {
    getUserFromToken() {
      const token = localStorage.getItem("token");
      if (!token) return null;
      try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        return {
          userId: payload.sub,
          name: payload.name || "",
          email: payload.email || "",
          phone: payload.phone_number || ""
        };
      } catch (e) {
        console.error("Token inválido", e);
        return null;
      }
    },
    async addToCart() {
      const token = localStorage.getItem("token");
      const user = this.getUserFromToken();
      if (!token || !user) {
        alert("Debes iniciar sesión para agregar productos al carrito.");
        return;
      }
      console.log("🧩 Producto recibido:", this.product);
      const cartDto = {
        cartHeaderDto: {
          userId: user.userId,
          couponCode: "TSHIRT15",
          name: user.name,
          phone: user.phone,
          email: user.email
        },
        cartDetailsDtos: [
          {
            productId: this.product.product_id,
            count: 1
          }
        ]
      };

      try {
        const response = await axios.post(
          "http://localhost:7272/api/cart/CartUpsert",
          cartDto,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        if (response.data.is_success) {
          alert("✅ Producto agregado al carrito");
        } else {
          alert("❌ No se pudo agregar al carrito");
        }
      } catch (error) {
        console.error("Error al agregar al carrito:", error);
        alert("❌ Ocurrió un error al agregar el producto");
      }
    }
  }
};
</script>