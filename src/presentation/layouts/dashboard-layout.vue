<template>
  <section class="dashboard">
    <!-- Header -->
    <dashboard-header class="dashboard__header"></dashboard-header>

    <!-- Sidebar -->
    <dashboard-sidebar class="dashboard__sidebar"></dashboard-sidebar>

    <!-- Main -->
    <main class="dashboard__main container mt-4">
      <slot></slot>
    </main>
  </section>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue'
import { useStore } from 'vuex'
import DashboardHeader from '@/presentation/components/dashboard-header.vue'
import DashboardSidebar from '@/presentation/components/dashboard-sidebar.vue'

export default defineComponent({
  name: 'dashboard-layout',

  components: {
    DashboardHeader,
    DashboardSidebar,
  },

  setup() {
    const store = useStore()

    onMounted(() => {
      if (store.state.userModule.user === null) {
        store.dispatch('userModule/getCurrentUser')
      }
    })
  },
})
</script>

<style scoped lang="scss">
.dashboard {
  display: grid;
  position: relative;
  height: 100vh;
  grid-template-columns: auto 1fr;
  grid-template-rows: auto 1fr;
  gap: 0px 0px;
  grid-auto-flow: row;
  grid-template-areas:
    'header header'
    'sidebar main';

  &__header {
    grid-area: header;
  }

  &__sidebar {
    grid-area: sidebar;
    position: relative;
  }

  &__main {
    grid-area: main;
    overflow-y: auto;
  }
}
</style>
