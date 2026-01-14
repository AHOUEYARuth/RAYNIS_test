<script setup lang="ts">
import { reactive } from 'vue'
import { useAuthStore } from '../authStore'

const authStore = useAuthStore()
const form = reactive({
  last_name: '',
  first_name: '',
  email: '',
  password: '',
}) 
const resetForm = () => {
  form.last_name = ''
  form.first_name = ''
  form.email = ''
  form.password = ''
}
const submitForm = async () => {
  await authStore.register(form)
    if (!authStore.error) {
        resetForm()
    }
}
</script>

<template>
  <div class="login-container">
    <div class="hello">
      <h1 style="font-size: 60px">Bienvenue sur TaskSpot</h1>
    </div>
    <div class="form">
      <h2>Inscrivez-vous!</h2>
      <p>Veuillez renseignez vos informations pour créer votre compte TaskSpot</p>
      <form class="login-form" @submit.prevent="submitForm">
      <div v-if="authStore.error" class="alert alert-error">
        {{ authStore.error }}
      </div>

      <div v-if="authStore.message" class="alert alert-success">
        {{ authStore.message }}
      </div>
        <input v-model="form.last_name" type="text" placeholder="Nom" />
        <input v-model="form.first_name" type="text" placeholder="Prénoms" />
        <input v-model="form.email" type="email" placeholder="Email" />
        <input v-model="form.password" type="password" placeholder="Mot de passe" />

        <button :disabled="authStore.loading">
          {{ authStore.loading ? 'Inscription...' : "s'incrire" }}
        </button>
      </form>
    </div>
  </div>
</template>

<style scoped>
.login-container {
  width: 80%;
  height: 55%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.hello {
  width: 55%;
  height: 100%;
  background-color: #00b7b6;
  color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
}
.form {
  background: #ffffff;
  padding: 10px;
  width: 40%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
  text-align: center;
}
.login-form {
  width: 100%;
  /*  height: 80%; */
  /*  max-width: 360px; */
  padding: 2rem;
  background: #ffffff;
  border-radius: 10px;
}

.login-form h2 {
  text-align: center;
  margin-bottom: 1.5rem;
  color: #333;
}

.form-group {
  margin-bottom: 1rem;
}

.login-form input {
  width: 100%;
  padding: 0.75rem;
  font-size: 0.95rem;
  border-radius: 6px;
  border: 1px solid #ddd;
  transition:
    border-color 0.2s,
    box-shadow 0.2s;
  margin-bottom: 0.5rem;
}

.login-form input:focus {
  outline: none;
  border-color: #00b7b6;
  box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.15);
}

.login-form button {
  width: 100%;
  padding: 0.75rem;
  margin-top: 0.5rem;
  border: none;
  border-radius: 6px;
  background: #00b7b6;
  color: white;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
}

.login-form button:hover:not(:disabled) {
  background: #037575;
}

.login-form button:disabled {
  background: #a5b4fc;
  cursor: not-allowed;
}
.alert {
  padding: 0.75rem;
  margin-bottom: 1rem;
  border-radius: 6px;
  font-size: 0.9rem;
}

.alert-error {
  background: #fee2e2;
  color: #991b1b;
}

.alert-success {
  background: #dcfce7;
  color: #166534;
}
</style>
