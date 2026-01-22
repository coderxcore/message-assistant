import {defineStore} from "pinia";
import {IMessage, IMsgMgrApi, IPageParam} from "/src-com";
import {Api} from "../api";
import {Timer} from "gs-base";
import {strToRegex} from "/src-com/lib/strToRegex";
import {Store} from "./index";

export interface IMsgMgrState {
	param: IPageParam
	msgs: IMessage[]
	route: string
	filter: string
	filtered: IMessage[]
}

export interface IMsgMgrGetters {
	queryMethod: keyof IMsgMgrApi
	filtered: IMessage[]
	totalPage: number
	total: number
}

export interface IMsgMgrActions {
	executeFilter(remote?: boolean): Promise<void>

	loadData(): Promise<void>

	clear(): void
}

export interface IMsgMgrStore extends IMsgMgrState, IMsgMgrGetters, IMsgMgrActions {
}

const loadTimer = new Timer();
const filterTimer = new Timer();


export const useMsgMgrStore: () => IMsgMgrStore = defineStore('msg-mgr-store', {
	state: (): IMsgMgrState => {
		return {
			param: {
				size: 100,
				page: 1,
				regex: '',
			},
			msgs: [],
			route: "",
			filter: '',
			filtered: []
		};
	},
	getters: {
		queryMethod({route}: IMsgMgrState) {
			return `query${route.charAt(0).toUpperCase()}${route.slice(1)}`
		},
		total({route}: IMsgMgrState) {
			return Store.message.status[`${route}Count`]
		},
		totalPage({total, param: {size}}: IMsgMgrState) {
			return Math.ceil(total / size);
		}
	},
	actions: <IMsgMgrActions>{
		async loadData(): Promise<void> {
			await loadTimer.reWait();
			const {queryMethod, param: {page, size}}: IMsgMgrStore = this;
			this.msgs = await Api.msgMgr[queryMethod as any]({page, size});
			this.executeFilter();
		},
		clear() {
			this.msgs.length = 0;
			this.filtered.length = 0;
		},
		async executeFilter(remote?: boolean): Promise<void> {
			await filterTimer.reWait(remote ? 300 : 200);
			document.querySelector('.OtherLayout').scrollTop = 0
			const {filter, msgs, queryMethod}: IMsgMgrState = this;
			if (!filter?.trim().length) {
				this.filtered = [...msgs];
				return;
			}
			if (remote) {
				this.filtered = await Api.msgMgr[queryMethod as any]({regex: filter});
				return;
			}
			const reg = strToRegex(filter);
			this.filtered = this.msgs.filter(m => reg.test(m.text));
		}


	}
}) as any;
