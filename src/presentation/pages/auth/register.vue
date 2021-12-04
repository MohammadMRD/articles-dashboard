<template>
  <ad-page>
    <!-- Title -->
    <template #header>Register</template>

    <!-- Form -->
    <ad-input v-model="registerDTO.username" id="register-user" label="User" type="text" />
    <ad-input v-model="registerDTO.email" id="register-email" label="Email" type="email" />
    <ad-input v-model="registerDTO.password" id="register-password" label="Password" type="password" />
    <ad-button variant="primary" class="mt-3" type="submit" @click.prevent="handleRegister"> Register </ad-button>

    <!-- Footer -->
    <template #footer>
      <span>Already Registered?</span>
      <router-link :to="{ name: 'login' }" class="text-decoration-none text-dark mx-2">
        <strong>Login Now</strong>
      </router-link>
    </template>
  </ad-page>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { RegisterDTO } from '@/core'

export default defineComponent({
  setup() {
    const store = useStore()
    const router = useRouter()
    const registerDTO = reactive(new RegisterDTO('', '', ''))

    async function handleRegister() {
      // TODO: Add validation
      await store.dispatch('userModule/register', registerDTO)

      // TODO: Define enum for routes' name
      router.push({ name: 'articles' })
    }

    return { registerDTO, handleRegister }
  },
})
</script>
