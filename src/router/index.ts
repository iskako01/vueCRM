import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home'
const firebase = require('../firebase.js');

const routes = [
	{
		path: '/login',
		name: 'login',
		meta: { layout: 'empty' },
		component: () => import('../views/Login'),
	},
	{
		path: '/register',
		name: 'register',
		meta: { layout: 'empty' },
		component: () => import('../views/Register'),
	},
	{
		path: '/',
		name: 'home',
		component: Home,
		meta: { layout: 'main', auth: true },
	},
	{
		path: '/categories',
		name: 'categories',
		meta: { layout: 'main', auth: true },
		component: () => import('../views/Categories'),
	},
	{
		path: '/history',
		name: 'history',
		meta: { layout: 'main', auth: true },
		component: () => import('../views/History'),
	},
	{
		path: '/planning',
		name: 'planning',
		meta: { layout: 'main', auth: true },
		component: () => import('../views/Planning'),
	},
	{
		path: '/profile',
		name: 'profile',
		meta: { layout: 'main', auth: true },
		component: () => import('../views/Profile'),
	},
	{
		path: '/record',
		name: 'record',
		meta: { layout: 'main', auth: true },
		component: () => import('../views/Record'),
	},
	{
		path: '/detail/:id',
		name: 'detail',
		props: true,
		meta: { layout: 'main', auth: true },
		component: () => import('../views/Detail'),
	},
]

const router = createRouter({
	routes,
	history: createWebHistory(),
	linkActiveClass: 'active',
	linkExactActiveClass: 'active'

})
router.beforeEach((to, from, next) => {
	const currentUser = firebase.auth.currentUser
	const requireAuth = to.meta.auth

	if (requireAuth && !currentUser) {
		next('/login?messages=login')
	} else { next() }
})

export default router