<template>
  <div class="relative z-10">
    <div class="relative font-icon-font text-ap-bright text-6xl my-8">
      <h1>{{ t("menu.about") }}</h1>
      <span class="absolute bottom-0 h-1 w-48 rounded-full bg-ap"></span>
    </div>
    <div class="grid grid-cols-main mb-4">
      <div class="bg-ap-card rounded-xl p-8 text-ap-normal">
        <div class="article-html relative w-full bg-ap-card text-ap-normal rounded-2xl p-6" v-html="aboutItem"></div>
      </div>
      <div class="-mt-12">
        <Affix>
          <UseInfo />
        </Affix>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import UseInfo from "../homepage/UseInfo.vue";
import { Affix } from "@/components/Affix";
import { useI18n } from "vue-i18n";
import { getAbout, AboutResponse } from '@/apis/about'
import { markdownToHtml } from "@/utils";
import { toast } from "@apathia/apathia.alert";

const { t } = useI18n()

const aboutItem = ref('')
const getAboutData = async () => {
  try {
    const res: AboutResponse = await getAbout() as AboutResponse
    aboutItem.value = markdownToHtml(res.data.content)
  } catch (e: any) {
    toast.danger(e.message)
  }
}

onBeforeMount(() => {
  getAboutData()
})
</script>
