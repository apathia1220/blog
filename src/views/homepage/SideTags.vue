<template>
    <div class="px-8 ml-6 my-8 rounded-2xl shadow-xl bg-ap-card">
        <div class="relative flex items-center pt-4 pb-2 mb-8 font-icon-font text-ap-bright text-title-3 my-8 upercase">
            <span>{{ t('menu.tags') }}</span>
            <span class="absolute bottom-0 h-1 w-16 rounded-full bg-ap"></span>
        </div>
        <div class="grid grid-cols-2 gap-2 pb-8" v-if="isLoading">
            <ob-skeleton height="32px" width="112px" />
            <ob-skeleton height="32px" width="112px" />
        </div>
        <div v-else>
            <div class="grid grid-cols-2 gap-2 pb-8" v-if="!!tagList && tagList.length !== 0">
                <div class="p-2 bg-ap-bg rounded-lg opacity-80 cursor-pointer
                                                text-center text-xs text-ap-normal hover:text-ap-bright hover:opacity-100"
                    v-for="tag in tagList" :key="tag.id" @click="goArticle(tag.id, tag.tagName)">
                    <span># {{ tag.tagName }}</span>
                    <span class="ml-2 text-pink-500">{{ tag.count }}</span>
                </div>
            </div>
            <div v-else class="font-icon-font text-center pb-4 text-ap-normal text-2xl">{{ t('settings.noMore') }}~
            </div>
        </div>
    </div>
</template>

<script lang='ts' setup>
import { toast } from '@apathia/apathia.alert';
import { useI18n } from 'vue-i18n'
import { getAllTags, type TagItem, type TagListResponse } from '@/apis/tags'

const router = useRouter()

const { t } = useI18n()
const tagList = ref<TagItem[]>([])

const isLoading = ref(false)

const getTags = async () => {
    isLoading.value = true
    try {
        const res: TagListResponse = await getAllTags() as TagListResponse
        tagList.value = res.data
        isLoading.value = false
    } catch (e: any) {
        toast.danger(e.message)
    }
}

const goArticle = (id: number, tagName: string) => {
    router.push(`/article/?tagId=${id}${tagName ? `&tagName=${tagName}` : ''}`)
}

onBeforeMount(() => {
    getTags()
})

</script>
<style lang='scss' scoped></style>