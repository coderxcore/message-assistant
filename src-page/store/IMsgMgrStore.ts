import {defineStore} from "pinia";
import {IMessage, IMsgMgrApi, IPageParam} from "/src-com";
import {Api} from "../api";
import {Timer} from "gs-base";

export interface IMsgMgrState {
	param: IPageParam
	msgs: IMessage[]
	route: string
}

export interface IMsgMgrGetters {
	queryMethod: keyof IMsgMgrApi
}

export interface IMsgMgrActions {
	loadData(): Promise<void>

	clear(): void
}

export interface IMsgMgrStore extends IMsgMgrState, IMsgMgrGetters, IMsgMgrActions {
}

const timer = new Timer();


export const useMsgMgrStore: () => IMsgMgrStore = defineStore('msg-mgr-store', {
	state: (): IMsgMgrState => {
		return {
			param: {
				page: 1,
				regex: '',
			},
			msgs: [],
			route: ""
		};
	},
	getters: {
		queryMethod({route}: IMsgMgrState) {
			return `query${route.charAt(0).toUpperCase()}${route.slice(1)}`
		}
	},
	actions: <IMsgMgrActions>{
		async loadData(): Promise<void> {
			await timer.reWait();
			const {queryMethod, param}: IMsgMgrStore = this;
			this.msgs = await Api.msgMgr[queryMethod as any](param);
		},
		clear() {
			this.msgs.length = 0;
		}
	}
}) as any;
