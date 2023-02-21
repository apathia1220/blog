<template>
    <div
        class="card pb-8 relative top-0 z-10 bg-ap-card rounded-2xl text-center 
                                                        cursor-pointer transition-all duration-500 shadow-lg hover:scale-x-105 ">
        <div class="card-content relative top-0 grid grid-rows-3 overflow-hidden h-full">
            <div class="thumbnail row-span-1 relative">
                <img class="block absolute rounded-2xl z-20 bg-cover bg-no-repeat object-cover w-full h-12/10"
                    src="@/assets/wallpaper.jpg">
                <span class="z-30 absolute h-12/10 w-full max:w-12/10 left-0 pointer-events-none opacity-40"></span>
            </div>
            <div class="-my-8 row-span-2 flex flex-col items-start z-40 relative px-6 pb-8 bg-transparent">
                <span>
                    <ob-skeleton height="18px" width="28px" />
                    <ob-skeleton class="ml-4" height="18px" width="28px" />
                </span>
                <h1 class="flex items-center text-xl pt-2 pb-4 text-ap-bright">
                    <ob-skeleton height="24px" width="48px" />
                </h1>
                <p class="article-cont w-full text-content-2 text-ap-normal break-all opacity-60">
                    <ob-skeleton :count="5" height="14px" />
                </p>
                <div class="w-full flex justify-start flex-1 content-end items-end mt-6 text-sm">
                    <img class="w-7 h-7 rounded-full mr-2 hover:opacity-50 cursor-pointer" src="@/assets/avatar.jpg">
                    <span>
                        <ob-skeleton height="18px" width="60px" />
                    </span>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang='ts' setup>

</script>
<style lang='scss' scoped>
.thumbnail {
    &:after {
        pointer-events: none;
        content: '';
        position: absolute;
        z-index: 35;
        top: 13%;
        left: 0;
        height: 120%;
        width: 100%;
        background: var(--article-cover);
    }
}

.article-cont {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 5;
    -webkit-box-orient: vertical
}
</style>