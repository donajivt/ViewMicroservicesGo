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
import { login } from '../services/authService';
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

<style scoped>
.login-container {
  max-width: 400px;
  margin: 50px auto;
  background: #ffffff;
  padding: 30px 40px;
  border-radius: 15px;
  box-shadow: 0 8px 20px rgba(0,0,0,0.1);
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: #333;
  transition: box-shadow 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.login-container:hover {
  box-shadow: 0 12px 30px rgba(0,0,0,0.15);
}

h2 {
  text-align: center;
  margin-bottom: 25px;
  font-weight: 700;
  color: #4a90e2;
  letter-spacing: 1.2px;
  width: 100%;
}

.login-form {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.login-form input {
  width: 100%;
  padding: 12px 15px;
  border: 2px solid #ddd;
  border-radius: 8px;
  font-size: 16px;
  outline: none;
  transition: border-color 0.3s ease;
  box-sizing: border-box;
}

.login-form input:focus {
  border-color: #4a90e2;
  box-shadow: 0 0 8px rgba(74, 144, 226, 0.4);
}

.primary-btn, .secondary-btn {
  width: 100%;
  padding: 12px 0;
  border-radius: 8px;
  font-weight: 600;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-sizing: border-box;
}

.primary-btn {
  background: linear-gradient(135deg, #4a90e2, #357ABD);
  border: none;
  color: white;
  box-shadow: 0 4px 15px rgba(74, 144, 226, 0.4);
}

.primary-btn:hover {
  background: linear-gradient(135deg, #357ABD, #2a5d99);
  box-shadow: 0 6px 20px rgba(53, 122, 189, 0.6);
}

.secondary-btn {
  margin-top: 15px;
  background: transparent;
  border: 2px solid #4a90e2;
  color: #4a90e2;
}

.secondary-btn:hover {
  background-color: #4a90e2;
  color: white;
}

.message {
  margin-top: 15px;
  text-align: center;
  font-weight: 600;
  min-height: 24px;
  width: 100%;
}

.message.error {
  color: #e74c3c;
}
</style>