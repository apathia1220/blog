<template>
  <div class="relative z-10">
    <div class="mt-8 mb-4 text-ap-normal">
      <span>
        <b>{{ articleItem?.categoryName }}</b>
        <em v-for="tag in articleItem?.tags" :key="tag.tagName" class="pl-4">#{{ tag.tagName }}</em>
      </span>
      <h1 class="text-6xl text-ap-bright pt-4 pb-2">{{ articleItem?.articleTitle }}</h1>
      <div class="w-full flex justify-start flex-1 content-end mt-4 mb-8 items-end text-sm">
        <img class="w-7 h-7 rounded-full mr-2 hover:opacity-50 cursor-pointer" :src="articleItem?.author.avatar" alt="" />
        <span class="text-ap-normal text-content-2 leading-7">
          <strong class="hover:opacity-50 cursor-pointer">{{ articleItem?.author.nickname }}</strong>
          <span class="opacity-70 cursor-text ml-4">
            {{ t('settings.shared-on') }}
            {{ t(`settings.months[${new Date(articleItem?.createTime || '').getMonth()}]`) }}
            {{ new Date(articleItem?.createTime || '').getDate() }},
            {{ new Date(articleItem?.createTime || '').getFullYear() }}
          </span>
        </span>
      </div>
    </div>
    <div class="grid grid-cols-main mb-4">
      <div class="z-10">
        <div class="article-html relative w-full bg-ap-card text-ap-normal rounded-2xl p-6"
          v-html="articleItem?.articleContent"></div>
        <div class="bg-ap-card w-full rounded-2xl p-8 mt-4">
          <p class="relative flex items-center pt-4 pb-2 mb-8 text-ap-bright text-title-3 font-icon-font">
            <span>{{ t("menu.comment") }}</span>
            <span class="absolute bottom-0 h-1 w-24 rounded-full bg-ap"></span>
          </p>
          <div class="flex flex-col">
            <AddComment @save="submitComment" />
            <div class="mt-4">
              <Comment :data="comments || []" :type="1" :refetch="getComments" />
            </div>
            <div v-if="hasMore"
              class="bg-ap-bg rounded-xl mt-8 pt-2 pb-4 cursor-pointer text-center text-2xl font-icon-font text-ap-normal opacity-70 hover:opacity-100 hover:text-ap-bright">
              <div class="block mt-4" @click="getMore">{{ t('controls.more') }}</div>
            </div>
          </div>
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
import { markdownToHtml } from "@/utils";
import UseInfo from "../homepage/UseInfo.vue";
import { Affix } from "@/components/Affix";
import { useI18n } from "vue-i18n";
import { getArticleById } from '@/apis/articles'
import { toast } from "@apathia/apathia.alert"
import { ArticleDetailResponse, ArticleItem } from '@/store/articles'
import '@/styles/prism.css'
import { Comment, AddComment } from '@/components/Comment'
import { getCommentList, saveComment, CommentReuqest, CommentItem, CommentResponse } from '@/apis/comment'
import Prism from 'prismjs'

const { t } = useI18n();
const route = useRoute()

const articleItem = ref<ArticleItem | null>(null)

const comments = ref<CommentItem[]>([])
const page = ref({
  size: 9,
  current: 1,
  count: 0
})
const hasMore = computed(() => !!comments.value && comments.value.length < page.value.count)

const getArticleDetail = async () => {
  const id = route.path.split("/")[2]
  try {
    const res: ArticleDetailResponse = await getArticleById(+id) as ArticleDetailResponse
    articleItem.value = res.data
    articleItem.value.articleContent = markdownToHtml(res.data.articleContent)
    nextTick(() => {
      Prism.highlightAll()
    })
  } catch (e: any) {
    toast.danger(e.message)
  }
}

const getComments = async () => {
  const params: CommentReuqest = {
    type: 1,
    topicId: +route.path.split("/")[2],
    current: 1,
    size: page.value.size * page.value.current
  }
  try {
    const res: CommentResponse = await getCommentList(params) as CommentResponse
    comments.value = res.data.records
    page.value.count = res.data.count
  } catch (e: any) {
    toast.danger(e.message)
  }
}

const getMore = async () => {
  page.value.current++
  await getComments()
}

const submitComment = async (content: string) => {
  const params = {
    type: 1,
    topicId: route.path.split("/")[2],
    commentContent: content
  }
  await saveComment(params)
  await getComments()
}

onBeforeMount(async () => {
  await getArticleDetail()
  await getComments()
})
</script>
<style lang="scss" scoped></style>
