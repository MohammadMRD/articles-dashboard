<template>
  <component :is="pageLayout">
    <template v-for="(slot, name) in $slots" :key="name" v-slot:[name]>
      <component :is="slot"></component>
    </template>
  </component>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import DefaultLayout from '@/presentation/layouts/default-layout.vue'

export default defineComponent({
  name: 'auth-view',

  computed: {
    pageLayout() {
      return this.$route.meta.layout || DefaultLayout
    },
  },
})
</script>
