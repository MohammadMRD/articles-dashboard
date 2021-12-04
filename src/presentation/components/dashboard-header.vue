<template>
  <nav class="navbar navbar-dark bg-dark">
    <div class="container-fluid">
      <!-- Brand -->
      <router-link class="navbar-brand" to="/"> Arvan Challenge </router-link>

      <!-- Welcome -->
      <span class="text-light flex-fill d-none d-sm-block"> Welcome {{ username }} </span>

      <!-- Logout -->
      <ad-button outline variant="primary">Logout</ad-button>
    </div>
  </nav>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'dashboard-header',

  data() {
    return {
      // TODO: Replace this username with username that received from api
      username: '',
    }
  },
})
</script>
