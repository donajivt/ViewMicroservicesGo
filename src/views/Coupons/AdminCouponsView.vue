<template>
    <AppFrame />
    <h2 class="mb-4 text-center panel-title pt-3">Panel de Cupones</h2>
    <div class="container admin-panel">
        <div class="admin-controls mb-4">
            <div class="row g-3 align-items-center">
                <div class="col-md-6">
                    <div class="input-group">
                        <input v-model="searchCode" class="form-control search-input"
                            placeholder="Buscar por Codigo..." />
                        <button @click="verDetallesPorCodigo()" class="btn btn-search">
                            <i class="bi bi-search"></i> Buscar
                        </button>
                    </div>
                </div>
                <div class="col-md-6 text-md-end">
                    <button class="btn btn-add" @click="agregarCupon">
                        <i class="bi bi-plus-circle"></i> Agregar Cupón
                    </button>
                </div>
            </div>
        </div>

        <div v-if="cuponDetalle" class="product-detail-container mb-4">
            <div class="card p-3" style="background-color: var(--white);">
                <h5 style="color: var(--green);">{{ cuponDetalle.couponCode }}</h5>
                <p>Monto: {{ cuponDetalle.discountAmount }} ({{ cuponDetalle.amountType }})</p>
                <p>Mínimo: {{ cuponDetalle.minAmount }}</p>
                <p>Categoría: {{ cuponDetalle.category }}</p>
                <p>Vigencia: {{ formatDate(cuponDetalle.dateInit) }} - {{ formatDate(cuponDetalle.dateEnd) }}</p>
                <p>Usos: {{ cuponDetalle.limitUse }}</p>
                <p>Estado: <span
                        :class="{ 'text-success': cuponDetalle.stateCoupon, 'text-danger': !cuponDetalle.stateCoupon }">
                        {{ cuponDetalle.stateCoupon ? 'Activo' : 'Inactivo' }}
                    </span></p>
            </div>
        </div>

        <div class="table-responsive">
            <table class="table table-hover admin-table">
                <thead>
                    <tr>
                        <th class="text-center">Código</th>
                        <th class="text-center">Descuento</th>
                        <th class="text-center">Vigencia</th>
                        <th class="text-center">Last Update</th>
                        <th class="text-center">Estado</th>
                        <th class="text-end">Acciones</th>
                    </tr>
                </thead>
                <tbody class="text-center">
                    <tr v-for="cupon in paginatedCoupons" :key="cupon.couponId">
                        <td>{{ cupon.couponCode }}</td>
                        <td>{{ cupon.discountAmount }} {{ cupon.amountType === 'Porcentaje' ? '%' : '$' }}</td>
                        <td>{{ formatDate(cupon.dateInit) }} - {{ formatDate(cupon.dateEnd) }}</td>
                        <td>{{ formatDate(cupon.lastUpdated) }}</td>
                        <td>
                            <span :class="cupon.stateCoupon ? 'text-success' : 'text-danger'">
                                {{ cupon.stateCoupon ? 'Activo' : 'Inactivo' }}
                            </span>
                        </td>
                        <td class="text-end">
                            <button class="btn btn-sm btn-action me-2" @click="verDetalles(cupon.couponId)">
                                <i class="bi bi-eye"></i>
                            </button>
                            <button class="btn btn-sm btn-action me-2" @click="editarCupon(cupon.couponId)">
                                <i class="bi bi-pencil"></i>
                            </button>
                            <button class="btn btn-sm btn-action btn-danger" @click="eliminarCupon(cupon.couponId)">
                                <i class="bi bi-trash"></i>
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <nav v-if="totalPages > 1" class="mt-4">
            <ul class="pagination justify-content-center">
                <li class="page-item" :class="{ disabled: currentPage === 1 }">
                    <button class="page-link" @click="prevPage">&laquo;</button>
                </li>
                <li class="page-item" v-for="page in totalPages" :key="page" :class="{ active: currentPage === page }">
                    <button class="page-link" @click="goToPage(page)">{{ page }}</button>
                </li>
                <li class="page-item" :class="{ disabled: currentPage === totalPages }">
                    <button class="page-link" @click="nextPage">&raquo;</button>
                </li>
            </ul>
        </nav>

        <div class="row mt-3">
            <div class="col-md-6">
                <div class="showing-entries">
                    Mostrando {{ startItem }}-{{ endItem }} de {{ cupones.length }} cupones
                </div>
            </div>
            <div class="col-md-6 text-md-end">
                <select v-model="itemsPerPage" class="form-select items-per-page" @change="resetPagination">
                    <option value="5">5 por página</option>
                    <option value="10">10 por página</option>
                    <option value="20">20 por página</option>
                    <option value="50">50 por página</option>
                </select>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import AppFrame from '../../components/AppFrame.vue';
import { useRouter } from 'vue-router';

const cupones = ref([]);
const cuponDetalle = ref(null);
const searchCode = ref("");
const router = useRouter();

// Variables de paginación
const currentPage = ref(1);
const itemsPerPage = ref(5);

// Computed properties para paginación
const totalPages = computed(() => Math.ceil(cupones.value.length / itemsPerPage.value));
const paginatedCoupons = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage.value;
    const end = start + itemsPerPage.value;
    return cupones.value.slice(start, end);
});
const startItem = computed(() => (currentPage.value - 1) * itemsPerPage.value + 1);
const endItem = computed(() => {
    const end = currentPage.value * itemsPerPage.value;
    return end > cupones.value.length ? cupones.value.length : end;
});

// Métodos de paginación
const nextPage = () => {
    if (currentPage.value < totalPages.value) {
        currentPage.value++;
    }
};

const prevPage = () => {
    if (currentPage.value > 1) {
        currentPage.value--;
    }
};

const goToPage = (page) => {
    currentPage.value = page;
};

const resetPagination = () => {
    currentPage.value = 1;
};

// Métodos específicos para cupones
const fetchCoupons = async () => {
    try {
        const res = await fetch("http://localhost:7777/api/coupons/", {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token")
            }
        });
        const data = await res.json();
        if (data.is_success) {
            cupones.value = data.result;
            resetPagination();
        }
    } catch (err) {
        console.error(err);
    }
};

const verDetalles = async (id) => {
    const res = await fetch(`http://localhost:7777/api/coupons/${id}`, {
        headers: {
            Authorization: "Bearer " + localStorage.getItem("token")
        }
    });
    const data = await res.json();
    cuponDetalle.value = data.result;
};

const verDetallesPorCodigo = async () => {
    if (searchCode.value.trim()) {
        try {
            const res = await fetch(`http://localhost:7777/api/coupons/code/${searchCode.value.trim()}`, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token")
                }
            });
            const data = await res.json();
            if (data.is_success) {
                cuponDetalle.value = data.result;
            } else {
                alert("Cupón no encontrado");
            }
        } catch (err) {
            console.error(err);
            alert("Error al buscar el cupón");
        }
    }
};

const eliminarCupon = async (id) => {
    if (confirm("¿Estás seguro de eliminar este cupón?")) {
        const res = await fetch(`http://localhost:7777/api/coupons/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token")
            }
        });
        const data = await res.json();
        if (data.is_success) {
            alert("Cupón eliminado correctamente");
            fetchCoupons();
            cuponDetalle.value = null;
        } else {
            alert("Error al eliminar el cupón");
        }
    }
};

const editarCupon = (id) => {
    router.push(`/coupons/edit/${id}`);
};

const agregarCupon = () => {
    router.push(`/coupons/add`);
};

const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    });
};

onMounted(() => {
    const token = localStorage.getItem("token");
    if (!token) {
        alert("Acceso denegado");
        router.push("/");
        return;
    }

    const role = JSON.parse(atob(token.split('.')[1])).role;
    if (role !== "ADMINISTRATOR" && role !== "SUPER ADMINISTRATOR") {
        alert("Acceso restringido");
        router.push("/home");
    } else {
        fetchCoupons();
    }
});
</script>
