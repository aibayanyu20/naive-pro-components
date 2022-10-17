import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from '~/routes'
import i18n from '~/locales'
import { useIcons } from '~/icons'
import '@unocss/reset/tailwind.css'
import 'uno.css'
import '~/assets/styles/index.less'

/**
 * 解决tailwind的样式冲突
 */
const meta = document.createElement('meta')
meta.name = 'naive-ui-style'
document.head.appendChild(meta)
const app = createApp(App)

useIcons(app)

app
  .use(router)
  .use(createPinia())
  .use(i18n)

app.mount('#app')
