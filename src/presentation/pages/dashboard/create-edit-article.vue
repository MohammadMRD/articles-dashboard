<template>
  <ad-page>
    <h1>New Article</h1>

    <div class="d-flex">
      <!-- Create/Edit Article -->
      <form class="flex-fill me-3">
        <ad-input
          id="article-title"
          label="Title"
          placeholder="Title"
          v-model="article.title"
          :rootProps="{ class: 'mt-3' }"
        ></ad-input>
        <ad-input
          id="article-description"
          label="Description"
          placeholder="Description"
          v-model="article.description"
          :rootProps="{ class: 'mt-3' }"
        >
        </ad-input>
        <ad-input
          label="Body"
          is="textarea"
          rows="8"
          v-model="article.body"
          :rootProps="{ class: 'mt-3' }"
        >
        </ad-input>

        <!-- Submit -->
        <ad-button
          variant="primary"
          class="mt-4"
          @click.prevent="createArticle()"
        >
          Submit
        </ad-button>
      </form>

      <!-- Create Tag -->
      <section class="me-3 d-flex flex-column">
        <ad-input
          id="tag-name"
          label="Tags"
          placeholder="New tag"
          v-model="newTag"
          @keyup.enter="createTag()"
          :rootProps="{ class: 'mt-3' }"
        >
        </ad-input>

        <!-- Tags list -->
        <div class="tags-list card mt-3 p-3">
          <ad-input
            id="tag"
            type="checkbox"
            v-for="tag of tagsData"
            :key="tag"
            :label="tag"
            :checked="selectedTags[tag]"
            @change="toggleTag(tag)"
          >
          </ad-input>
        </div>
      </section>
    </div>
  </ad-page>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, ref } from 'vue'

export default defineComponent({
  name: 'create-edit-article',

  setup() {
    // Manage tags
    const tagsData = ref<string[]>([])
    const newTag = ref('')
    const selectedTags = reactive<{ [key: string]: boolean }>({})

    onMounted(async () => {
      const res = await fetch('https://api.realworld.io/api/tags').then((res) =>
        res.json()
      )
      tagsData.value = res.tags
    })

    function createTag() {
      if (!newTag.value) return

      tagsData.value.push(newTag.value)
      selectedTags[newTag.value] = true
      // TODO: Change with insertion sort and use localCompare
      tagsData.value.sort()
      newTag.value = ''
    }

    function toggleTag(tag: string) {
      if (selectedTags[tag]) delete selectedTags[tag]
      else selectedTags[tag] = true
    }

    // Manage article
    const article = reactive({ title: '', description: '', body: '' })

    function createArticle() {
      fetch('https://api.realworld.io/api/articles', {
        method: 'POST',
        body: JSON.stringify({
          article: {
            ...article,
            tagList: tagsData.value,
          },
        }),
      })
    }

    return {
      tagsData,
      newTag,
      selectedTags,
      createTag,
      toggleTag,

      article,
      createArticle,
    }
  },
})
</script>

<style scoped lang="scss">
.tags-list {
  max-height: 325px;
  overflow: auto;
}
</style>
