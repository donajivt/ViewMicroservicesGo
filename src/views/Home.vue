<template>
    <div class="vdvt-app">
        <!-- Navbar -->
        <nav class="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
            <div class="container">
                <RouterLink class="navbar-brand fw-bold fs-3 text-green" to="/">
                    VDVT ♡
                </RouterLink>
                <div>
                    <RouterLink to="/login" class="btn btn-yellow rounded-pill px-4 fw-medium">
                        Iniciar Sesión
                    </RouterLink>
                    <RouterLink to="/register" class="btn btn-yellow rounded-pill px-4 ms-3 fw-medium">
                        Registrate
                    </RouterLink>
                </div>
            </div>
        </nav>

        <section class="hero-section background pt-3">
            <div class="container py-5">
                <div class="row align-items-center">
                    <div class="col-lg-6 mb-5 mb-lg-0">
                        <h1 class="display-4 fw-bold mb-4 text-white">
                            Bienvenido a <span class="text-green">VDVT ♡</span>
                        </h1>
                        <p class="lead mb-4 text-white">
                            La tienda online exclusiva donde encontrarás ropa y accesorios usados o inspirados en tus
                            celebridades favoritas. Vive la experiencia de vestir como una estrella.
                        </p>
                        <RouterLink to="/login" class="btn btn-yellow btn-lg rounded-pill px-4 fw-medium">
                            Comienza tu experiencia
                        </RouterLink>
                    </div>
                    <div class="col-lg-6">
                        <!-- Carrusel Bootstrap -->
                        <div id="celebrityCarousel" class="carousel slide shadow-lg rounded-4" data-bs-ride="carousel">
                            <div class="carousel-inner rounded-4">
                                <div class="carousel-item active" data-bs-interval="3000">
                                    <img src="https://i.etsystatic.com/53668288/r/il/a0eee8/6181107621/il_fullxfull.6181107621_m031.jpg"
                                        class="d-block w-100" alt="Moda de celebridades">
                                </div>
                                <div class="carousel-item" data-bs-interval="3000">
                                    <img src="https://cdn.printerval.com/unsafe/960x960/assets.printerval.com/2023/04/10/6433c64f2e9bc0.49750091.jpg"
                                        class="d-block w-100" alt="Moda de celebridades">
                                </div>
                                <div class="carousel-item" data-bs-interval="3000">
                                    <img src="https://www.merchoficial.com/wp-content/uploads/2020/10/1-46-800x800.jpg"
                                        class="d-block w-100" alt="Moda de celebridades">
                                </div>
                                <!-- Continúa con las demás imágenes -->
                                <div class="carousel-item" data-bs-interval="3000">
                                    <img src="https://ih1.redbubble.net/image.4415416337.1903/ssrco,essential_tee,mens_01,101010:01c5ca27c6,front,product_square,x600.jpg"
                                        class="d-block w-100" alt="Moda de celebridades">
                                </div>
                                <div class="carousel-item" data-bs-interval="3000">
                                    <img src="https://richvagosent.com/wp-content/uploads/2023/02/famous-01.png"
                                        class="d-block w-100" alt="Moda de celebridades">
                                </div>
                                <div class="carousel-item" data-bs-interval="3000">
                                    <img src="https://m.media-amazon.com/images/I/71Eug7zFPoL._AC_UY1000_.jpg"
                                        class="d-block w-100" alt="Moda de celebridades">
                                </div>
                                <div class="carousel-item" data-bs-interval="3000">
                                    <img src="https://http2.mlstatic.com/D_NQ_NP_936903-MLM77842320773_072024-O-playera-rels-b-collage-a-new-star-artista-merch.webp"
                                        class="d-block w-100" alt="Moda de celebridades">
                                </div>
                                <div class="carousel-item" data-bs-interval="3000">
                                    <img src="https://http2.mlstatic.com/D_NQ_NP_706271-MLM77842270425_072024-O-playera-post-malone-merch-collage-artista-circles.webp"
                                        class="d-block w-100" alt="Moda de celebridades">
                                </div>
                                <div class="carousel-item" data-bs-interval="3000">
                                    <img src="https://st1.uvnimg.com/87/22/8359f273436fb36efb8b9f6b24de/jbalvinmerch-128930860-504666407134048-8206572315463741584-n.jpg"
                                        class="d-block w-100" alt="Moda de celebridades">
                                </div>
                                <div class="carousel-item" data-bs-interval="3000">
                                    <img src="https://i.etsystatic.com/16557612/r/il/853750/5114962517/il_570xN.5114962517_81vw.jpg"
                                        class="d-block w-100" alt="Moda de celebridades">
                                </div>
                            </div>
                            <!-- Controles del carrusel -->
                            <button class="carousel-control-prev" type="button" data-bs-target="#celebrityCarousel"
                                data-bs-slide="prev">
                                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                <span class="visually-hidden">Previous</span>
                            </button>
                            <button class="carousel-control-next" type="button" data-bs-target="#celebrityCarousel"
                                data-bs-slide="next">
                                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                                <span class="visually-hidden">Next</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Features Section -->
        <section class="pb-1">
            <div class="container py-5">
                <div class="row g-4">
                    <div class="col-md-4">
                        <div class="card h-100 border-0 shadow-sm">
                            <div class="card-body text-center p-4">
                                <div class="icon-circle bg-yellow-light mb-3 mx-auto">
                                    <i class="bi bi-star-fill text-black"></i>
                                </div>
                                <h3 class="h5 fw-bold text-white">Estilo de Celebridad</h3>
                                <p class="mb-0">Viste como tus ídolos con piezas auténticas o inspiradas en ellos.</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="card h-100 border-0 shadow-sm">
                            <div class="card-body text-center p-4">
                                <div class="icon-circle bg-yellow-light mb-3 mx-auto">
                                    <i class="bi bi-arrow-repeat text-black"></i>
                                </div>
                                <h3 class="h5 fw-bold text-white">Moda Sostenible</h3>
                                <p class="mb-0">Promovemos la reutilización de prendas para un mundo más sostenible.</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="card h-100 border-0 shadow-sm">
                            <div class="card-body text-center p-4">
                                <div class="icon-circle bg-yellow-light mb-3 mx-auto">
                                    <i class="bi bi-heart-fill text-black"></i>
                                </div>
                                <h3 class="h5 fw-bold text-white">Comunidad Exclusiva</h3>
                                <p class="mb-0">Únete a una comunidad que comparte tu pasión por la moda de
                                    celebridades.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Footer -->
        <footer class="bg-black text-black py-4">
            <div class="container">
                <div class="row align-items-center">
                    <div class="col-md-6 mb-3 mb-md-0">
                        <p class="mb-0 text-green"><span><strong>© 2025 VDVT ♡. </strong>Todos los derechos reservados.</span></p>
                    </div>
                    <div class="col-md-6 text-md-end">
                        <a href="https://www.instagram.com/donajivt?igsh=MXdrbXhhaHk3OXphcw=="
                            class="text-black me-3"><i class="bi bi-instagram"></i></a>
                        <a href="https://www.facebook.com/share/1AmQZKw7kk/" class="text-black me-3"><i
                                class="bi bi-facebook"></i></a>
                        <a href="https://www.tiktok.com/@donajivt?_t=ZS-8x7QO95p7gm&_r=1" class="text-black"><i
                                class="bi bi-tiktok"></i></a>
                    </div>
                </div>
            </div>
        </footer>
    </div>
</template>

<script>
export default {
    name: 'HomeView'
}
</script>

<style scoped>
/* Estilos personalizados */
.vdvt-app {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    background-color: var(--black);
}

.background {
    background-color: var(--black);
}

.hero-section {
    flex: 1;
}

.bg-black {
    background-color: var(--white) !important;
}

.bg-yellow {
    background-color: var(--yellow) !important;
}

.bg-yellow-light {
    background-color: var(--yellow-light) !important;
}

.text-green {
    color: var(--green) !important;
}

.btn-yellow {
    background-color: var(--yellow);
    color: var(--black);
    border: none;
}

.btn-yellow:hover {
    background-color: var(--green);
    color: var(--white);
}

.btn-green {
    background-color: var(--green);
    color: var(--white);
    border: none;
}

.btn-green:hover {
    background-color: #1e5f3b;
    color: var(--white);
}

.icon-circle {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
}

.card {
    transition: transform 0.3s ease;
}

.card:hover {
    transform: translateY(-5px);
}

/* Estilos responsivos */
@media (max-width: 768px) {
    .hero-section {
        text-align: center;
    }

    .hero-section img {
        margin-top: 2rem;
    }
}

.carousel {
    max-height: 500px;
    overflow: hidden;
}

.carousel-inner {
    height: 100%;
}

.carousel-item {
    height: 100%;
}

.carousel-item img {
    object-fit: cover;
    height: 100%;
    width: 100%;
}

.carousel-control-prev,
.carousel-control-next {
    background-color: rgba(0, 0, 0, 0.2);
    width: 40px;
    height: 40px;
    border-radius: 50%;
    top: 50%;
    transform: translateY(-50%);
    opacity: 0.8;
}

.carousel-control-prev:hover,
.carousel-control-next:hover {
    background-color: rgba(0, 0, 0, 0.4);
}

@media (max-width: 768px) {
    .carousel {
        max-height: 300px;
    }
}
</style>