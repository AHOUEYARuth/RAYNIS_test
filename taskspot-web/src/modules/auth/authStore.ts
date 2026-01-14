import { defineStore } from 'pinia'
import type { LoginPayload, RegisterPayload, User } from './authType'
import { authRequest } from './authRequest'
import router from '@/router'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as User | null,
    token: localStorage.getItem('token'),
    loading: false,
    message: null as string | null,
    error: null as string | null,
  }),

  getters: {
    isAuthenticated: (state) => !!state.token,
  },

  actions: {
    clearMessages() {
      this.message = null
      this.error = null
    },
    async login(payload: LoginPayload) {
      try {
        this.loading = true
        this.clearMessages()

        const { data } = await authRequest.login(payload)
        this.token = data.token
        this.user = data.user
        this.message = data.message || 'Connexion réussie'
        localStorage.setItem('token', data.token)
        router.push('/')
      } catch (err: any) {
        this.error = err?.response?.data?.message || 'Une erreur est survenue lors de la connexion'
      } finally {
        this.loading = false
      }
    },

    async register(payload: RegisterPayload) {
      try {
        this.loading = true
        this.clearMessages()
       const {data} = await authRequest.register(payload)
        this.message = data.message || 'Inscription réussie'
        router.push('/auth/login')
      } catch (error: any) {
        this.error = error?.response?.data?.message || "Une erreur est survenue lors de l'incription"
      }finally {
        this.loading = false
      }
    },


    logout() {
      this.user = null
      this.token = null
      localStorage.removeItem('token')
    },
  },
})
