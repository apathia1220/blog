<template>
    <div class="flex">
        <img class="talk-icon h-14 w-14 rounded-md" :src="(comment?.avatar as string)" alt="" />
        <div class="flex-1 ml-6">
            <div class="flex flex-col bg-ap-bg p-4 rounded-md mb-4">
                <div class="flex justify-between text-xs mt-1">
                    <div class="flex flex-1 justify-between">
                        <span class="text-ap-normal">{{ comment?.nickname }}</span>
                        <span class="ml-2 text-ap-normal opacity-70">{{ formatTime(comment?.createTime || '') }}</span>
                    </div>
                </div>
                <div class="flex mt-4 justify-between">
                    <p class="text-content-2 text-ap-normal hover:text-ap-bright pr-2">
                        {{ comment?.commentContent }}
                    </p>
                    <div v-if="!showReplay" class="flex items-end text-ap-accent hover:opacity-50 cursor-pointer">
                        <span class="w-8 text-right font-icon-font" @click="toggleReplay">{{
                            t('settings.replay')
                        }}</span>
                    </div>
                </div>
            </div>
            <CommentReplayItem v-for="reply in comment?.replyDTOs" :key="reply.id" :reply="reply" />
            <CommentReplayForm v-show="showReplay" @close="toggleReplay" :replyUser="(comment?.userId as number)" />
        </div>
    </div>
</template>

<script lang='ts' setup>
import { useI18n } from 'vue-i18n'
import CommentReplayForm from './CommentReplayForm.vue'
import CommentReplayItem from './CommentReplayItem.vue'
import { CommentItem } from '@/apis/comment'
import { formatTime } from '@/utils'

const props = defineProps<{
    comment: CommentItem | null,
}>()

const { t } = useI18n()
provide('parentId', props.comment?.id)

const showReplay = ref(false)

const toggleReplay = () => {
    showReplay.value = !showReplay.value
}
</script>