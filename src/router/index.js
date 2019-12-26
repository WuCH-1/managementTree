import Vue from 'vue';
import VueRouter from 'vue-router';
import button from '@/components/addBtn.vue';
import menu from '@/components/addMenu.vue';
import system from '@/components/addSystem.vue';

Vue.use(VueRouter);


const routes = [
  { path: '/button', component: button },
  { path: '/menu', component: menu },
  { path: '/system', component: system },
];

const router = new VueRouter({
  routes, // (缩写) 相当于 routes: routes
});

export default router;
