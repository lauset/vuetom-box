import { createApp } from 'vue'
import 'tailwindcss/tailwind.css'
import '@/assets/css/app.scss'
import App from './App.vue'
import { setupRouter } from '@/routes'
import { setupLang } from '@/i18n'
import { setupComs } from '@/components'

const app = createApp(App)

setupLang(app)
setupRouter(app)
setupComs(app)

app.mount('#app')
