import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'

import './styles/globals.css'
import App from './App.vue'
import routes from '~pages'

console.log('env', import.meta.env.VITE_APP_BASE_URL, process.env.VITE_APP_BASE_URL)

const router = createRouter({
  routes: [
    ...routes,
    {
      path: '/guide',
      redirect: '/guide/getting-started/installation',
    },
    {
      path: '/docs',
      redirect: '/docs/nanogl-node',
    },
    {
      path: '/guide/getting-started',
      redirect: '/guide/getting-started/installation',
    },
    {
      path: '/guide/quick-guides',
      redirect: '/guide/quick-guides/texture-2d',
    },
  ],
  history: createWebHistory(import.meta.env.VITE_APP_BASE_URL || '/'),
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      return { el: to.hash }
    }

    return { top: 0 }
  },
})

createApp(App)
  .use(router)
  .mount('#app');