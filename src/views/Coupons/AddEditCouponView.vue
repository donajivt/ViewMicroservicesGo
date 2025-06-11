<template>
  <AppFrame />
  <div class="container mt-4">
    <h2 class="mb-4">{{ isEdit ? 'Editar Cupón' : 'Agregar Nuevo Cupón' }}</h2>
    <form @submit.prevent="submitForm" class="coupon-form">
      <div class="row" >
        <!-- Columna izquierda -->
        <div class="col-md-6">
          <div class="mb-3">
            <label for="couponCode" class="form-label">Código del Cupón</label>
            <input v-model="coupon.couponCode" type="text" class="form-control" id="couponCode" required />
          </div>

          <div class="mb-3">
            <label for="discountAmount" class="form-label">Monto de Descuento</label>
            <input v-model.number="coupon.discountAmount" type="number" class="form-control" id="discountAmount" required min="0" />
          </div>

          <div class="mb-3">
            <label for="minAmount" class="form-label">Monto Mínimo</label>
            <input v-model.number="coupon.minAmount" type="number" class="form-control" id="minAmount" min="0" />
          </div>

          <div class="mb-3">
            <label for="amountType" class="form-label">Tipo de Descuento</label>
            <select v-model="coupon.amountType" class="form-select" id="amountType">
              <option value="PERCENTAGE">Porcentaje</option>
              <option value="FIXED">Fijo</option>
            </select>
          </div>
        </div>

        <!-- Columna derecha -->
        <div class="col-md-6">
          <div class="mb-3">
            <label for="limitUse" class="form-label">Límite de Uso</label>
            <input v-model.number="coupon.limitUse" type="number" class="form-control" id="limitUse" min="1" />
          </div>

          <div class="mb-3">
            <label for="category" class="form-label">Categoría</label>
            <input v-model="coupon.category" type="text" class="form-control" id="category" />
          </div>

          <div class="mb-3">
            <label for="dateInit" class="form-label">Fecha de Inicio</label>
            <input v-model="coupon.dateInit" type="date" class="form-control" id="dateInit" required />
          </div>

          <div class="mb-3">
            <label for="dateEnd" class="form-label">Fecha de Fin</label>
            <input v-model="coupon.dateEnd" type="date" class="form-control" id="dateEnd" required />
          </div>

          <div class="form-check mb-3">
            <input v-model="coupon.stateCoupon" class="form-check-input" type="checkbox" id="stateCoupon" />
            <label class="form-check-label" for="stateCoupon">
              Activo
            </label>
          </div>
        </div>
      </div>

      <div class="d-flex justify-content-between mt-4">
        <router-link to="/coupons" class="btn btn-secondary">
          <i class="bi bi-arrow-left"></i> Cancelar
        </router-link>

        <button type="submit" class="btn btn-add">
          <i class="bi" :class="isEdit ? 'bi-check-circle' : 'bi-plus-circle'"></i>
          {{ isEdit ? 'Actualizar Cupón' : 'Agregar Cupón' }}
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import AppFrame from '../../components/AppFrame.vue';

const route = useRoute();
const router = useRouter();

const isEdit = computed(() => !!route.meta.isEdit || !!route.params.id);

const coupon = ref({
  couponCode: '',
  discountAmount: 0,
  minAmount: 0,
  amountType: 'Porcentaje',
  limitUse: 1,
  dateInit: '',
  dateEnd: '',
  category: '',
  stateCoupon: true
});

onMounted(async () => {
  if (isEditing.value) {
    try {
      const response = await fetch(`http://localhost:2222/api/coupons/${route.params.id}`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token")
        }
      });
      const data = await response.json();
      if (data.is_success) {
        coupon.value = data.result;
      }
    } catch (error) {
      console.error('Error al cargar el cupón:', error);
    }
  }
});

const submitForm = async () => {
  try {
    const payload = { ...coupon.value };
    const url = isEdit.value
      ? `http://localhost:2222/api/coupons/${route.params.id}`
      : 'http://localhost:2222/api/coupons/';
    const method = isEditing.value ? 'PUT' : 'POST';

    const response = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': "Bearer " + localStorage.getItem("token")
      },
      body: JSON.stringify(payload)
    });

    const data = await response.json();
    if (data.is_success) {
      router.push('/coupons');
    } else {
      alert(data.message || 'Error al guardar el cupón');
    }
  } catch (error) {
    console.error('Error:', error);
    alert('Ocurrió un error al procesar la solicitud');
  }
};
</script>
