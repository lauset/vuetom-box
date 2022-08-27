import { createApp } from 'vue'
import 'tailwindcss/tailwind.css'
import '@/assets/css/app.scss'
import App from './App.vue'
import { setupRouter } from '@/routes'
import { setupLang } from '@/i18n'

const app = createApp(App)

setupLang(app)
setupRouter(app)

app.mount('#app')
