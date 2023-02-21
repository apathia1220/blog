<template>
    <div class="flex items-center justify-center font-icon-font text-white text-control z-50">
        <div class="flex items-center cursor-pointer" @click="toggleLanguage">
            <svg class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24"
                fill="currentColor">
                <path
                    d="M12,0A12,12,0,1,0,24,12,12.013,12.013,0,0,0,12,0Zm8.647,7H17.426a19.676,19.676,0,0,0-2.821-4.644A10.031,10.031,0,0,1,20.647,7ZM16.5,12a10.211,10.211,0,0,1-.476,3H7.976A10.211,10.211,0,0,1,7.5,12a10.211,10.211,0,0,1,.476-3h8.048A10.211,10.211,0,0,1,16.5,12ZM8.778,17h6.444A19.614,19.614,0,0,1,12,21.588,19.57,19.57,0,0,1,8.778,17Zm0-10A19.614,19.614,0,0,1,12,2.412,19.57,19.57,0,0,1,15.222,7ZM9.4,2.356A19.676,19.676,0,0,0,6.574,7H3.353A10.031,10.031,0,0,1,9.4,2.356ZM2.461,9H5.9a12.016,12.016,0,0,0-.4,3,12.016,12.016,0,0,0,.4,3H2.461a9.992,9.992,0,0,1,0-6Zm.892,8H6.574A19.676,19.676,0,0,0,9.4,21.644,10.031,10.031,0,0,1,3.353,17Zm11.252,4.644A19.676,19.676,0,0,0,17.426,17h3.221A10.031,10.031,0,0,1,14.605,21.644ZM21.539,15H18.1a12.016,12.016,0,0,0,.4-3,12.016,12.016,0,0,0-.4-3h3.437a9.992,9.992,0,0,1,0,6Z" />
            </svg>
            <span class="ml-4">{{ t('controls.language') }}</span>
        </div>
        <div class="avator relative" v-if="user.userInfo">
            <img class="mx-4 h-8 w-8 rounded-full cursor-pointer" :src="(user.userInfo?.avatar as string)" alt="" />
            <div class="pt-2">
                <div
                    class="logout absolute hidden right-0 w-36 text-center mr-4 py-4 bg-ap-bg text-ap-bright opacity-80 rounded-xl hover:block">
                    <div class="w-full leading-normal cursor-pointer pt-2 pb-1 hover:bg-gray-600" @click="openDetail">
                        {{ t('controls.personal') }}
                    </div>
                    <div class=" w-full leading-relaxed pt-2 pb-1 cursor-pointer hover:bg-gray-600" @click="logOut">
                        {{ t('controls.logout') }}
                    </div>
                </div>
            </div>
        </div>
        <div v-else class="mx-4 cursor-pointer" @click="handleLogin">
            {{ t('controls.login') }}
        </div>
        <ThemeSwitch :theme-state="themeState" @toggle-theme="toggleTheme" />
        <User v-model:visible="showLogin" />
        <UserDetail v-model:visible="showDetail" />
    </div>
</template>

<script lang='ts' setup>
import { useI18n } from 'vue-i18n'
import { ThemeSwitch } from '@/components/Switch'
import { User } from '@/components/Login'
import { UserDetail } from '@/components/UserDetail'
import { useToggleTheme } from '@/hooks'
import { useUserStore } from '@/store/user'
import { logout } from '@/apis/user'
import { toast } from '@apathia/apathia.alert'

const { themeState, toggleTheme } = useToggleTheme()

const { locale, t } = useI18n()
const user = useUserStore()

const toggleLanguage = () => {
    if (locale.value === 'en' || locale.value === '') {
        localStorage.setItem('locale', 'cn')
        locale.value = 'cn'
        document.body.classList.remove('lang-en')
        document.body.classList.add('lang-cn')
    } else {
        localStorage.setItem('locale', 'en')
        locale.value = 'en'
        document.body.classList.remove('lang-cn')
        document.body.classList.add('lang-en')
    }
}

const showLogin = ref(false)

const handleLogin = () => {
    showLogin.value = true
}

const logOut = async () => {
    try {
        await logout()
        user.userInfo = null
        user.token = ''
        sessionStorage.removeItem('userStore')
        toast.success('退出登录成功')
    } catch (e: any) {
        toast.danger(e.message)
    }
}

const showDetail = ref(false)

const openDetail = () => {
    showDetail.value = true
}
</script>

<style lang="scss" scoped>
.avator:hover {

    .logout {
        display: block;
    }
}
</style>