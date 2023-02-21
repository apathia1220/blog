<template>
    <div class="relative z-20 h-ap-carousel px-8 ml-6 mt-12 mb-8 rounded-2xl shadow-xl bg-ap">
        <div class="absolute bottom-2 left-2 right-2 h-5/6 opacity-90 rounded-2xl bg-ap-card">
            <div class="flex flex-col items-center w-full absolute -top-8">
                <img v-if="appStore.websiteConfig?.authorAvatar"
                    class="rounded-full h-32 w-32 bg-cover border-8 border-solid border-ap-card"
                    :src="appStore.websiteConfig?.authorAvatar || '@/assets/wallpaper.jpg'">
                <img v-else class="rounded-full h-32 w-32 bg-cover border-8 border-solid border-ap-card"
                    src="@/assets/avatar.jpg">
                <h2 class="text-title-1 text-ap-bright font-icon-font text-center pt-4">
                    {{ appStore.websiteConfig?.name || 'Apathia' }}
                </h2>
                <span class="my-4 text-ap-bright font-icon-font">
                    {{ appStore.websiteConfig?.authorIntro || t('settings.noMore') }}</span>
                <a class="my-4" href="https://github.com/apathia1220">
                    <div
                        class="w-12 h-12 diamond-clip-path fill-current text-xl flex items-center justify-center text-ap-bright hover:opacity-50 transition cursor-pointer">
                        <svg class="w-6 h-6 " viewBox="0 0 16 16" version="1.1" xmlns="http://www.w3.org/2000/svg">
                            <path id="right"
                                d="M 8 3.86 C 8.7 3.86 9.38 3.95 10 4.13 C 11.55 3.09 12.22 3.31 12.22 3.31 C 12.66 4.41 12.38 5.23 12.3 5.43 C 12.81 6 13.12 6.7 13.12 7.58 C 13.12 10.65 11.25 11.33 9.47 11.53 C 9.76 11.78 10 12.26 10 13 C 10 14.08 10 14.94 10 15.21 C 10 15.42 10.15 15.67 10.55 15.59 C 13.806 14.491 16 11.437 16 8 C 16 3.58 12.42 0 8 0 Z">
                            </path>
                            <use href="#right" x="-16" style="transform: scaleX(-1);" />
                        </svg>
                    </div>
                </a>
                <div class="w-full flex mt-2 justify-evenly text-ap-bright font-icon-font">
                    <div class="flex flex-col items-center">
                        <span>{{ appStore.articleCount || 0 }}</span>
                        <span>{{ t('menu.article') }}</span>
                    </div>
                    <div class="flex flex-col items-center">
                        <span>{{ appStore.talkCount || 0 }}</span>
                        <span>{{ t('menu.talks') }}</span>
                    </div>
                    <div class="flex flex-col items-center">
                        <span>{{ appStore.categoryCount || 0 }}</span>
                        <span>{{ t('menu.category') }}</span>
                    </div>
                    <div class="flex flex-col items-center">
                        <span>{{ appStore.tagCount || 0 }}</span>
                        <span>{{ t('menu.tags') }}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang='ts' setup>
import { useI18n } from 'vue-i18n'
import { useAppStore } from '@/store/app'

const { t } = useI18n()
const appStore = useAppStore() 
</script>