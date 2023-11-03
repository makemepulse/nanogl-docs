import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'

import './styles/globals.css'
import App from './App.vue'
import routes from '~pages'

const router = createRouter({
  routes: [
    ...routes,
    {
      path: '/guide/getting-started',
      redirect: '/guide/getting-started/installation',
    },
  ],
  history: createWebHistory(),
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