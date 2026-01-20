import {createRouter, createWebHashHistory} from 'vue-router';
import Home from './Home/Home.vue'
import OtherLayout from './OtherLayout.vue'
import MsgMgr from './MsgMgr.vue'
import Settings from './Settings/Settings.vue'
import ImportReferences from './ImportReferences.vue'

export const router = createRouter({
	history: createWebHashHistory(),
	routes: [
		{
			name: "home",
			alias: "/",
			path: "/home",
			component: Home
		},
		{
			name: "OtherLayout",
			path: "/",
			component: OtherLayout,
			children:[
				{
					name: "settings",
					path: "settings",
					component: Settings
				},
				{
					name: "references",
					path: "references",
					component: MsgMgr
				},
				{
					name: "history",
					path: "history",
					component: MsgMgr
				},
				{
					name: "trash",
					path: "trash",
					component: MsgMgr
				},
				{
					name: "import-references",
					path: "import-references",
					component: ImportReferences
				},
			]
		},
	]
});
