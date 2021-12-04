<template>
  <ad-page>
    <h1>All Articles</h1>
    <ad-table
      :data="data.articles"
      :uniqueColumn="tableUniqueColumn"
      :headers="tableHeaders"
      :formatData="formatData"
    >
      <!-- TODO: Add table actions and Pagination -->
    </ad-table>
  </ad-page>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'

// TODO: Add all author's props
declare interface Author {
  username: string
}

export default defineComponent({
  setup() {
    const data = ref({ articles: [] })
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
      tagList: (tags: [string]) => tags.join(', '),
      body: (body: string) => {
        return body.length > 20 ? body.slice(0, 20) + '...' : body
      },
      createdAt: (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', dateOptions)
      },
    }

    onMounted(async () => {
      // TODO: Normalize data
      let res = await fetch('https://api.realworld.io/api/articles')
      data.value = await res.json()
    })

    return { data, tableHeaders, tableUniqueColumn, formatData }
  },
})
</script>
