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
import { register } from '../services/authService';
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
      } catch (err) {
        this.message = 'Error al registrarse.';
      }
    }
  }
};
</script>

<style scoped>
.register-container {
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

.register-container:hover {
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

.register-form {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.register-form input {
  width: 100%;
  padding: 12px 15px;
  border: 2px solid #ddd;
  border-radius: 8px;
  font-size: 16px;
  outline: none;
  transition: border-color 0.3s ease;
  box-sizing: border-box;
}

.register-form input:focus {
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
  color: #4a90e2;
}

.message.error {
  color: #e74c3c;
}
</style>