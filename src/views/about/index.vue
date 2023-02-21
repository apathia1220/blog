<template>
  <div class="relative z-10">
    <div class="relative font-icon-font text-ap-bright text-6xl my-8">
      <h1>{{ t("menu.about") }}</h1>
      <span class="absolute bottom-0 h-1 w-48 rounded-full bg-ap"></span>
    </div>
    <div class="grid grid-cols-main mb-4">
      <div class="bg-ap-card rounded-xl p-8 text-ap-normal">
        <div class="relative font-icon-font text-ap-bright text-2xl my-8">
          <h1>{{ t("about.introduction") }}</h1>
          <span class="absolute bottom-0 h-1 w-24 rounded-full bg-ap"></span>
        </div>
        <p>同济大学 电子信息专业</p>
        <div class="relative font-icon-font text-ap-bright text-2xl my-8">
          <h1>{{ t("about.language") }}</h1>
          <span class="absolute bottom-0 h-1 w-56 rounded-full bg-ap"></span>
        </div>
        <p>Python、JavaScript、Go</p>
        <div class="relative font-icon-font text-ap-bright text-2xl my-8">
          <h1>{{ t("about.contact") }}</h1>
          <span class="absolute bottom-0 h-1 w-24 rounded-full bg-ap"></span>
        </div>
        <p>e-mail：1343129638@qq.com</p>
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

const { t } = useI18n();
</script>
<style lang="scss" scoped></style>
