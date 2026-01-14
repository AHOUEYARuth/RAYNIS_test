<script setup lang="ts">
import { ref } from 'vue'

// état du mot de passe
const password = ref('')
const showPassword = ref(false)

// fonction pour basculer l'affichage
const togglePassword = () => {
  showPassword.value = !showPassword.value
}
</script>

<template>
  <div class="password-input" style="position: relative; width: 250px;">
    <input
      :type="showPassword ? 'text' : 'password'"
      v-model="password"
      placeholder="Mot de passe"
      style="width: 100%; padding-right: 30px;"
    />

    <!-- icône oeil -->
    <span 
      @click="togglePassword"
      style="position: absolute; right: 10px; top: 50%; transform: translateY(-50%); cursor: pointer;"
    >
      <template v-if="showPassword">
        👁️ <!-- oeil ouvert -->
      </template>
      <template v-else>
        🙈 <!-- oeil fermé -->
      </template>
    </span>
  </div>
</template>
