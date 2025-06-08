<template>
  <div class="card h-100">
    <img :src="product.image_url" class="card-img-top" :alt="product.name" />
    <div class="card-body text-center">
      <h5 class="card-title">{{ product.name }}</h5>
      <p class="card-text">${{ product.price.toFixed(2) }}</p>
      <p class="card-text"><small>Categoría: {{ product.category_name }}</small></p>
      <p class="card-text">{{ product.description }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProductCard",
  props: {
    product: Object
  }
};
</script>
