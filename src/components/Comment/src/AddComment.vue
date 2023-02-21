<template>
    <textarea v-model="commentContent"
        class="w-full shadow-md rounded-md text-ap-normal p-4 focus:outline-none bg-ap-bg resize-none" cols="30"
        rows="5" :placeholder="t('controls.comment')" />
    <div class="text-right">
        <div
            class="mt-5 w-32 text-white p-2 rounded-lg shadow-lg transition transform hover:scale-105 flex float-right bg-ap outline-none cursor-pointer">
            <span class="mt-2 text-center flex-grow font-icon-font" @click="saveComment">{{
                t("menu.comment")
            }}</span>
        </div>
    </div>
</template>

<script lang='ts' setup>
import { toast } from '@apathia/apathia.alert';
import { useI18n } from 'vue-i18n'
import { useUserStore } from '@/store/user'

const user = useUserStore()
const { t } = useI18n()
const commentContent = ref('')

const emit = defineEmits(['save'])

const saveComment = async () => {
    if (!user.userInfo) {
        toast.danger('请先登录,再评论')
        return
    }
    if (commentContent.value.trim() === '') {
        toast.danger('评论内容不能为空')
        return
    }
    try {
        await emit('save', commentContent.value)
        commentContent.value = ''
        toast.success('评论成功')
    } catch (e: any) {
        toast.danger(e.message)
    }
}

</script>
<style lang='scss' scoped>

</style>