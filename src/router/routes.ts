import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: 'merge-pdf',
        component: () => import('src/pages/MergePdf.vue'),
      },
    ],
  },

  {
    path: '/split-pdf',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: 'split-pdf',
        component: () => import('pages/SplitPdf.vue'),
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
        component: () => import('src/pages/RemoveFromPdf.vue'),
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
