<script setup lang="ts">
import Header from "./views/header/index.vue";
import Footer from "./views/footer/index.vue";
import Welcome from "./views/welcome/index.vue";
import { useToggle } from "./hooks";
import { getWebsiteConfig } from "@/apis/config";
import { toast } from "@apathia/apathia.alert";
import { useAppStore, AppResponse } from '@/store/app'
import { getTopAndFeaturedArticles } from '@/apis/articles'
import { useArticleStore, TopArticleResponse, TopFeatureArticleItem } from '@/store/articles'

const [welcomeState, setWelcomeState] = useToggle();
const appStore = useAppStore()
const articleStore = useArticleStore()

const fetchWebsiteConfig = async () => {
  try {
    const res: AppResponse = await getWebsiteConfig() as AppResponse
    appStore.articleCount = res.data?.articleCount as number
    appStore.viewCount = res.data?.viewCount as number
    appStore.talkCount = res.data?.talkCount as number
    appStore.categoryCount = res.data?.categoryCount as number
    appStore.tagCount = res.data?.tagCount as number
    appStore.websiteConfig = res.data?.websiteConfigDTO as Record<string, any>
  } catch (e: any) {
    toast.danger(e.message);
  }
};

const getTopArticles = async () => {
  try {
    const res: TopArticleResponse = await getTopAndFeaturedArticles() as TopArticleResponse
    articleStore.featuredArticles = res.data?.featuredArticles as TopFeatureArticleItem[]
    articleStore.topArticle = res.data?.topArticle as TopFeatureArticleItem[]
  } catch (e: any) {
    toast.danger(e.message)
  }
}

onBeforeMount(() => {
  fetchWebsiteConfig()
  getTopArticles()
})
</script>

<template>
  <div class="ap-login"></div>
  <div class="ap-detail"></div>
  <div class="ap-code"></div>
  <Welcome v-if="welcomeState" :change-state-fn="setWelcomeState" />
  <div v-else class="h-full min-w-full min-h-screen bg-ap-bg">
    <div class="max-w-10/12 lg:max-w-screen-2xl min-h-content my-0 mx-auto px-8">
      <Header />
      <div class="ap-bgimage"></div>
      <router-view v-slot="{ Component }">
        <transition name="fade-slide-y" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </div>
    <Footer />
  </div>
</template>
