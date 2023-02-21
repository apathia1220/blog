<template>
    <div class="relative w-full mt-1 pt-2 bg-ap">
        <div class="flex justify-center py-4 bg-ap-bg">
            <ul class="flex flex-col text-ap-normal font-icon-font justify-center items-center">
                <li class="mt-2">Copyright © 2022 - {{ currentYear }} {{ app.websiteConfig?.author || 'Apathia' }}
                </li>
                <li class="mt-2">备案</li>
            </ul>
        </div>
    </div>
</template>

<script lang='ts' setup>
import { useAppStore } from '@/store/app'

const app = useAppStore()
const currentYear = new Date().getFullYear()
</script>