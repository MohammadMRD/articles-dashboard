<template>
  <ad-page>
    <!-- Title -->
    <template #header>Register</template>

    <!-- Form -->
    <ad-input
      v-model.trim="registerDTO.username"
      :isInvalid="!!registerDTO.errors.username"
      :errorMessage="registerDTO.errors.username"
      id="register-user"
      label="User"
      type="text"
    />
    <ad-input
      v-model.trim="registerDTO.email"
      :isInvalid="!!registerDTO.errors.email"
      :errorMessage="registerDTO.errors.email"
      :rootProps="{ class: 'mt-3' }"
      id="register-email"
      label="Email"
      type="email"
    />
    <ad-input
      v-model.trim="registerDTO.password"
      :isInvalid="!!registerDTO.errors.password"
      :errorMessage="registerDTO.errors.password"
      :rootProps="{ class: 'mt-3' }"
      id="register-password"
      label="Password"
      type="password"
    />
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
      const isValid = await registerDTO.validate()

      if (!isValid) return

      await store.dispatch('userModule/register', registerDTO)

      // TODO: Define enum for routes' name
      router.push({ name: 'articles' })
    }

    return { registerDTO, handleRegister }
  },
})
</script>
