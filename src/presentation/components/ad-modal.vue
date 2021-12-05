<template>
  <teleport to="body">
    <div ref="modal" class="modal" tabindex="-1">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">{{ title }}</h5>
          </div>
          <div class="modal-body">
            <slot></slot>
          </div>
          <div class="modal-footer">
            <slot name="actions"></slot>
          </div>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, watch } from 'vue'
import { Modal } from 'bootstrap'

export default defineComponent({
  name: 'ad-modal',

  props: {
    show: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      required: true,
    },
  },

  setup(props) {
    const modal = ref()
    const modalInstance = ref()

    watch(props, () => {
      props.show ? modalInstance.value?.show() : modalInstance.value?.hide()
    })

    onMounted(() => {
      modalInstance.value = new Modal(modal.value as Element, { keyboard: false, focus: false, backdrop: 'static' })
      props.show && modalInstance.value.show()
    })

    return { modal }
  },
})
</script>
