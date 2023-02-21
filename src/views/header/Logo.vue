<template>
    <div class="flex items-center self-stretch relative z-50">
        <!-- <img class="h-48" src="../../assets/apathia.svg" alt="apathia"> -->
        <div class="text-white text-2xl font-medium font-icon-font cursor-pointer" @click="goHomePage">Apathia</div>
    </div>
</template>

<script lang='ts' setup>
import { useRouter } from 'vue-router'

const router = useRouter()
const goHomePage = () => {
    router.push('/')
}
</script>