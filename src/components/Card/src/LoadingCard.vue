<template>
    <div class="flex flex-col bg-ap-card rounded-2xl pt-4 pb-2 mb-4">
        <div class="flex">
            <div class="ml-6">
                <img class="talk-icon h-14 w-14 rounded-md" src="@/assets/avatar.jpg" alt="">
            </div>
            <div class="mx-6 w-full">
                <div class="flex flex-col">
                    <ob-skeleton class="mr-2" height="14px" width="120px" />
                    <ob-skeleton class="mt-2 mr-2" height="14px" width="120px" />
                </div>
                <div class="mt-4 w-full">
                    <ob-skeleton class="mt-2 mr-2" height="56px" />
                </div>
            </div>
        </div>
    </div>
</template>

<script lang='ts' setup>

</script>