import {defineStore} from "pinia";

export interface INotifyState {
	texts: string[];
}

export interface INotifyGetters {

}

export interface INotifyActions {
	/**
	 * 添加通知
	 * @param msg 通知内容
	 * @param timeout 通知显示时间，单位秒
	 */
	addNotification(msg: string, timeout: number): void;

}

export interface INotifyStore extends INotifyState, INotifyGetters, INotifyActions {
}

export const useNotifyStore: () => INotifyStore = defineStore('notify-store', {
	state: (): INotifyState => {
		return {
			texts: []
		};
	},
	getters: {},
	actions: <INotifyActions>{
		addNotification(msg: string): void {
		}
	}
}) as any;
