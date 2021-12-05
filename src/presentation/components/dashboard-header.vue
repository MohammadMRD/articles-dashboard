<template>
  <nav class="navbar navbar-dark bg-dark">
    <div class="container-fluid">
      <!-- Brand -->
      <router-link class="navbar-brand" to="/"> Arvan Challenge </router-link>

      <!-- Welcome -->
      <span class="text-light flex-fill d-none d-sm-block"> Welcome {{ user.username }} </span>

      <!-- Logout -->
      <ad-button outline variant="primary" @click="logout">Logout</ad-button>
    </div>
  </nav>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'dashboard-header',

  setup() {
    const store = useStore()

    const user = computed(() => store.state.userModule.user || {})

    function logout() {
      store.dispatch('userModule/logout')
    }

    return {
      user,
      logout,
    }
  },
})
</script>
