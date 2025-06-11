<template>
  <div class="register-container">
    <h2>Registro</h2>
    <form @submit.prevent="handleRegister" class="register-form">
      <input v-model="email" type="email" placeholder="Email" required />
      <input v-model="name" type="text" placeholder="Nombre" required />
      <input v-model="phoneNumber" type="text" placeholder="Teléfono" />
      <input v-model="password" type="password" placeholder="Contraseña" required />
      <input v-model="role" type="text" placeholder="Rol" />
      <button type="submit" class="primary-btn">Registrarse</button>
    </form>

    <button class="secondary-btn" @click="$router.push('/login')">¿Ya tienes cuenta? Inicia sesión</button>

    <p v-if="message" class="message">{{ message }}</p>
  </div>
</template>

<script>
import { register } from '../../services/authService';
export default {
  data() {
    return {
      email: '',
      name: '',
      phoneNumber: '',
      password: '',
      role: '',
      message: ''
    };
  },
  methods: {
    async handleRegister() {
      try {
        await register({
          email: this.email,
          name: this.name,
          phoneNumber: this.phoneNumber,
          password: this.password,
          role: this.role
        });
        this.message = 'Registro exitoso. Ahora inicia sesión.';
        this.$router.push('/login');
      } catch (err) {
        this.message = 'Error al registrarse.';
      }
    }
  }
};
</script>