<template>
    <Teleport to=".ap-detail">
        <Transition name="ap">
            <div v-if="visible" class="duration-400">
                <div class="fixed inset-0 h-full w-full bg-gray-600 bg-opacity-50 overflow-auto z-999">
                    <div ref="modalRef"
                        class="flex flex-col relative w-3/5 max-w-screen-sm font-icon-font bg-ap-card bg-opacity-40 rounded-2xl my-72 p-4 mx-auto">
                        <div class="flex justify-end pr-2 text-ap-bright text-3xl cursor-pointer" @click="close">
                            ×
                        </div>
                        <div class="flex justify-center text-ap-normal text-title-1 font-icon-font">
                            {{ t('controls.personal') }}
                        </div>
                        <div class="flex justify-center py-4">
                            <Upload v-model="avatarSrc" class="cursor-pointer" action="/api/users/avatar"
                                :resolve-url="resolveLocation" :headers="userStore.headerAuth" draggable>
                                <template #drag>
                                    <img class="h-24 w-24 rounded-full" :src="(userStore.userInfo?.avatar as string)">
                                </template>
                            </Upload>
                        </div>
                        <div class="px-36 mt-4">
                            <LoginInput v-model="userInfo.nickname" class="mb-12" :label="t('login.nickname')" />
                            <LoginInput v-model="userInfo.website" class="mb-12" :label="t('login.website')" />
                            <LoginInput v-model="userInfo.intro" class="mb-12" :label="t('login.desc')" />
                            <div class="relative">
                                <LoginInput v-model="userInfo.email" :disable="true" class="mb-12"
                                    :label="t('login.email')" />
                                <span class="absolute top-2 right-0 text-ap-normal">
                                    <span class="cursor-pointer" @click="openBindEmail">{{ t('login.bind') }}</span>
                                </span>
                            </div>
                        </div>
                        <div class="mx-24 p-4 pt-6 mb-2 text-center text-ap-normal text-title-2 bg-ap-trans transition-all duration-300 opacity-70 hover:opacity-100 hover:text-ap-bright rounded-md cursor-pointer"
                            @click="submitInfo">
                            {{ t("login.submit") }}
                        </div>
                        <div v-if="emailVis" class="absolute top-0 left-0 h-full w-full z-1000">
                            <VerifyCode v-model:visible="emailVis" />
                        </div>
                    </div>
                </div>
            </div>
        </Transition>
    </Teleport>
</template>

<script lang='ts' setup>
import { useI18n } from 'vue-i18n'
import { useUserStore } from '@/store/user'
import { LoginInput } from '@/components/Input'
import { Upload } from '@apathia/apathia.upload'
import { toast } from '@apathia/apathia.alert'
import VerifyCode from './VerifyCode.vue'
import { submitUserInfo } from '@/apis/user'

interface DetailProps {
    visible: boolean;
}

defineProps<DetailProps>()
const emit = defineEmits(["update:visible"])

const { t } = useI18n()

const userStore = useUserStore()

const close = () => {
    userInfo.value = {
        nickname: userStore.userInfo?.nickname || '',
        website: userStore.userInfo?.website || '',
        intro: userStore.userInfo?.intro || '',
        email: userStore.userInfo?.email || ''
    }
    emit("update:visible", false)
}

const userInfo = ref({
    nickname: userStore.userInfo?.nickname || '',
    website: userStore.userInfo?.website || '',
    intro: userStore.userInfo?.intro || '',
    email: userStore.userInfo?.email || ''
})

const submitInfo = async () => {
    if (emailVis.value) return
    if (userInfo.value.nickname.trim() === '') {
        toast.danger('昵称不能为空')
        return
    }
    const param = {
        nickname: userInfo.value.nickname,
        website: userInfo.value.website,
        intro: userInfo.value.intro
    }
    try {
        await submitUserInfo(param)
        userStore.userInfo ? userStore.userInfo.intro = userInfo.value.intro : ''
        userStore.userInfo ? userStore.userInfo.nickname = userInfo.value.nickname : ''
        userStore.userInfo ? userStore.userInfo.website = userInfo.value.website : ''
        close()
    } catch (e: any) {
        toast.danger(e.message)
    }
}

const emailVis = ref(false)

const avatarSrc = ref(userStore.userInfo?.avatar)

const resolveLocation = (resp: any) => {
    if (userStore.userInfo) {
        userStore.userInfo.avatar = resp.data
    }
    return resp.data || ''
}

const openBindEmail = () => {
    emailVis.value = true
}
</script>