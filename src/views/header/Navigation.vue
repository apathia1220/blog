<template>
    <nav class="flex items-center justify-center text-control z-50">
        <ul class="list-none text-white px-1" v-for="(menu, _) in menuList" :key="menu.path">
            <li class="rounded-md cursor-pointer px-4 pt-2 pb-1 font-icon-font leading-7 transition duration-500 ease-in-out hover:bg-ap-card hover:text-ap-bright"
                @click="goPage(menu.path)">
                {{ t(`menu.${menu.name }`) }}
            </li>
        </ul>
    </nav>
</template>

<script lang='ts' setup>
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { menuList } from '@/config'

const { t } = useI18n()
const router = useRouter()

const goPage = (path: string) => {
    if (!path) return
    router.push(path)
}

</script>
<style lang='scss' scoped>

</style>