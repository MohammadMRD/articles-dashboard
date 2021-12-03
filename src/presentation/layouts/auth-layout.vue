<template>
  <section class="auth-layout">
    <!-- Form Container -->
    <form class="w-100 border-0 bg-200 p-2 rounded">
      <!-- header -->
      <header class="p-3 text-center h1 text-600">
        <slot name="header"></slot>
      </header>

      <!-- Form Body -->
      <main class="p-1 d-flex flex-column">
        <slot></slot>
      </main>

      <!-- Footer -->
      <footer class="p-1">
        <slot name="footer"></slot>
      </footer>
    </form>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'auth-layout',
})
</script>

<style scoped lang="scss">
.auth-layout {
  display: flex;
  height: 100vh;
  align-items: center;
  justify-content: center;

  form {
    max-width: 450px;
    min-width: 300px;
  }
}
</style>
