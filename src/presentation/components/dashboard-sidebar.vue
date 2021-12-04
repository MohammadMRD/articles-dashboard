<template>
  <aside
    ref="sidebar"
    class="offcanvas offcanvas-start"
    data-bs-scroll="true"
    data-bs-backdrop="false"
    data-bs-keyboard="false"
  >
    <!--  -->
    <ul class="nav flex-column">
      <li
        v-for="item in items"
        :key="`sidebar-${item.text}`"
        :class="{
          'nav-item': item.type === 'link',
          active: $route.name === item.routeName,
        }"
      >
        <!-- Link -->
        <router-link
          v-if="item.type === 'link'"
          class="nav-link"
          :to="{ name: item.routeName }"
        >
          {{ item.text }}
        </router-link>

        <!-- Title -->
        <div v-else class="px-3 py-2 fs-5">{{ item.text }}</div>
      </li>
    </ul>
  </aside>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import { Offcanvas } from 'bootstrap'

declare type ItemTypes = 'link' | 'title'

export default defineComponent({
  name: 'dashboard-sidebar',

  setup() {
    // Show Sidebar
    const sidebar = ref<Element>()

    onMounted(() => {
      new Offcanvas(sidebar.value as unknown as Element).show()
    })

    //-------------------
    // Sidebar Items
    function createItem(text: string, type: ItemTypes, routeName?: string) {
      return { text, type, routeName }
    }

    const items = [
      createItem('Posts', 'title'),
      createItem('All Articles', 'link', 'articles'),
      createItem('New Article', 'link', 'create-article'),
    ]

    return {
      sidebar,
      items,
    }
  },
})
</script>
