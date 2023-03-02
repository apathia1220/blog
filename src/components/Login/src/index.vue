<template>
    <Teleport to=".ap-login">
        <Transition name="ap">
            <div v-if="visible" class="duration-400">
                <div class="fixed inset-0 h-full w-full bg-gray-600 bg-opacity-50 overflow-auto z-999">
                    <div ref="modalRef"
                        class="flex flex-col w-3/5 max-w-screen-sm font-icon-font bg-ap-card bg-opacity-40 rounded-2xl my-96 p-4 mx-auto">
                        <div class="flex justify-end pr-2 text-ap-bright text-3xl cursor-pointer" @click="close">
                            ×
                        </div>
                        <template v-if="hasAccount">
                            <div class="flex justify-center text-ap-normal text-title-1">
                                {{ t("login.login") }}
                            </div>
                            <div class="mx-24 mt-8">
                                <LoginInput v-model="userForm.username" class="mb-12" :label="t('login.email')" />
                                <LoginInput v-model="userForm.password" type="password" :label="t('login.password')"/>
                            </div>
                            <div @click="handleSubmit('login')"
                                class="mx-24 p-4 pt-6 mt-12 text-center text-ap-normal text-title-2 bg-ap-trans transition-all duration-300 opacity-70 hover:opacity-100 hover:text-ap-bright rounded-md cursor-pointer">
                                {{ t("login.login") }}
                            </div>
                            <div @click="toggleLogin"
                                class="mt-8 mx-24 text-content-1 text-center text-ap-bright opacity-70 hover:opacity-100 cursor-pointer transition-all duration-300">
                                {{ t("login.nologin") }}
                            </div>
                        </template>
                        <template v-else>
                            <div class="flex justify-center text-ap-normal text-title-1">
                                {{ t("login.register") }}
                            </div>
                            <div class="mx-24 mt-8">
                                <div class="relative">
                                    <LoginInput v-model="userForm.username" class="mb-12" :label="t('login.email')" />
                                    <span class="absolute top-4 right-0 text-ap-normal">
                                        <span v-if="codeTime === 60" class="cursor-pointer" @click="getEmailCode">{{
                                            t("login.sendCode")
                                        }}</span>
                                        <span v-else>{{ codeTime }}</span>
                                    </span>
                                </div>
                                <LoginInput v-model="userForm.password" class="mb-12" :label="t('login.password')" />
                                <LoginInput v-model="confirmPassword" class="mb-12" :label="t('login.confirmPd')" />
                                <LoginInput v-model="userForm.code" type="password" :label="t('login.code')" />
                            </div>
                            <div @click="handleSubmit('register')"
                                class="mx-24 p-4 pt-6 mt-12 text-center text-ap-normal text-title-2 bg-ap-trans transition-all duration-300 opacity-70 hover:opacity-100 hover:text-ap-bright rounded-md cursor-pointer">
                                {{ t("login.register") }}
                            </div>
                            <div @click="toggleLogin"
                                class="mt-8 mx-24 text-content-1 text-center text-ap-bright opacity-70 hover:opacity-100 cursor-pointer transition-all duration-300">
                                {{ t("login.haslogin") }}
                            </div>
                        </template>
                    </div>
                </div>
            </div>
        </Transition>
    </Teleport>
</template>

<script lang="ts" setup>
import { toast } from '@apathia/apathia.alert'
import { onClickOutside } from "@/hooks";
import { useI18n } from "vue-i18n";
import { LoginInput } from "../../Input";
import { getCode, login, register } from "@/apis/user";
import { useUserStore, UserInfo, UserResponse } from '@/store/user'

interface LoginProps {
    visible: boolean;
}

defineProps<LoginProps>();
const emit = defineEmits(["update:visible"]);
const modalRef = ref<HTMLElement | null>(null);

const close = () => {
    hasAccount.value = true;
    emit("update:visible", false);
};

onClickOutside(modalRef, close);

const { t } = useI18n();
const user = useUserStore()

const hasAccount = ref(true);

const toggleLogin = () => {
    userForm.username = ""
    userForm.password = ""
    userForm.code = null
    hasAccount.value = !hasAccount.value;
};

const userForm = reactive({
    username: "",
    password: "",
    code: null
})

const confirmPassword = ref('')

const codeTime = ref(60);
let codeInterval: NodeJS.Timer | undefined = undefined;
const getEmailCode = async () => {
    try {
        if (userForm.username) {
            await getCode(userForm.username)
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

const handleSubmit = async (type: 'login' | 'register') => {
    if (userForm.username.trim() === '') {
        toast.danger('请输入用户名')
        return
    }
    if (userForm.password.trim() === '') {
        toast.danger('请输入密码')
        return
    }
    if (!hasAccount && userForm.code === null) {
        toast.danger('请输入验证码')
        return
    }
    if (!hasAccount && userForm.password.trim() !== confirmPassword.value.trim()) {
        toast.danger('两次输入的密码不一致')
        return
    }
    try {
        let res: UserResponse | null = null
        if (type === 'login') {
            res = await login({ username: userForm.username, password: userForm.password }) as UserResponse
            toast.success('登录成功');
        } else if (type === 'register') {
            await register({ username: userForm.username, password: userForm.password, code: userForm.code });
            toast.success('注册成功');
            res = await login({ username: userForm.username, password: userForm.password }) as UserResponse
        } else {
            toast.danger('请输入类型')
            return
        }
        user.userInfo = res.data as UserInfo
        user.token = res.data && res.data.token
        close()
    } catch (e: any) {
        toast.danger(e.message)
    }
}
</script>
<style scoped>
.ap-leave-to {
    opacity: 0;
}
</style>
