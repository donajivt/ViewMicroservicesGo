<template>
  <div class="login-container">
    <h2>Iniciar Sesión</h2>
    <form @submit.prevent="handleLogin" class="login-form">
      <input v-model="email" type="email" placeholder="Email" required />
      <input v-model="password" type="password" placeholder="Contraseña" required />
      <button type="submit" class="primary-btn">Entrar</button>
    </form>

    <button class="secondary-btn" @click="$router.push('/register')">¿No tienes cuenta? Regístrate</button>

    <p v-if="error" class="message error">{{ error }}</p>
  </div>
</template>

<script>
import { login } from '../../services/authService';
export default {
  data() {
    return {
      email: '',
      password: '',
      error: ''
    };
  },
  methods: {
    async handleLogin() {
      try {
        const response = await login({ userName: this.email, password: this.password });
        localStorage.setItem('token', response.data.result.token);
        this.$router.push('/home');
      } catch (err) {
        this.error = 'Credenciales inválidas';
      }
    }
  }
};
</script>