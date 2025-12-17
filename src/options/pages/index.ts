import {createRouter, createWebHashHistory, Router} from 'vue-router'
import Home from './Home.vue'

export const router: Router = createRouter({
	history: createWebHashHistory(),
	routes: [
		{
			path: '',
			name: 'home',
			component: Home
		},
	]
})