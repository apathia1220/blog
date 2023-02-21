<template>
    <div class="mb-4">
        <p class="relative flex items-center pt-12 pb-2 mb-8 text-ap-bright text-title-3 font-icon-font upercase">
            <span>{{ t('menu.article') }}</span>
            <span class="absolute bottom-0 h-1 w-24 rounded-full bg-ap"></span>
        </p>

        <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8" v-if="isLoading">
            <LoadingAtricle />
        </div>
        <div v-else>
            <div v-if="!!articleData && articleData.length !== 0">
                <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                    <Card v-for="article in articleData" :key="article.id" :data="(article as ArticleItem)" />
                </div>
                <div
                    class="bg-ap-card rounded-xl mt-4 pt-2 pb-4 text-center text-2xl cursor-pointer font-icon-font text-ap-normal opacity-70 hover:opacity-100 hover:text-ap-bright">
                    <a class="block mt-4" @click="goMoreArticle">{{ t('controls.more') }}</a>
                </div>
            </div>
            <div v-else class="font-icon-font text-center py-4 text-ap-normal text-2xl">{{ t('settings.noMore') }}~</div>
        </div>
    </div>
</template>

<script lang='ts' setup>
import { toast } from '@apathia/apathia.alert';
import { useI18n } from 'vue-i18n'
import { Card, LoadingAtricle } from '@/components/Card'
import { getArticleList } from '@/apis/articles'
import { ArticleItem, ArticleResponse } from '@/store/articles'
import markdown from 'markdown-it'

const router = useRouter()

const { t } = useI18n()

const goMoreArticle = () => {
    router.push('/article')
}

const articleData = ref<ArticleItem[] | null>(null)
const md = new markdown()
const isLoading = ref(false)

const getArticle = async () => {
    const param = {
        current: 1,
        size: 6
    }
    isLoading.value = true
    try {
        const res: ArticleResponse = await getArticleList(param) as ArticleResponse
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
        isLoading.value = false
    } catch (e: any) {
        toast.danger(e.message)
    }
}

onBeforeMount(async () => {
    await getArticle()
})
</script>