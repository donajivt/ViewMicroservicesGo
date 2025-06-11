<template>
  <div class="coupon-card">
    <div class="coupon-header">
      <h4 class="coupon-code">{{ coupon.couponCode }}</h4>
      <i class="bi bi-star-fill star-icon"></i>
    </div>
    <div class="coupon-body">
      <p class="coupon-amount">
        {{ coupon.amountType === 'Porcentaje' ? coupon.discountAmount + '%' : '$' + coupon.discountAmount }}
      </p>
      <p v-if="coupon.minAmount" class="coupon-minimum">
        Mínimo: ${{ coupon.minAmount }}
      </p>
      <p class="coupon-validity">
        Válido desde {{ formatDate(coupon.dateInit) }} hasta {{ formatDate(coupon.dateEnd) }}
      </p>
    </div>
  </div>
</template>

<script setup>
defineProps({
  coupon: Object
})

const formatDate = (dateStr) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString('es-MX');
}
</script>