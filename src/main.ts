import { createApp } from 'vue'
import 'normalize.css/normalize.css'
import './styles/index.css'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import { i18n } from './global'
import { setupApathiaTwindTheme } from '@apathia/apathia.twind'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import { registerObSkeleton } from '@/components/LoadingSkeleton'

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
const app = createApp(App)
app.use(pinia).use(i18n).use(router)
registerObSkeleton(app)

setupApathiaTwindTheme()

app.mount('#app')
