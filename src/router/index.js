import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/',
			name: 'home',
			component: HomeView
		},
		{
			path: '/acervo',
			name: 'acervo',
			component:  () => import('../views/AcervoView.vue')
		},
		{
			path: '/visitas',
			name: 'visitas',
			component:  () => import('../views/VisitasView.vue')
		},
		{
			path: '/doacao',
			name: 'doacao',
			component:  () => import('../views/DoacaoView.vue')
		}
	]
})

export default router
