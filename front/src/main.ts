import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'

import pinia from '@/services/pinia.ts'

createApp(App).use(pinia).mount('#app')
