<template>
  <AppFrame />
  <div class="min-vh-100 my-2 background">
    <div class="container mt-4">
      <h2>¡Carrito VDVT ♡</h2>
      
      <div v-if="loading" class="text-center">
        <div class="spinner-border text-yellow" role="status">
          <span class="visually-hidden">Cargando...</span>
        </div>
        <p class="text-white mt-2">Cargando tu carrito de compras...</p>
      </div>
      
      <div v-else>
        <div v-if="!cart || cart.cartDetailsDtos.length === 0" class="text-center text-white py-5">
          <i class="bi bi-cart-x display-4 text-yellow"></i>
          <h4 class="mt-3">Tu carrito está vacío</h4>
          <p class="text-muted">Agrega productos para comenzar a comprar</p>
          <RouterLink to="/home" class="btn btn-yellow mt-3">
            <i class="bi bi-arrow-left"></i> Ver productos
          </RouterLink>
        </div>

        <div v-else>
          <div class="row g-4">
            <div v-for="item in cart.cartDetailsDtos" :key="item.cartDetailsId" class="col-md-6 col-lg-4">
              <div class="h-100 card border-yellow">
                <img :src="item.productDto?.image_url || 'https://via.placeholder.com/200x200?text=Sin+Imagen'" class="card-img-top">
                <div class="card-body">
                  <h5 class="card-title text-center">{{ item.productDto.name }}</h5>
                  <p class="card-text">{{ item.productDto.description }}</p>
                  
                  <div class="d-flex justify-content-between align-items-center mt-3">
                    <div>
                      <p class="mb-1 text-white">Precio: <span class="card-text">${{ item.productDto.price.toFixed(2) }}</span></p>
                      <p class="mb-0 text-white">Cantidad: <span class="card-text">{{ item.count }}</span></p>
                    </div>
                    <button @click="removeFromCart(item.cartDetailsId)" class="btn btn-sm btn-danger">
                      <i class="bi bi-trash"></i> Eliminar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="summary-container bg-dark text-white p-4 mt-5 rounded border-yellow">
            <h4 class="text-yellow mb-4">Resumen del Pedido</h4>
            
            <div class="d-flex justify-content-between mb-2">
              <span>Subtotal:</span>
              <span>${{ cart.cartHeaderDto.cartTotal.toFixed(2) }}</span>
            </div>
            
            <div v-if="cart.cartHeaderDto.discount > 0" class="d-flex justify-content-between mb-2 text-green">
              <span>Descuento ({{ cart.cartHeaderDto.couponCode }}):</span>
              <span>-${{ cart.cartHeaderDto.discount.toFixed(2) }}</span>
            </div>
            
            <div class="d-flex justify-content-between mt-3 pt-3 border-top border-secondary">
              <strong>Total:</strong>
              <strong class="text-yellow">${{ (cart.cartHeaderDto.cartTotal - cart.cartHeaderDto.discount).toFixed(2) }}</strong>
            </div>
            
            <div class="d-grid gap-2 mt-4">
              <button class="btn btn-yellow btn-lg" @click="checkout">
                <i class="bi bi-bag-check"></i> Proceder al Pago
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import AppFrame from '../../components/AppFrame.vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const cart = ref(null);
const loading = ref(true);

function getUserIdFromToken() {
  const token = localStorage.getItem('token');
  if (!token) return null;

  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    console.log('✅ ID extraído del token:', payload.sub);
    return payload.sub;
  } catch (error) {
    console.error('Token inválido', error);
    return null;
  }
}

async function fetchCart() {
  const token = localStorage.getItem('token');
  const userId = getUserIdFromToken();
  if (!userId || !token) return;

  try {
    loading.value = true;
    const response = await axios.get(
      `http://localhost:7272/api/cart/GetCart/${userId}`,
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    );

    if (response.data.is_success) {
      const cartData = response.data.result;

      // 🔁 Obtener los productos uno por uno
      const enrichedDetails = await Promise.all(
        cartData.cartDetailsDtos.map(async (detail) => {
          try {
            const productRes = await axios.get(
              `http://localhost:2222/api/products/${detail.productId}`,
              {
                headers: { Authorization: `Bearer ${token}` }
              }
            );

            return {
              ...detail,
              productDto: productRes.data.result // o response.data, depende de tu API
            };
          } catch (e) {
            console.error(`❌ Error al obtener producto ${detail.productId}:`, e);
            return {
              ...detail,
              productDto: {
                name: 'Producto no encontrado',
                description: '',
                price: 0,
                image_url: ''
              }
            };
          }
        })
      );

      cart.value = {
        ...cartData,
        cartDetailsDtos: enrichedDetails
      };

      console.log('🛒 Carrito enriquecido:', cart.value);
    }
  } catch (err) {
    console.error('❌ Error al obtener el carrito:', err);
  } finally {
    loading.value = false;
  }
}

async function removeFromCart(cartDetailsId) {
  if (!confirm('¿Estás seguro de eliminar este producto del carrito?')) return;
  
  const token = localStorage.getItem('token');
  try {
    const response = await axios.post(
      'http://localhost:7272/api/cart/RemoveCart',
      { cartDetailsId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.data.is_success) {
      await fetchCart();
    }
  } catch (err) {
    console.error('Error al quitar producto:', err);
    alert('Ocurrió un error al eliminar el producto');
  }
}

function checkout() {
  router.push('/checkout');
}

onMounted(() => {
  fetchCart();
});
</script>