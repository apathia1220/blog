<template>
    <div class="card pb-8 relative top-0 z-10 bg-ap-card rounded-2xl text-center 
                cursor-pointer transition-all duration-500 shadow-lg hover:scale-x-105 ">
        <div class="card-button font-icon-font z-40 w-3/5 absolute top-10 left-1/2 pt-2 pb-1 px-4 bg-ap opacity-0 text-xl text-ap-bright rounded-2xl ease-out duration-500"
            @click="goArticleDetail">
            {{ t('settings.detail') }}
        </div>
        <div class="card-content relative top-0 grid grid-rows-3 overflow-hidden h-full">
            <div class="thumbnail row-span-1 relative">
                <img class="block absolute rounded-2xl z-20 bg-cover bg-no-repeat object-cover w-full h-12/10"
                    :src="data.articleCover">
                <span class="z-30 absolute h-12/10 w-full max:w-12/10 left-0 pointer-events-none opacity-40"></span>
            </div>
            <div class="-my-8 row-span-2 flex flex-col items-start z-40 relative px-6 pb-8 bg-transparent">
                <span>
                    <span class="text-ap-accent text-sm">{{ data.categoryName }}</span>
                    <ul class="inline-flex pl-4 text-xs text-ap-normal">
                        <li v-for="tag in data.tags" class="mr-3">#{{ tag.tagName }}</li>
                    </ul>
                </span>
                <h1 class="flex items-center text-xl pt-2 pb-4 text-ap-bright">
                    {{ data.articleTitle }}
                    <svg v-if="data.status === 2" class="h-6 w-6 ml-2" viewBox="0 0 1024 1024"
                        xmlns="http://www.w3.org/2000/svg" data-v-8337a051="">
                        <path fill="currentColor"
                            d="M224 448a32 32 0 0 0-32 32v384a32 32 0 0 0 32 32h576a32 32 0 0 0 32-32V480a32 32 0 0 0-32-32H224zm0-64h576a96 96 0 0 1 96 96v384a96 96 0 0 1-96 96H224a96 96 0 0 1-96-96V480a96 96 0 0 1 96-96z">
                        </path>
                        <path fill="currentColor"
                            d="M512 544a32 32 0 0 1 32 32v192a32 32 0 1 1-64 0V576a32 32 0 0 1 32-32zm192-160v-64a192 192 0 1 0-384 0v64h384zM512 64a256 256 0 0 1 256 256v128H256V320A256 256 0 0 1 512 64z">
                        </path>
                    </svg>
                </h1>
                <p class="article-cont w-full text-content-2 text-ap-normal break-all opacity-60">
                    {{ data.articleContent }}
                </p>
                <div class="w-full flex justify-start flex-1 content-end items-end mt-6 text-sm">
                    <img class="w-7 h-7 rounded-full mr-2 hover:opacity-50 cursor-pointer" :src="data.author.avatar" alt="">
                    <span>
                        <strong class="text-ap-normal leading-7 hover:opacity-50 cursor-pointer">{{
                            data.author.nickname
                        }}</strong>
                    </span>
                </div>
            </div>
        </div>
    </div>
    <ArticleCodeModal v-model:visible="codeVisibility" :articleId="data.id" />
</template>

<script lang='ts' setup>
import { ArticleItem } from '@/store/articles'
import { toast } from '@apathia/apathia.alert'
import { useI18n } from 'vue-i18n'
import { getArticleById } from '@/apis/articles'
import ArticleCodeModal from './ArticleCodeModal.vue'
import { useUserStore } from '@/store/user'

const { t } = useI18n()
const router = useRouter()

const props = defineProps<{
    data: ArticleItem
}>()

const codeVisibility = ref(false)

const userStore = useUserStore()
const validateAccess = (id: number, status: number) => {
    if (id === null || id === undefined) {
        toast.danger('id为空')
        return
    }
    if (status === null || status === undefined) {
        toast.danger('status为空')
        return
    }

    const index = userStore.accessArticles.indexOf(id)
    if (status === 2 && index === -1) {
        return false
    }
    return true
}

const goArticleDetail = async () => {
    try {
        const isAccess = validateAccess(props.data.id, props.data.status || 1)
        if (!isAccess) {
            codeVisibility.value = true
            return
        }
        await getArticleById(props.data.id)
        router.push('/article/' + props.data.id)
    } catch (e: any) {
        toast.danger(e.message)
    }
}
</script>
<style lang='scss' scoped>
.card-button {
    transform: translate(-50%, 125%);
    background-color: #008bf8;
}

.card:hover .card-button {
    transform: translate(-50%, 50%);
    opacity: 1;
}

.card:hover>.card-content {
    opacity: 0.6;
}

.thumbnail {
    &:after {
        pointer-events: none;
        content: '';
        position: absolute;
        z-index: 35;
        top: 13%;
        left: 0;
        height: 120%;
        width: 100%;
        background: var(--article-cover);
    }
}

.article-cont {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 5;
    -webkit-box-orient: vertical
}
</style>