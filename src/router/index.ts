import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/homepage/index.vue')
  },
  {
    path: '/article',
    name: 'Article',
    component: () => import('../views/articles/index.vue')
  },
  {
    path: '/article/:id',
    name: 'ArticleDetail',
    component: () => import('../views/articles/ArticleDetail.vue')
  },
  {
    path: '/talks',
    name: 'talkList',
    component: () => import('../views/talks/index.vue')
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/about/index.vue')
  },
  {
    path: '/message',
    name: 'Message',
    component: () => import('../views/message/index.vue')
  },
  {
    path: '/album',
    name: 'Album',
    component: () => import('../views/ablum/index.vue')
  },
  {
    path: '/album/:id',
    name: 'AlbumDetail',
    component: () => import('../views/ablum/AlbumDetail.vue')
  },
  {
    path: '/404',
    name: '404',
    component: () => import('../views/404/index.vue')
  },
  {
    path: '/:catchAll(.*)',
    redirect: '/404',
    hidden: true
  }
]

export default createRouter({
  history: createWebHistory(),
  routes
})
