<template>
    <AppFrame />
    <div class="container mt-4">
        <h2 class="mb-4">{{ isEditing ? 'Editar Producto' : 'Agregar Nuevo Producto' }}</h2>
        <form @submit.prevent="submitForm" class="product-form">
            <div class="row">
                <!-- Columna izquierda -->
                <div class="col-md-6">
                    <div class="mb-3">
                        <label for="name" class="form-label">Nombre del Producto</label>
                        <input v-model="product.name" type="text" class="form-control" id="name" required>
                    </div>

                    <div class="mb-3">
                        <label for="price" class="form-label">Precio</label>
                        <input v-model.number="product.price" type="number" step="0.01" class="form-control" id="price"
                            required min="0">
                    </div>

                    <div class="mb-3">
                        <label for="stock" class="form-label">Stock Disponible</label>
                        <input v-model.number="product.stock" type="number" class="form-control" id="stock" required
                            min="0">
                    </div>

                    <div class="mb-3">
                        <label for="category" class="form-label">Categoría</label>
                        <input v-model="product.category_name" type="text" class="form-control" id="category" required>
                        </input>
                    </div>
                </div>

                <!-- Columna derecha -->
                <div class="col-md-6">
                    <div class="mb-3">
                        <label for="description" class="form-label">Descripción</label>
                        <textarea v-model="product.description" class="form-control" id="description" rows="5"
                            required></textarea>
                    </div>

                    <div class="mb-3">
                        <label for="image_url" class="form-label">URL de la Imagen</label>
                        <input v-model="product.image_url" type="url" class="form-control" id="image_url"
                            placeholder="https://ejemplo.com/imagen.jpg">
                    </div>

                    <div class="mb-3">
                        <label for="image_upload" class="form-label">O subir imagen</label>
                        <input type="file" class="form-control" id="image_upload" accept="image/*"
                            @change="handleImageUpload">
                    </div>

                    <div v-if="previewImage || product.image_file" class="image-preview mb-3">
                        <img :src="previewImage || product.image_file" alt="Vista previa" class="img-thumbnail"
                            style="max-height: 200px;">
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
import AppFrame from '../components/AppFrame.vue';

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

const previewImage = ref('');

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
                previewImage.value = product.value.image_local_path || '';
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
        };
        reader.readAsDataURL(file);

        // Guardar archivo para enviar al servidor
        product.value.image_file = file;
        product.value.image_local_path = '';
    }
};

// Enviar formulario
const submitForm = async () => {
    try {
        const formData = new FormData();

        // Agregar campos al FormData
        Object.keys(product.value).forEach(key => {
            if (key !== 'image_file' && product.value[key] !== null) {
                formData.append(key, product.value[key]);
            }
        });

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
                Authorization: "Bearer " + localStorage.getItem("token")
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