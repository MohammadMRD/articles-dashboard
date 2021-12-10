<template>
  <ad-page>
    <!-- Title -->
    <template #header>Login</template>

    <!-- Form -->
    <ad-input
      v-model.trim="loginDTO.email"
      :isInvalid="!!loginDTO.errors.email"
      :errorMessage="loginDTO.errors.email"
      id="login-email"
      label="Email"
      type="email"
    />
    <ad-input
      v-model.trim="loginDTO.password"
      :isInvalid="!!loginDTO.errors.password"
      :errorMessage="loginDTO.errors.password"
      :rootProps="{ class: 'mt-3' }"
      id="login-password"
      label="Password"
      type="password"
    />
    <ad-button variant="primary" class="mt-3" type="submit" @click.prevent="handleLogin"> Login </ad-button>

    <!-- Footer -->
    <template #footer>
      <span>Don't have a account?</span>
      <router-link :to="{ name: 'register' }" class="text-decoration-none text-dark mx-2">
        <strong>Register Now</strong>
      </router-link>
    </template>
  </ad-page>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { LoginDTO } from '@/core'

export default defineComponent({
  setup() {
    const store = useStore()
    const router = useRouter()
    const loginDTO = reactive(new LoginDTO('', ''))

    async function handleLogin() {
      const isValid = await loginDTO.validate()

      if (!isValid) return

      await store.dispatch('userModule/login', loginDTO)

      // TODO: Define enum for routes' name
      router.push({ name: 'articles' })
    }

    return { loginDTO, handleLogin }
  },
})
</script>
