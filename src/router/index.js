import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import CollectionView from '@/views/CollectionView.vue'
import CollectionItemView from '@/views/CollectionItemView.vue'

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
			children: [
				{
					path: '',
					component: CollectionView,
				},
				{
					path: ':id',
					component: CollectionItemView
				}
			]
		},
		{
			path: '/visitas',
			name: 'visitas',
			component:  () => import('@/views/VisitasView.vue')
		},
		{
			path: '/visitar',
			name: 'visitar',
			component:  () => import('@/views/VisitanteView.vue')
		},
		{
			path: '/palestras',
			children: [
				{
					path: '',
					component: () => import('@/views/PalestrasView.vue')
				},
				{
					path: ':id',
					component: () => import('@/views/PalestraView.vue')
				}
			]
		},
		{
			path: '/doacao',
			name: 'doacao',
			component:  () => import('@/views/DoacaoView.vue')
		}
	]
})

export default router
