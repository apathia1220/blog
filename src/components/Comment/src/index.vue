<template>
    <CommentItem v-for="(comment, index) in commentList" :key="comment?.id" :comment="comment" />
</template>

<script lang='ts' setup>
import CommentItem from './CommentItem.vue'
import { CommentItem as CommentItemType } from '@/apis/comment'

const props = defineProps<{
    data: Array<CommentItemType | null>
    type: number
    topicId?: number | string
    refetch?: () => Promise<void> | void
}>()

provide('commentType', props.type)
provide('refetchComments', props.refetch ? props.refetch : () => { })
provide('topicId', props.topicId ? props.topicId : null)

const commentList = ref(props.data)
watch(() => props.data, () => {
    commentList.value = props.data
})
</script>
<style lang='scss' scoped></style>