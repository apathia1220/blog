<template>
    <div class="flex pb-2">
        <img class="w-10 h-10 rounded-full" src="@/assets/wallpaper.jpg">
        <div class="ml-4 flex-1">
            <textarea v-model="commentContent"
                class="w-full shadow-md rounded-md text-ap-normal p-4 focus:outline-none bg-ap-bg resize-none" cols="30"
                rows="5" :placeholder="t('controls.comment')" />
            <div class="flex justify-end my-2">
                <div
                    class=" w-24 text-white p-2 rounded-lg shadow-lg transition transform hover:scale-105 flex float-right bg-ap outline-none cursor-pointer">
                    <span class="mt-1 text-center flex-grow font-icon-font" @click="emit('close')">{{
                        t("controls.cancel")
                    }}</span>
                </div>
                <div
                    class=" ml-2 w-24 text-white p-2 rounded-lg shadow-lg transition transform hover:scale-105 flex float-right bg-ap outline-none cursor-pointer">
                    <span class="mt-1 text-center flex-grow font-icon-font" @click="submitComment">
                        {{ t("menu.comment") }}
                    </span>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang='ts' setup>
import { useI18n } from 'vue-i18n'
import { saveComment, SaveCommentRequest } from '@/apis/comment'
import { toast } from '@apathia/apathia.alert'
import { useUserStore } from '@/store/user'

const props = defineProps<{
    replyUser: number
}>()
const emit = defineEmits(['close'])
const route = useRoute()
const user = useUserStore()

const { t } = useI18n()

const commentContent = ref('')

const type: number = inject('commentType') as number
const parentId: number = inject('parentId') as number
const refetch = inject('refetchComments') as () => Promise<void>
const topicId: string | null = inject('topicId') as string | null

const submitComment = async () => {
    if (commentContent.value.trim() === '') {
        toast.danger('评论内容不能为空')
        return
    }
    if (!user.userInfo) {
        toast.danger('请先登录,再评论')
        return
    }
    const saveParam: SaveCommentRequest = {
        commentContent: commentContent.value,
        type,
        parentId,
        replyUserId: props.replyUser
    }
    if (type === 1) {
        saveParam.topicId = route.path.split('/')[2]
    }
    if (type === 5) {
        saveParam.topicId = topicId
    }
    try {
        await saveComment(saveParam)
        toast.success('评论成功')
        await refetch()
        commentContent.value = ''
        emit('close')
    } catch (e: any) {
        toast.danger(e.message)
    }
}
</script>
<style lang='scss' scoped>

</style>