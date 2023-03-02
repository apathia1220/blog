<template>
  <div class="relative z-10">
    <div class="relative font-icon-font text-ap-bright text-6xl my-8">
      <h1>{{ t("menu.message") }}</h1>
      <span class="absolute bottom-0 h-1 w-48 rounded-full bg-ap"></span>
    </div>
    <div class="grid grid-cols-main mb-4">
      <div>
        <div class="w-full h-24 bg-ap-card rounded-2xl p-8 font-icon-font text-ap-normal">
          欢迎大家留言！
        </div>
        <div class="bg-ap-card w-full rounded-2xl p-8 mt-4">
          <div class="flex flex-col">
            <AddComment @save="saveMessage" />
            <div class="mt-4">
              <Comment :type="2" :data="messageData || []" :refetch="getMessage" />
            </div>
          </div>
        </div>
        <div v-if="hasMore"
          class="bg-ap-card rounded-xl mt-8 pt-2 pb-4 cursor-pointer text-center text-2xl font-icon-font text-ap-normal opacity-70 hover:opacity-100 hover:text-ap-bright">
          <div class="block mt-4" @click="getMore">{{ t('controls.more') }}</div>
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
import { Affix } from "../../components/Affix";
import { useI18n } from "vue-i18n";
import { AddComment, Comment } from '@/components/Comment'
import { getCommentList, saveComment, CommentReuqest, CommentItem, CommentResponse } from '@/apis/comment'
import { toast } from "@apathia/apathia.alert";

const { t } = useI18n();

const messageData = ref<CommentItem[]>([])
const page = ref({
  size: 8,
  current: 1,
  count: 0
})

const hasMore = computed(() => !!messageData.value && messageData.value.length < page.value.count)

const getMessage = async () => {
  const param: CommentReuqest = {
    type: 2,
    current: 1,
    size: page.value.size * page.value.current
  }
  try {
    const res: CommentResponse = await getCommentList(param) as CommentResponse
    // messageData.value.push(...(res.data.records || []))
    messageData.value = res.data.records
    page.value.count = res.data.count
  } catch (e: any) {
    toast.danger(e.message)
  }
}

const saveMessage = async (content: string) => {
  const param = {
    type: 2,
    commentContent: content
  }
  try {
    await saveComment(param)
    await getMessage()
  } catch (e: any) {
    toast.danger(e.message)
  }
}

const getMore = async () => {
  page.value.current++
  await getMessage()
}

onBeforeMount(async () => {
  await getMessage()
})
</script>
<style lang="scss" scoped></style>
