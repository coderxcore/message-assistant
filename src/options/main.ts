import { createApp } from 'vue';
import './style/style.scss';
import App from './App.vue';
import {router} from "./pages";
import {createPinia} from 'pinia'

createApp(App)
	.use(router)
	.use(createPinia())
	.mount('#app');
