import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'

import './styles/globals.css'
import App from './App.vue'
import routes from '~pages'

import NotFound from './components/NotFound.vue'

const router = createRouter({
  routes: [
    ...routes,
    {
      path: '/',
      name: 'homepage',
      redirect: '/guide/getting-started/installation',
    },
    {
      path: '/guide',
      name: 'guide',
      redirect: '/guide/getting-started/installation',
    },
    {
      path: '/guide/getting-started',
      name: 'getting-started',
      redirect: '/guide/getting-started/installation',
    },
    {
      path: '/guide/quick-guides',
      name: 'quick-guides',
      redirect: '/guide/quick-guides/texture-2d',
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: NotFound
    }
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