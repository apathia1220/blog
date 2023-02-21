<template>
    <div class=" z-10 relative mb-8">
        <div class="relative font-icon-font text-ap-bright text-6xl my-8">
            <h1>{{ t("menu.album") }}</h1>
            <span class="absolute bottom-0 h-1 w-48 rounded-full bg-ap"></span>
        </div>
        <div v-if="!isLoading && !!albumsData && albumsData.length !== 0"
            class="grid grid-cols-2 gap-4 bg-ap-card p-8 rounded-xl">
            <div class="rounded-md relative cursor-pointer album-container" v-for="album in albumsData" :key="album.id"
                @click="goAlbumDetail(album.id)">
                <img class="h-full w-full rounded-md opacity-30" :src="(album.albumCover as string)">
                <div class="absolute top-8 left-8 w-full text-title-1 text-ap-normal font-icon-font">
                    <div>{{ album?.albumName }}</div>
                    <div class="album-underline w-0 duration-500 ease-in-out"></div>
                    <div class="album-desc opacity-0 translate-x-7/10 duration-500 ease-in-out">{{
                        album?.albumDesc
                    }}</div>
                </div>
            </div>
        </div>
        <div v-else class="font-icon-font text-center py-4 text-ap-bright text-2xl">{{ t('settings.noMore') }}~</div>
    </div>
</template>

<script lang='ts' setup>
import { getAlbumsList, AlbumItem, AlbumResponse } from '@/apis/album'
import { toast } from '@apathia/apathia.alert'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const router = useRouter()
const isLoading = ref(false)

const albumsData = ref<AlbumItem[]>([])

const getAlbums = async () => {
    isLoading.value = true
    try {
        const res: AlbumResponse = await getAlbumsList() as AlbumResponse
        albumsData.value = res.data as AlbumItem[]
        isLoading.value = false
    } catch (e: any) {
        toast.danger(e.message)
    }
}

const goAlbumDetail = (id: number) => {
    router.push('/album/' + id)
}

onBeforeMount(async () => {
    await getAlbums()
})
</script>

<style lang="scss" scoped>
.album-container:hover {
    div {
        color: var(--text-bright);
    }

    .album-underline {
        border-bottom: 0.25rem solid;
        border-radius: 0.25rem;
        width: 80%;
    }

    .album-desc {
        transform: translate(0);
        opacity: 100;
    }
}
</style>