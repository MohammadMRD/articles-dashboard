<template>
  <ad-page>
    <h1>All Articles</h1>
    <ad-table
      :data="articleState.articles"
      :uniqueColumn="tableUniqueColumn"
      :headers="tableHeaders"
      :formatData="formatData"
      :pagination="articleState.pagination"
      @change-page="handleChangePage"
    >
      <template #actions="{ item }">
        <div ref="dropDown" class="dropdown">
          <ad-button variant="primary" data-bs-toggle="dropdown">...</ad-button>
          <ul class="dropdown-menu">
            <li>
              <router-link class="dropdown-item" :to="{ name: 'edit-article', params: { slug: item.slug } }">
                Edit
              </router-link>
            </li>
            <li><span class="dropdown-item text-danger">Delete</span></li>
          </ul>
        </div>
      </template>
    </ad-table>
  </ad-page>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref } from 'vue'
import { useStore } from 'vuex'
import { Dropdown } from 'bootstrap'
import { ArticleBody, Author, TagList } from '@/core'
import { ArticleState } from '@/presentation/store/article-store'
import adButton from '@/presentation/components/ad-button.vue'

export default defineComponent({
  components: { adButton },
  setup() {
    const dropDown = ref(null)
    const store = useStore()
    const articleState = computed(() => {
      const { articles, currentPage, articlesCount } = store.state.articleModule as ArticleState

      const pagination = { disabled: false, current: currentPage, pagesCount: Math.ceil(articlesCount / 10) }

      return { articles, pagination }
    })

    onMounted(async () => {
      await store.dispatch('articleModule/getAllArticles')
      new Dropdown(dropDown.value as unknown as Element)
    })

    const tableUniqueColumn = 'slug'
    const tableHeaders = [
      { key: 'title', text: 'Title' },
      { key: 'author', text: 'Author' },
      { key: 'tagList', text: 'Tags' },
      { key: 'body', text: 'Excerpt' },
      { key: 'createdAt', text: 'Created' },
    ]
    const dateOptions: Intl.DateTimeFormatOptions = {
      month: 'short',
      day: '2-digit',
      year: 'numeric',
    }
    const formatData = {
      author: (author: Author) => `@${author.username}`,
      tagList: (tags: TagList) => tags.join(', '),
      body: (body: ArticleBody) => {
        return body.length > 20 ? body.slice(0, 20) + '...' : body
      },
      createdAt: (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', dateOptions)
      },
    }

    async function handleChangePage(page: number) {
      await store.dispatch('articleModule/getAllArticles', page)
    }

    return { articleState, tableHeaders, tableUniqueColumn, formatData, handleChangePage, dropDown }
  },
})
</script>
