<template>
  <ul class="pagination justify-content-center">
    <!-- Previous -->
    <li class="page-item" :class="{ disabled: current === 1 }" @click="$emit('change-page', current - 1)">
      <span class="page-link"> &lt; </span>
    </li>

    <!-- Pages -->
    <li
      class="page-item"
      :class="{ active: item === current }"
      v-for="item of items"
      :key="`page-${item}`"
      @click="item !== current && $emit('change-page', item)"
    >
      <span class="page-link">{{ item }}</span>
    </li>

    <!-- Next -->
    <li class="page-item" :class="{ disabled: current === pagesCount }" @click="$emit('change-page', current + 1)">
      <span class="page-link"> &gt; </span>
    </li>
  </ul>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'

export default defineComponent({
  name: 'ad-pagination',

  emits: ['change-page'],

  props: {
    current: {
      type: Number,
      required: true,
    },
    pagesCount: {
      type: Number,
      required: true,
    },
    buttonsCount: {
      type: Number,
      default: 4,
    },
  },

  setup(props) {
    const items = computed(() => {
      if (props.pagesCount < 1) return []

      // FIXME: No magic number
      const startNumber = Math.max(1, props.current - props.buttonsCount / 2)
      const endNumber = Math.min(startNumber + props.buttonsCount, props.pagesCount)
      return new Array(endNumber - startNumber + 1).fill(null).map((_, index) => startNumber + index)
    })

    return { items }
  },
})
</script>
