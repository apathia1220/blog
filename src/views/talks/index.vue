<template>
  <div class="relative z-10">
    <div class="relative font-icon-font text-ap-bright text-6xl my-8">
      <h1>{{ t("menu.talks") }}</h1>
      <span class="absolute bottom-0 h-1 w-48 rounded-full bg-ap"></span>
    </div>
    <div class="grid grid-cols-main mb-4">
      <div>
        <div v-if="isLoading">
          <LoadingCard />
        </div>
        <div v-else>
          <div v-if="!!talksList && talksList.length !== 0">
            <TalkCard v-for="talk in talksList" :key="(talk.id as number)" :talk="talk" />
            <div v-if="hasMore"
              class="bg-ap-card rounded-xl pt-2 pb-4 cursor-pointer text-center text-2xl font-icon-font text-ap-normal opacity-70 hover:opacity-100 hover:text-ap-bright"
              @click="getMore">
              <div class="block mt-4">{{ t('controls.more') }}</div>
            </div>
          </div>
          <div v-else class="font-icon-font text-center py-4 text-ap-bright text-2xl">{{ t('settings.noMore') }}~</div>
        </div>
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
import { TalkCard, LoadingCard } from "../../components/Card";
import UseInfo from "../homepage/UseInfo.vue";
import { Affix } from "../../components/Affix";
import { useI18n } from "vue-i18n";
import { getTalkList, TalkItem, TalkResponse } from "@/apis/talks";
import { toast } from "@apathia/apathia.alert";

const { t } = useI18n()

const isLoading = ref(false)

const talksList = ref<TalkItem[]>([])
const page = ref({
  size: 3,
  current: 1,
  count: 0
})
const hasMore = computed(() => talksList.value.length < page.value.count)

const getTalks = async () => {
  const params = {
    size: page.value.size * page.value.current,
    current: 1
  }
  isLoading.value = true
  try {
    const res: TalkResponse = await getTalkList(params) as TalkResponse
    // talksList.value.push(...res.data.records)
    talksList.value = res.data.records
    page.value.count = res.data.count
    isLoading.value = false
  } catch (e: any) {
    toast.danger(e.message)
  }
}

const getMore = async () => {
  page.value.current++
  await getTalks()
}


onMounted(async () => {
  await getTalks()
})
</script>
<style lang="scss" scoped></style>
