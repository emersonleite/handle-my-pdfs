import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: 'index-page',
        component: () => import('pages/IndexPage.vue'),
      },
    ],
  },

  {
    path: '/remove-page',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: 'remove-page',
        component: () => import('pages/RemovePage.vue'),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
