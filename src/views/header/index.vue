<template>
    <header class="flex justify-between items-center my-0 py-4 z-50">
        <Logo />
        <Navigation />
        <Control />
    </header>

</template>

<script lang='ts' setup>
import Control from './Controls.vue'
import Navigation from './Navigation.vue'
import Logo from './Logo.vue'
</script>