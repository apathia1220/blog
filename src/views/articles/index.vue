<template>
  <div class="relative z-10">
    <div class="relative font-icon-font text-ap-bright text-6xl my-8">
      <h1>{{ title }}</h1>
      <span class="absolute bottom-0 h-1 w-48 rounded-full bg-ap"></span>
    </div>
    <div class="grid grid-cols-main mb-4">
      <div>
        <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8" v-if="isLoading">
          <LoadingAtricle />
        </div>
        <div v-else>
          <div v-if="!!articleData && articleData.length !== 0">
            <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              <Card v-for="article in articleData" :key="article.id" :data="(article as ArticleItem)" />
            </div>
            <div v-if="hasMore"
              class="bg-ap-card rounded-xl mt-4 pt-2 pb-4 text-center text-2xl cursor-pointer font-icon-font text-ap-normal opacity-70 hover:opacity-100 hover:text-ap-bright">
              <a class="block mt-4" @click="getMore">{{ t('controls.more') }}</a>
            </div>
          </div>
          <div v-else class="font-icon-font text-center py-4 text-ap-bright text-2xl">{{ t('settings.noMore') }}~</div>
        </div>
      </div>
      <div class="-mt-12">
        <Affix>
          <UseInfo />
        </Affix>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import UseInfo from "../homepage/UseInfo.vue";
import { Affix } from "@/components/Affix";
import { Card, LoadingAtricle } from "@/components/Card";
import { getArticleList, getArticleByTag, getArticleByCategory, type ArticleRequest } from '@/apis/articles';
import { ArticleItem, type ArticleResponse } from '@/store/articles';
import { toast } from '@apathia/apathia.alert';
import { useI18n } from 'vue-i18n'
import markdown from 'markdown-it'

const articleData = ref<ArticleItem[]>([])
const { t } = useI18n()
const md = new markdown()
const route = useRoute()
const isLoading = ref(false)

const page = ref({
  size: 9,
  current: 1,
  count: 0
})
const hasMore = computed(() => articleData.value.length < page.value.count)

const title = computed(() => {
  if (route.query.tagName) {
    return route.query.tagName
  } else if (route.query.categoryName) {
    return route.query.categoryName
  } else {
    return t("menu.article")
  }
})

const getArticle = async () => {
  const param: ArticleRequest = {
    current: page.value.current,
    size: page.value.size
  }
  let api = getArticleList
  const query = route.query
  if (query.tagId) {
    api = getArticleByTag
    param.tagId = +query.tagId
  }
  if (query.categoryId) {
    api = getArticleByCategory
    param.categoryId = +query.categoryId
  }
  isLoading.value = true
  try {
    const res: ArticleResponse = await api(param) as ArticleResponse
    articleData.value = res.data.records?.map<ArticleItem>((item: ArticleItem) => {
      const articleContent = md
        .render(item.articleContent)
        .replace(/<\/?[^>]*>/g, '')
        .replace(/[|]*\n/, '')
        .replace(/&npsp;/gi, '')
      return {
        ...item,
        articleContent
      }
    }) as ArticleItem[]
    page.value.count = res.data.count
    isLoading.value = false
  } catch (e: any) {
    toast.danger(e.message)
  }
}

const getMore = async () => {
  page.value.current++
  await getArticle()
}

onBeforeMount(async () => {
  await getArticle()
})
</script>
<style lang="scss" scoped></style>
