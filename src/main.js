import '@/assets/base.css'
import '@/assets/main.css'

import 'primevue/resources/themes/aura-light-green/theme.css'
import 'primeicons/primeicons.css'
import '@/assets/primevue-custom.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config'
import ToastService from 'primevue/toastservice'

import App from '@/App.vue'
import router from '@/router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(PrimeVue)
app.use(ToastService)

app.mount('#app')
