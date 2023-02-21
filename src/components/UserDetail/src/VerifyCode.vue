<template>
    <div class="absolute top-36 left-32 w-3/5">
        <div v-if="visible" class="flex w-full flex-col font-icon-font bg-ap-bg bg-opacity-40 rounded-2xl p-4">
            <div class="flex justify-end pr-2 text-ap-bright text-3xl cursor-pointer" @click="close">
                ×
            </div>
            <div class="flex justify-center text-ap-normal text-title-1 font-icon-font">
                {{ t('controls.personal') }}
            </div>
            <div class="mt-8 px-12">
                <div class="relative">
                    <LoginInput v-model="emailForm.email" class="mb-12" :label="t('login.email')" />
                    <span class="absolute top-3 right-0 text-ap-normal">
                        <span v-if="codeTime === 60" class="cursor-pointer" @click="getEmailCode">{{
                            t("login.sendCode")
                        }}</span>
                        <span v-else>{{ codeTime }}</span>
                    </span>
                </div>
                <LoginInput v-model="emailForm.code" class="mb-12" :label="t('login.code')" />
                <div @click="handleBind"
                    class="p-2 pt-4 mt-12 text-center text-ap-normal text-title-2 bg-ap-trans transition-all duration-300 opacity-70 hover:opacity-100 hover:text-ap-bright rounded-md cursor-pointer">
                    {{ t("login.bind") }}
                </div>
            </div>
        </div>
    </div>
</template>

<script lang='ts' setup>
import { getCode, bindEmail } from '@/apis/user';
import { toast } from '@apathia/apathia.alert';
import { useI18n } from 'vue-i18n'
import { LoginInput } from '@/components/Input'
import { UserStore, useUserStore } from '@/store/user'

interface DetailProps {
    visible: boolean;
}

defineProps<DetailProps>()
const emit = defineEmits(["update:visible"])

const close = () => {
    emit("update:visible", false)
}

const { t } = useI18n()
const emailForm = ref({
    email: '',
    code: null
})

const codeTime = ref(60);
let codeInterval: NodeJS.Timer | undefined = undefined;
const getEmailCode = async () => {
    try {
        if (emailForm.value.email) {
            await getCode(emailForm.value.email)
        } else {
            toast.danger('请输入邮箱')
            return
        }
    } catch (e: any) {
        toast.danger(e.message);
    }
    codeInterval = setInterval(() => {
        if (codeTime.value > 0) {
            codeTime.value -= 1;
        } else {
            codeTime.value = 60;
            clearInterval(codeInterval);
        }
    }, 1000);
};

const user: UserStore = useUserStore()

const handleBind = async () => {
    if (!emailForm.value.email) {
        toast.danger('请输入邮箱')
        return
    }
    if (!emailForm.value.code) {
        toast.danger('请输入验证码')
        return
    }
    try {
        await bindEmail({
            email: emailForm.value.email,
            code: emailForm.value.code
        })
        user.userInfo ? user.userInfo.email = emailForm.value.email : ''
        toast.success('绑定邮箱成功')
        close()
    } catch (e: any) {
        toast.danger(e.message)
    }
}
</script>
<style lang='scss' scoped>

</style>