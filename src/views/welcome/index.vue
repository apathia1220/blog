<template>
    <div class="flex flex-col items-center justify-center min-h-screen bg-cover welcome-bg" @click="changeStateFn">
        <div class=" flex w-full items-center justify-center font-icon-font text-9xl text-indigo-300 opacity:60 pb-96">
            <v-typical class="blink"
                :steps="['', 500, 'Wel', 500, 'Wel Come', 500, 'Wel Come to', 500, 'Wel Come to Apathia!', 5000]"
                :loop="Infinity" :wrapper="'h2'"></v-typical>
        </div>
    </div>
</template>

<script lang='ts' setup>
import VTypical from 'vue-typical'

interface WelcomeProps {
    changeStateFn: () => void;
}
defineProps<WelcomeProps>()
</script>

<style scoped>
.welcome-bg {
    background-image: url("../../assets/wallpaper.jpg")
}

.blink::after {
    content: '|';
    animation: blink 1s infinite step-start;
}

@keyframes blink {
    50% {
        opacity: 0;
    }
}
</style>