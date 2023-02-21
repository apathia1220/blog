<template>
    <div>
        <Carousel :Artilcedata="(article as TopFeatureArticleItem[])" />
        <div></div>
        <div class="grid grid-cols-main">
            <div>
                <HomeTalks />
                <HomeArticle />
            </div>
            <div>
                <UseInfo />
                <SideTags />
                <SideCate />
            </div>
        </div>
    </div>
</template>

<script lang='ts' setup>
import { Carousel } from '@/components/Carousel'
import HomeTalks from './HomeTalks.vue'
import HomeArticle from './HomeArticles.vue'
import SideTags from './SideTags.vue'
import UseInfo from './UseInfo.vue'
import SideCate from './SideCate.vue'
import { useArticleStore, TopFeatureArticleItem } from '@/store/articles'

const articleStore = useArticleStore()

const article = computed(() => articleStore.featuredArticles?.length === 0 ? [articleStore.topArticle] : articleStore.featuredArticles)

</script>