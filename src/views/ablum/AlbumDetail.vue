<template>
    <div class=" z-10 relative mb-8">
        <div class="relative font-icon-font text-ap-bright text-6xl my-8">
            <h1>{{ albums?.photoAlbumName || '' }}</h1>
            <span class="absolute bottom-0 h-1 w-48 rounded-full bg-ap"></span>
        </div>
        <div v-if="!!albums?.photos && albums?.photos.length !== 0" class="flex flex-wrap bg-ap-card p-4 rounded-xl">
            <img class="h-48 m-2 flex-1 cursor-pointer object-cover" v-for="(photo, index) in albums.photos" :key="photo"
                :src="photo" @click="handlePreview(index)">
        </div>

        <div v-else class="font-icon-font text-center py-4 text-ap-bright text-2xl">{{ t('settings.noMore') }}~</div>
    </div>
</template>

<script lang='ts' setup>
import { toast } from '@apathia/apathia.alert';
import { getPhotosByAlbumId, PhotoResponse, PhotoItem } from '@/apis/album'
import { v3ImgPreviewFn } from 'v3-img-preview'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const route = useRoute()

const pages = ref({
    current: 1,
    size: 10
})

const albums = ref<PhotoItem | null>(null)

const handlePreview = (index: number) => {
    v3ImgPreviewFn({ images: albums.value?.photos, index })
}

const getPhotos = async (id: number) => {
    try {
        const res: PhotoResponse = await getPhotosByAlbumId(id, pages.value) as PhotoResponse
        albums.value = res.data as PhotoItem
    } catch (e: any) {
        toast.danger(e.message)
    }
}

onBeforeMount(async () => {
    const id = route.path.split('/')[2]
    if (id) {
        await getPhotos(+id)
    }
})
</script>
<style lang='scss' scoped></style>