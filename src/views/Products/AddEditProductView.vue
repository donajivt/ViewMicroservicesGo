<template>
  <AppFrame />
  <div class="container mt-4">
    <h2 class="mb-4">{{ isEditing ? 'Editar Producto' : 'Agregar Nuevo Producto' }}</h2>
    <form @submit.prevent="submitForm" class="product-form" enctype="multipart/form-data">
      <div class="row">
        <!-- Columna izquierda -->
        <div class="col-md-6">
          <div class="mb-3">
            <label for="name" class="form-label">Nombre del Producto</label>
            <input v-model="product.name" type="text" class="form-control" id="name" required>
          </div>

          <div class="mb-3">
            <label for="price" class="form-label">Precio</label>
            <input v-model.number="product.price" type="number" step="0.01" class="form-control" id="price" required min="0">
          </div>

          <div class="mb-3">
            <label for="stock" class="form-label">Stock Disponible</label>
            <input v-model.number="product.stock" type="number" class="form-control" id="stock" required min="0">
          </div>

          <div class="mb-3">
            <label for="category" class="form-label">Categoría</label>
            <input v-model="product.category_name" type="text" class="form-control" id="category" required>
          </div>
        </div>

        <!-- Columna derecha -->
        <div class="col-md-6">
          <div class="mb-3">
            <label for="description" class="form-label">Descripción</label>
            <textarea v-model="product.description" class="form-control" id="description" rows="5" required></textarea>
          </div>

          <div class="mb-3">
            <label for="image_url" class="form-label">URL de la Imagen (externo)</label>
            <input v-model="product.image_url" type="url" class="form-control" id="image_url" placeholder="https://ejemplo.com/imagen.jpg">
          </div>

          <div class="mb-3">
            <label for="image_upload" class="form-label">O subir imagen al servidor</label>
            <input type="file" class="form-control" id="image_upload" accept="image/*" @change="handleImageUpload">
          </div>

          <div v-if="showImagePreview" class="image-preview mb-3">
            <img :src="imagePreviewSource" alt="Vista previa" class="img-thumbnail" style="max-height: 200px;">
            <div class="mt-2 text-muted">
              <small v-if="usingLocalImage">Imagen local (se subirá al servidor)</small>
              <small v-else-if="product.image_url">Imagen externa (URL)</small>
              <small v-else-if="product.image_local_path">Imagen del servidor</small>
            </div>
          </div>
        </div>
      </div>

      <div class="d-flex justify-content-between mt-4">
        <router-link to="/products" class="btn btn-secondary">
          <i class="bi bi-arrow-left"></i> Cancelar
        </router-link>

        <button type="submit" class="btn btn-add">
          <i class="bi" :class="isEditing ? 'bi-check-circle' : 'bi-plus-circle'"></i>
          {{ isEditing ? 'Actualizar Producto' : 'Agregar Producto' }}
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

// Determinar si estamos en modo edición
const isEditing = computed(() => route.meta.isEdit || route.params.id);

// Estado del producto
const product = ref({
  name: '',
  price: 0,
  description: '',
  category_name: '',
  image_url: '',
  image_local_path: '',
  stock: 0
});

const previewImage = ref(null);
const usingLocalImage = ref(false);

// Computed properties para manejo de imágenes
const showImagePreview = computed(() => {
  return previewImage.value || product.value.image_url || product.value.image_local_path;
});

const imagePreviewSource = computed(() => {
  if (previewImage.value) return previewImage.value;
  if (product.value.image_url) return product.value.image_url;
  if (product.value.image_local_path) return `http://localhost:2222${product.value.image_local_path}`;
  return '';
});

// Cargar producto si estamos editando
onMounted(async () => {
  if (isEditing.value) {
    try {
      const response = await fetch(`http://localhost:2222/api/products/${route.params.id}`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token")
        }
      });
      const data = await response.json();
      if (data.is_success) {
        product.value = data.result;
      }
    } catch (error) {
      console.error('Error al cargar el producto:', error);
    }
  }
});

// Manejar subida de imagen
const handleImageUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    // Mostrar vista previa
    const reader = new FileReader();
    reader.onload = (e) => {
      previewImage.value = e.target.result;
      usingLocalImage.value = true;
    };
    reader.readAsDataURL(file);

    // Guardar archivo para enviar al servidor
    product.value.image_file = file;
  }
};

// Enviar formulario
const submitForm = async () => {
  try {
    const formData = new FormData();

    // Agregar campos al FormData
    formData.append('name', product.value.name);
    formData.append('price', product.value.price);
    formData.append('description', product.value.description);
    formData.append('category_name', product.value.category_name);
    formData.append('stock', product.value.stock);
    
    // Mantener la URL de imagen si existe y no se subió archivo
    if (product.value.image_url && !product.value.image_file) {
      formData.append('image_url', product.value.image_url);
    }
    
    // Agregar archivo de imagen si existe
    if (product.value.image_file) {
      formData.append('image', product.value.image_file);
    }

    const url = isEditing.value
      ? `http://localhost:2222/api/products/${route.params.id}`
      : 'http://localhost:2222/api/products/';

    const method = isEditing.value ? 'PUT' : 'POST';

    const response = await fetch(url, {
      method,
      headers: {
        'Authorization': "Bearer " + localStorage.getItem("token")
      },
      body: formData
    });

    const data = await response.json();

    if (data.is_success) {
      router.push('/products');
    } else {
      alert(data.message || 'Error al guardar el producto');
    }
  } catch (error) {
    console.error('Error:', error);
    alert('Ocurrió un error al procesar la solicitud');
  }
};
</script>