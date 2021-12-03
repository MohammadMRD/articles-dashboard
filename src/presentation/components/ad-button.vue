<template>
  <button class="btn" :class="variantClass">
    <slot></slot>
  </button>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'

export enum ButtonVariants {
  primary = 'primary',
  secondary = 'secondary',
  success = 'success',
  danger = 'danger',
  warning = 'warning',
  info = 'info',
  light = 'light',
  dark = 'dark',
}

export default defineComponent({
  name: 'ad-button',

  props: {
    variant: {
      type: String as PropType<ButtonVariants>,
      required: true,
      default: ButtonVariants.primary,
    },
    outline: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    variantClass() {
      return `btn${this.outline ? '-outline' : ''}-${this.variant}`
    },
  },
})

// TODO: Move Bootstrap's button styles to this file to isolate button component
</script>
