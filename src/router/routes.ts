import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '',
    component: () => import('src/pages/Local1x1View.vue'),
    meta: { title: 'Home' }
  }
];

export default routes;
