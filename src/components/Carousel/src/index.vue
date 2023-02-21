<template>
    <div v-if="data.length" class="relative m-1 z-10 shadow-lg" @mouseenter="stopAutoPlay" @mouseleave="autoPlay">
        <!-- Carousel wrapper -->
        <div class="relative overflow-hidden rounded-xl">
            <div v-for="(item, index) in data" :key="index">
                <div v-show="index === currentIndex"
                    class="grid grid-cols-2 grid-rows-none w-full h-96 relative top-0 z-10 shadow-lg overflow-hidden bg-ap-card duration-700 ease-in-out">
                    <div class="relative row-auto article-img">
                        <img class="block absolute z-20 left-0 bg-cover h-full w-12/10 max-w-12/10 object-cover"
                            :src="item.articleCover">
                    </div>
                    <div class="flex flex-col relative p-12 z-40 row-auto text-ap-normal">
                        <span>
                            <b class="text-ap-accent uppercase">{{ item.categoryName }}</b>
                            <div class="inline-flex pl-4">
                                <em v-for="tag in item.tags" :key="tag.tagName" class="pl-4">#{{ tag.tagName }}</em>
                            </div>
                        </span>
                        <h1 class="text-title-1 mt-4 mb-8 font-extrabold cursor-pointer" @click="goArticleDetail(item.id)">
                            {{ item.articleTitle }}
                        </h1>
                        <p class="text-content-1 pr-4 overflow-hidden max-h-36 line-clamp-5 overflow-ellipsis"
                            v-html="markdownToHtml(item.articleContent)" />
                        <div class="w-full flex justify-start flex-1 content-end items-end text-sm pt-6">
                            <img class="h-6 w-6 rounded-full hover:opacity-50 cursor-pointer" :src="item.author.avatar"
                                alt="">
                            <p class="ml-4 hover:opacity-50 cursor-pointer text-ap-normal">{{
                                item.author.nickname
                            }}
                            </p>
                            <p class="ml-4">
                                {{ t('settings.shared-on') }}
                                {{ t(`settings.months[${new Date(item.createTime).getMonth()}]`) }}
                                {{ new Date(item.createTime).getDate() }},{{ new
                                    Date(item.createTime).getFullYear() }}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- Slider indicators -->
        <div class="absolute z-40 flex space-x-3 -translate-x-1/2 bottom-5 left-1/2">
            <button v-for="(_, index) in data" :key="index" type="button"
                :style="{ opacity: index === currentIndex ? '1' : '' }"
                class="w-3 h-3 rounded-full bg-ap-normal opacity-50 hover:opacity-100" @click="goTo(index)" />
        </div>
        <!-- Slider controls -->
        <div @click="goPrev"
            class="absolute top-0 left-0 z-40 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none">
            <span class="inline-flex items-center justify-center rounded-full w-12 h-12 group-focus:outline-none">
                <svg aria-hidden="true" class="w-10 h-10 text-ap-bright opacity-50 hover:opacity-100" fill="none"
                    stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
                </svg>
            </span>
        </div>
        <div @click="goNext"
            class="absolute top-0 right-0 z-40 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none">
            <span class="inline-flex items-center justify-center rounded-full w-12 h-12 group-focus:outline-none">
                <svg aria-hidden="true" class="w-10 h-10 text-ap-bright opacity-50 hover:opacity-100" fill="none"
                    stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                </svg>
            </span>
        </div>
    </div>
    <div v-else class="relative m-1 z-10 shadow-lg">
        <!-- Carousel wrapper -->
        <div class="relative overflow-hidden rounded-xl">
            <div
                class="grid grid-cols-2 grid-rows-none w-full h-98 relative top-0 z-10 shadow-lg overflow-hidden bg-ap-card duration-700 ease-in-out">
                <div class="relative row-auto article-img">
                    <img class="block absolute z-20 left-0 bg-cover h-full w-12/10 max-w-12/10 object-cover"
                        src="@/assets/wallpaper.jpg">
                </div>
                <div class="flex flex-col relative p-12 z-40 row-auto text-ap-normal">
                    <span>
                        <ob-skeleton tag="b" height="20px" width="35px" />
                        <div class="inline-flex pl-4">
                            <ob-skeleton class="ml-2" :count="2" tag="li" height="16px" width="35px" />
                        </div>
                    </span>
                    <ob-skeleton class="my-8" tag="h1" height="3rem" />
                    <ob-skeleton tag="p" :count="5" height="20px" />
                    <div class="article-footer">
                        <div class="flex flex-row items-center mt-6">
                            <ob-skeleton class="mr-2" height="28px" width="28px" :circle="true" />
                            <span class="text-ob-dim mt-1">
                                <ob-skeleton height="20px" width="150px" />
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang='ts' setup>
import router from '@/router';
import { TopFeatureArticleItem } from '@/store/articles'
import { markdownToHtml } from '@/utils'
import { useI18n } from 'vue-i18n'

interface CarouselProps {
    Artilcedata: TopFeatureArticleItem[]
    delay?: number
}

const props = withDefaults(defineProps<CarouselProps>(), {
    Artilcedata: () => [],
    delay: 5000
})

const { t } = useI18n()

const data = ref<TopFeatureArticleItem[]>(props.Artilcedata || [])
const currentIndex = ref(0)

const goNext = () => {
    if (currentIndex.value >= data.value.length - 1) {
        currentIndex.value = 0
    } else {
        currentIndex.value += 1
    }
}

const goPrev = () => {
    if (currentIndex.value <= 0) {
        currentIndex.value = data.value.length - 1
    } else {
        currentIndex.value -= 1
    }
}

const goTo = (index: number) => {
    currentIndex.value = index
}

let timer: NodeJS.Timer | null = null

const autoPlay = () => {
    timer = setInterval(() => {
        goNext();
    }, props.delay)
}

const stopAutoPlay = () => {
    if (timer != null) {
        clearInterval(timer)
        timer = null
    }
}

const goArticleDetail = (id: number) => {
    router.push('/article/' + id)
}

onMounted(() => {
    autoPlay();
})

onBeforeMount(() => {
    stopAutoPlay()
})
</script>