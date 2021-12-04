<template>
  <div class="table-responsive">
    <table class="table">
      <!-- Table Headers -->
      <thead>
        <slot name="headers">
          <tr>
            <!-- Row Number -->
            <th v-if="showRowNumber">#</th>

            <!-- Headers -->
            <th v-for="header of headers" :key="`th-${header.key}`">
              {{ header.text }}
            </th>

            <!-- Actions -->
            <th></th>
          </tr>
        </slot>
      </thead>

      <!-- Table Body -->
      <tbody>
        <slot>
          <!-- Rows -->
          <tr v-for="(item, index) of data" :key="`tr-${item[uniqueColumn]}`">
            <!-- Row Number -->
            <td v-if="showRowNumber">{{ index + 1 }}</td>

            <!-- Items' value -->
            <td v-for="header of headers" :key="`td-${header.key}`">
              {{ renderData(header.key, item) }}
            </td>

            <!-- Actions' slot -->
            <td>
              <slot name="actions" :item="item"></slot>
            </td>
          </tr>
        </slot>
      </tbody>
    </table>
  </div>
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
    showRowNumber: {
      type: Boolean,
      default: true,
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
