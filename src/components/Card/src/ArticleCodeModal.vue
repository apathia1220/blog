<template>
    <Teleport to=".ap-code">
        <Transition name="ap">
            <div v-if="visible" class="duration-400">
                <div class="fixed inset-0 h-full w-full bg-gray-600 bg-opacity-50 overflow-auto z-999">
                    <div ref="modalRef"
                        class="flex flex-col relative w-3/5 max-w-screen-sm font-icon-font bg-ap-card bg-opacity-40 rounded-2xl my-72 p-4 mx-auto">
                        <div class="flex justify-end pr-2 text-ap-bright text-3xl cursor-pointer" @click="close">
                            ×
                        </div>
                        <div class="flex justify-center text-ap-normal text-title-1 font-icon-font">
                            {{ t('login.articleCode') }}
                        </div>
                        <div class="px-24">
                            <LoginInput :label="''" v-model="code" />
                            <div @click="submitCode"
                                class="p-2 pt-4 mt-12 text-center text-ap-normal text-title-2 bg-ap-trans transition-all duration-300 opacity-70 hover:opacity-100 hover:text-ap-bright rounded-md cursor-pointer">
                                {{ t("login.submit") }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Transition>
    </Teleport>
</template>

<script lang='ts' setup>
import { useI18n } from 'vue-i18n'
import { LoginInput } from '@/components/Input'
import { toast } from '@apathia/apathia.alert'
import { accessArticle, getArticleById } from '@/apis/articles'
import { useUserStore } from '@/store/user'

interface DetailProps {
    visible: boolean
    articleId: number
}

const props = defineProps<DetailProps>()
const emit = defineEmits(["update:visible"])
const code = ref('')

const { t } = useI18n()
const router = useRouter()

const userStore = useUserStore()

const close = () => {
    emit("update:visible", false)
}

const submitCode = async () => {
    if (!code.value) {
        toast.danger('请输入文章密码')
        return
    }
    try {
        await accessArticle({
            articleId: props.articleId,
            articlePassword: code.value
        })
        userStore.accessArticles.push(props.articleId)
        close()
        await getArticleById(props.articleId)
        router.push('/article/' + props.articleId)
    } catch (e: any) {
        toast.danger(e.message)
    }
}
</script>