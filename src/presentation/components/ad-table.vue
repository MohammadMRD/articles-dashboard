<template>
  <table class="table">
    <!-- Table Headers -->
    <thead class="table-light">
      <slot name="headers">
        <tr>
          <th v-for="header of headers" :key="`th-${header.key}`">
            {{ header.text }}
          </th>
        </tr>
      </slot>
    </thead>

    <!-- Table Body -->
    <tbody>
      <slot>
        <tr
          v-for="(item, index) of data"
          :key="`tr-${item[uniqueColumn] || index}`"
        >
          <td v-for="header of headers" :key="`td-${header.key}`">
            {{ renderData(header.key, item) }}
          </td>
        </tr>
      </slot>
    </tbody>
  </table>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ad-table',

  props: {
    headers: {
      type: Array,
      required: true,
    },
    data: {
      type: Array,
      required: true,
    },
    uniqueColumn: {
      type: String,
      required: true,
    },
    formatData: {
      type: Object,
      required: false,
    },
  },

  setup(props) {
    function renderData(key: string, data: never) {
      return props.formatData?.[key]?.(data[key]) ?? data[key]
    }

    return {
      renderData,
    }
  },
})
</script>
