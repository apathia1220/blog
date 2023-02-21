<template>
    <div class="relative z-10">
        <p class="relative flex items-center pt-12 pb-2 mb-8 text-ap-bright text-title-3 font-icon-font">
            <span>{{ t('menu.talks') }}</span>
            <span class="absolute bottom-0 h-1 w-24 rounded-full bg-ap"></span>
        </p>
        <div v-if="isLoading">
            <LoadingCard />
        </div>
        <div v-else>
            <div v-if="!!talksList && talksList.length !== 0">
                <TalkCard v-for="talk in talksList" :key="(talk.id as number)" :talk="talk" />
                <div class="bg-ap-card rounded-xl pt-2 pb-4 cursor-pointer text-center text-2xl font-icon-font text-ap-normal opacity-70 hover:opacity-100 hover:text-ap-bright"
                    @click="goTalkList">
                    <div class="block mt-4">{{ t('controls.more') }}</div>
                </div>
            </div>
            <div v-else class="font-icon-font text-center py-4 text-ap-normal text-2xl">{{ t('settings.noMore') }}~</div>
        </div>
    </div>
</template>

<script lang='ts' setup>
import { toast } from '@apathia/apathia.alert';
import { useI18n } from 'vue-i18n'
import { TalkCard, LoadingCard } from '@/components/Card'
import { getTalkList, TalkItem, TalkResponse } from '@/apis/talks'

const { t } = useI18n()

const router = useRouter()

const talksList = ref<TalkItem[]>([])
const isLoading = ref<boolean>(false)

const getTalks = async () => {
    isLoading.value = true
    const params = {
        size: 3,
        current: 1
    }
    try {
        const res: TalkResponse = await getTalkList(params) as TalkResponse
        talksList.value = res.data.records
        isLoading.value = false
    } catch (e: any) {
        toast.danger(e.message)
    }
}

const goTalkList = () => {
    router.push('/talks')
}

onBeforeMount(async () => {
    await getTalks()
})
</script>
<style lang='scss' scoped></style>