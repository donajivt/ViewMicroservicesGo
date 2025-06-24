import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: {
      id: '62380bd0-d73e-3946-b6f1-aae61cf4632a',
      email: 'donaji@gmail.com',
      name: 'Donaji Vt',
      phoneNumber: '5517542719',
    },
    token: localStorage.getItem('token') || '',
  }),
  getters: {
    isAuthenticated: (state) => !!state.token,
  },
  actions: {
    setUser(userData) {
      this.user = userData.user;
      this.token = userData.token;
      localStorage.setItem('token', userData.token);
    },
    logout() {
      this.user = null;
      this.token = '';
      localStorage.removeItem('token');
    },
  },
});
