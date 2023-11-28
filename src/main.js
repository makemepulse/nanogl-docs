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
      redirect: '/guide/getting-started/introduction',
    },
    {
      path: '/guide',
      name: 'guide',
      redirect: '/guide/getting-started/introduction',
    },
    {
      path: '/guide/getting-started',
      name: 'getting-started',
      redirect: '/guide/getting-started/introduction',
    },
    {
      path: '/guide/quick-guides',
      name: 'quick-guides',
      redirect: '/guide/quick-guides/texture-2d',
    },
    {
      path: '/examples',
      name: 'examples',
      redirect: '/examples/triangle',
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
      const elem = document.querySelector(to.hash)

      if (!elem) {
        return { el: to.hash }
      }

      const offset = parseFloat(getComputedStyle(elem).scrollMarginTop)
      return {
        el: to.hash,
        top:  offset
      }
    }

    return { top: 0 }
  },
})

createApp(App)
  .use(router)
  .mount('#app');