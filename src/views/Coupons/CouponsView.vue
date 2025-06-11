<template>
  <AppFrame />
  <div class="container mt-2">
    <h2>Cupones Disponibles</h2>

    <div class="row g-4">
      <div class="col-md-4" v-for="coupon in coupons" :key="coupon.coupon_id">
        <CouponCard :coupon="coupon" />
      </div>
    </div>

    <div v-if="coupons.length === 0" class="text-center mt-4">
      <p>No hay cupones disponibles en este momento.</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import AppFrame from '../../components/AppFrame.vue'
import CouponCard from '../../components/CouponCard.vue'

const coupons = ref([])
const loading = ref(true)
const error = ref(null)

const activeCoupons = computed(() => {
  return coupons.value.filter(c => c.stateCoupon === true)
})

const fetchCoupons = async () => {
  try {
    loading.value = true
    error.value = null
    const token = localStorage.getItem('token')
    
    if (!token) {
      throw new Error('No se encontró token de autenticación')
    }

    const res = await fetch('http://localhost:7777/api/coupons/', {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })

    if (!res.ok) {
      if (res.status === 401) {
        throw new Error('No autorizado: por favor inicia sesión nuevamente')
      }
      throw new Error(`Error ${res.status}: ${res.statusText}`)
    }

    const data = await res.json()
    
    if (data.is_success) {
      coupons.value = data.result
    } else {
      throw new Error(data.message || 'Error al obtener cupones')
    }
  } catch (err) {
    console.error('Error al obtener cupones:', err)
    error.value = err.message
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchCoupons()
})
</script>