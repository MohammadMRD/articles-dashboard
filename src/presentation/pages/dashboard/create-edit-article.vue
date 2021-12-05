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
        <ad-button variant="primary" class="mt-4" @click.prevent="createOrEditArticle()"> Submit </ad-button>
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
import { useRouter, useRoute } from 'vue-router'
import { Article, CreateArticleDTO, TagList } from '@/core'

type SelectedTags = { [key: string]: boolean }

export default defineComponent({
  name: 'create-edit-article',

  setup() {
    // Manage tags
    const store = useStore()
    const router = useRouter()
    const route = useRoute()
    const isCreateMode = route.name !== 'edit-article'
    const newTag = ref('')
    const selectedTags = reactive<SelectedTags>({})
    const tagsData = ref<TagList>([])

    onMounted(async () => {
      await store.dispatch('tagModule/getAllTags')
      tagsData.value = [...store.state.tagModule.tags].sort()
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
    const articleDTO = ref(new CreateArticleDTO('', '', '', []))

    onMounted(async () => {
      if (isCreateMode) return

      const article: Article = await store.dispatch('articleModule/getArticle', route.params.slug)
      articleDTO.value = article
      article.tagList.forEach((tag) => toggleTag(tag))
    })

    async function createOrEditArticle() {
      articleDTO.value.tagList = Object.keys(selectedTags)
      const data = isCreateMode ? articleDTO.value : { articleDTO: articleDTO.value, slug: route.params.slug }
      await store.dispatch(`articleModule/${isCreateMode ? 'createArticle' : 'editArticle'}`, data)
      router.push({ name: 'articles' })
    }

    return {
      tagsData,
      newTag,
      selectedTags,
      createTag,
      toggleTag,

      articleDTO,
      createOrEditArticle,
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
