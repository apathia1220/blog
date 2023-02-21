<template>
    <div class="flex flex-col bg-ap-card rounded-2xl pt-4 pb-2 mb-4">
        <div class="flex">
            <div class="ml-6">
                <img class="talk-icon h-14 w-14 rounded-md" :src="(talk.avatar as string)" alt="">
            </div>
            <div class="mx-6">
                <div class="flex flex-col">
                    <span class="text-content-2 text-ap-bright">{{ talk.nickname }}</span>
                    <span class="mt-2 text-xs text-ap-normal opacity-70">{{ formatTime(talk.createTime || '') }}</span>
                </div>
                <div class="mt-4">
                    <p class="text-content-2 text-ap-normal opacity-70 hover:text-ap-bright">
                        {{ talk.content }}
                    </p>
                    <ul v-if="talk.imgs && talk.imgs.length > 0"
                        class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 mt-8">
                        <li v-for="img in talk.imgs" class="h-52 rounded-md">
                            <img class="h-full w-full rounded-md cursor-pointer" :src="img" alt="">
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <ul class="flex w-full justify-end text-ap-normal leading-8">
            <li class="flex justify-center items-center mr-10 opacity-70 hover:opacity-100 hover:text-ap-bright cursor-pointer"
                :class="showComment ? 'text-ap-accent hover:text-ap-accent' : ''" @click="toggleComment">
                <svg class="h-6 w-6" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" data-v-8337a051="">
                    <path fill="currentColor"
                        d="M736 504a56 56 0 1 1 0-112 56 56 0 0 1 0 112zm-224 0a56 56 0 1 1 0-112 56 56 0 0 1 0 112zm-224 0a56 56 0 1 1 0-112 56 56 0 0 1 0 112zM128 128v640h192v160l224-160h352V128H128z">
                    </path>
                </svg>
                <span class="ml-2">{{ page.count }}</span>
            </li>
        </ul>
        <div v-if="showComment" class="ml-24 mr-6 mt-4 p-4 rounded-md">
            <AddComment @save="submitComment" />
        </div>
        <div v-if="talkComment && talkComment.length > 0 && showComment" class="ml-24 mr-6 mt-4 p-4 rounded-md">
            <Comment :data="talkComment" :type="5" :topicId="(String(talk.id))" :refetch="getTalkComments" />
            <div v-if="hasMore"
                class="bg-ap-bg rounded-xl mt-4 pt-2 pb-4 cursor-pointer text-center text-2xl font-icon-font text-ap-normal opacity-70 hover:opacity-100 hover:text-ap-bright">
                <div class="block mt-4" @click="getMore">{{ t('controls.more') }}</div>
            </div>
        </div>
    </div>
</template>

<script lang='ts' setup>
import { TalkItem } from '@/apis/talks'
import { formatTime } from '@/utils'
import { getCommentList, CommentReuqest, CommentResponse, CommentItem, saveComment, SaveCommentRequest } from '@/apis/comment'
import { toast } from '@apathia/apathia.alert';
import { Comment, AddComment } from '@/components/Comment'
import { useI18n } from 'vue-i18n';

const props = defineProps<{
    talk: TalkItem
}>()

const { t } = useI18n();

const talkComment = ref<CommentItem[]>([])

const page = ref({
    size: 3,
    current: 1,
    count: 0
})

let moreFlag = ref(false)

const hasMore = computed(() => talkComment.value.length < page.value.count)

const showComment = ref(false)
const toggleComment = () => {
    showComment.value = !showComment.value
}

const getTalkComments = async () => {
    const param: CommentReuqest = {
        type: 5,
        topicId: props.talk.id as number,
        current: page.value.current,
        size: page.value.size
    }
    try {
        const res: CommentResponse = await getCommentList(param) as CommentResponse
        if (moreFlag.value) {
            talkComment.value.push(...res.data.records || [])
            moreFlag.value = false
        } else {
            talkComment.value = res.data.records
        }
        page.value.count = res.data.count || 0
    } catch (e: any) {
        toast.danger(e.message)
    }
}

const submitComment = async (commentValue: string) => {
    const param: SaveCommentRequest = {
        commentContent: commentValue,
        type: 5,
        topicId: String(props.talk.id),
    }
    try {
        await saveComment(param)
        await getTalkComments()
    } catch (e: any) {
        toast.danger(e.message)
    }
}

const getMore = async () => {
    moreFlag.value = true
    page.value.current++
    await getTalkComments()
}

onBeforeMount(async () => {
    await getTalkComments()
})
</script>
<style lang='scss' scoped>
.talk-icon {
    max-width: none;
}
</style>