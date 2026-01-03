import { createRouter, createWebHistory } from 'vue-router';

const DashboardPage = () => import('../pages/DashboardPage.vue');
const TransactionsPage = () => import('../pages/TransactionsPage.vue');
const SettingsPage = () => import('../pages/SettingsPage.vue');
const AboutPage = () => import('../pages/AboutPage.vue');

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'dashboard', component: DashboardPage },
    { path: '/transactions', name: 'transactions', component: TransactionsPage },
    { path: '/settings', name: 'settings', component: SettingsPage },
    { path: '/about', name: 'about', component: AboutPage }
  ]
});

export default router;
