<template>
  <div v-bind="rootProps" :class="{ 'form-check': ['radio', 'checkbox'].includes($attrs.type) }">
    <!-- Label -->
    <label class="form-label" :class="{ 'text-danger': isInvalid }" :for="$attrs.id" v-bind="labelProps">
      {{ label }}
    </label>

    <!-- Input -->
    <component
      v-bind="$attrs"
      :is="$attrs.is || 'input'"
      :class="{
        'is-invalid': isInvalid,
        [inputTypeClass]: true,
      }"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
    >
    </component>

    <!-- Error -->
    <span v-if="isInvalid" class="invalid-feedback d-block">
      {{ errorMessage }}
    </span>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, useAttrs } from 'vue'

type InputTypesAttr = '_default' | 'checkbox' | 'radio'

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
    modelValue: {
      type: String,
      required: false,
    },
  },

  setup() {
    const attrs = useAttrs()
    enum inputTypeMapClasses {
      _default = 'form-control',
      checkbox = 'form-check-input',
      radio = 'form-check-input',
    }

    const type = attrs.type as InputTypesAttr
    const inputTypeClass = computed(() => inputTypeMapClasses[type ?? '_default'])

    return {
      inputTypeClass,
    }
  },
})

// TODO: Move bootstrap's form styles to this file to isolate input component
</script>
