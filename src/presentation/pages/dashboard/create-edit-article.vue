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
          v-model="tags.new"
          @keyup.enter="createTag()"
          :rootProps="{ class: 'mt-3' }"
        >
        </ad-input>

        <!-- Tags list -->
        <div class="tags-list card mt-3 p-3">
          <ad-input
            id="tag"
            type="checkbox"
            v-for="tag of tags.list"
            :key="tag"
            :label="tag"
            :checked="tags.selected[tag]"
            @change="toggleTag(tag)"
          >
          </ad-input>
        </div>
      </section>
    </div>
  </ad-page>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, reactive, ref, watch } from 'vue'
import { useStore } from 'vuex'
import { useRouter, useRoute } from 'vue-router'
import { Article, CreateArticleDTO, TagList } from '@/core'

type SelectedTags = { [key: string]: boolean }
type TagsState = { new: string; selected: SelectedTags; list: TagList }

export default defineComponent({
  name: 'create-edit-article',

  setup() {
    const store = useStore()
    const router = useRouter()
    const route = useRoute()
    const DEFAULT_TAGS_STATE = { new: '', selected: {}, list: [] }
    // TODO: Add a tag manager class for handle tag's state better
    const tags = reactive<TagsState>({ ...DEFAULT_TAGS_STATE })
    const articleDTO = ref(new CreateArticleDTO('', '', '', []))
    const isCreateMode = computed(() => route.name === 'create-article')

    watch(isCreateMode, initializePage)
    onMounted(initializePage)

    async function initializePage() {
      await store.dispatch('tagModule/getAllTags')

      if (!isCreateMode.value) {
        const article: Article = await store.dispatch('articleModule/getArticle', route.params.slug)
        articleDTO.value = article
        article.tagList.forEach((tag) => toggleTag(tag))
      } else {
        articleDTO.value = new CreateArticleDTO('', '', '', [])
        tags.new = ''
        tags.selected = {}
      }

      tags.list = [...new Set([...store.state.tagModule.tags, ...articleDTO.value.tagList])].sort()
    }

    // Manage tags
    function createTag() {
      if (!tags.new || tags.list.includes(tags.new)) return

      tags.list.push(tags.new)
      tags.selected[tags.new] = true
      // TODO: Change with insertion sort and use localCompare
      tags.list.sort()
      tags.new = ''
    }

    function toggleTag(tag: string) {
      if (tags.selected[tag]) delete tags.selected[tag]
      else tags.selected[tag] = true
    }

    // Manage article
    async function createOrEditArticle() {
      articleDTO.value.tagList = Object.keys(tags.selected)
      const [actionName, slug] = isCreateMode.value ? ['createArticle'] : ['editArticle', route.params.slug]
      const data = { articleDTO: articleDTO.value, slug }

      await store.dispatch(`articleModule/${actionName}`, data)

      router.push({ name: 'articles' })
    }

    return {
      tags,
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
