<template>
  <div class="table-responsive">
    <table class="table">
      <!-- Table Headers -->
      <!-- TODO: Export header as a component -->
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
      <!-- TODO: Export body as a component -->
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

          <!-- Pagination -->
          <tr v-if="!pagination.disabled">
            <td colspan="9999" class="mx-auto border-0 p-0 pt-5">
              <slot name="pagination">
                <ad-pagination v-bind="pagination" @change-page="handleChangePage"></ad-pagination>
              </slot>
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

  emits: ['change-page'],

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
    pagination: {
      type: Object,
      default: () => ({ disabled: true }),
    },
  },

  setup(props, { emit }) {
    function renderData(key: string, data: never) {
      return props.formatData?.[key]?.(data[key]) ?? data[key]
    }

    function handleChangePage(page: number) {
      emit('change-page', page)
    }

    return {
      renderData,
      handleChangePage,
    }
  },
})
</script>
