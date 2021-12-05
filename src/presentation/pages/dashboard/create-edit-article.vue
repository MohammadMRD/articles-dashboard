<template>
  <ad-page>
    <h1>{{ $route.name === 'edit-article' ? 'Edit' : 'New' }} Article</h1>

    <div class="d-flex">
      <!-- Create/Edit Article -->
      <form class="flex-fill me-3">
        <ad-input
          id="article-title"
          label="Title"
          placeholder="Title"
          v-model="articleDTO.title"
          :rootProps="{ class: 'mt-3' }"
        ></ad-input>
        <ad-input
          id="article-description"
          label="Description"
          placeholder="Description"
          v-model="articleDTO.description"
          :rootProps="{ class: 'mt-3' }"
        >
        </ad-input>
        <ad-input label="Body" is="textarea" rows="8" v-model="articleDTO.body" :rootProps="{ class: 'mt-3' }">
        </ad-input>

        <!-- Submit -->
        <ad-button variant="primary" class="mt-4" @click.prevent="createArticle()"> Submit </ad-button>
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
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { CreateArticleDTO } from '@/core'

type SelectedTags = { [key: string]: boolean }

export default defineComponent({
  name: 'create-edit-article',

  setup() {
    // Manage tags
    const store = useStore()
    const router = useRouter()
    const newTag = ref('')
    const selectedTags = reactive<SelectedTags>({})
    const tagsData = ref([...store.state.tagModule.tags])

    onMounted(async () => {
      await store.dispatch('tagModule/getAllTags')
    })

    function createTag() {
      if (!newTag.value || tagsData.value.includes(newTag.value)) return

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
    const articleDTO = reactive(new CreateArticleDTO('', '', '', []))

    async function createArticle() {
      articleDTO.tagList = Object.keys(selectedTags)
      await store.dispatch('articleModule/createArticle', articleDTO)
      router.push({ name: 'articles' })
    }

    return {
      tagsData,
      newTag,
      selectedTags,
      createTag,
      toggleTag,

      articleDTO,
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
