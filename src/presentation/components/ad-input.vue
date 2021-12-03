<template>
  <div v-bind="rootProps">
    <label
      class="form-label"
      :class="{ 'text-danger': isInvalid }"
      :for="$attrs.id"
      v-bind="labelProps"
    >
      {{ label }}
    </label>
    <input
      class="form-control"
      :class="{ 'is-invalid': isInvalid }"
      v-bind="$attrs"
    />
    <span v-if="isInvalid" class="invalid-feedback d-block">
      {{ errorMessage }}
    </span>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ad-input',
  inheritAttrs: false,

  props: {
    rootProps: {
      type: Object,
    },
    label: {
      type: String,
      required: false,
    },
    labelProps: {
      type: Object,
      required: false,
    },
    isInvalid: {
      type: Boolean,
      required: false,
    },
    errorMessage: {
      type: String,
      required: false,
    },
  },
})

// TODO: Move bootstrap's form styles to this file to isolate input component
</script>
