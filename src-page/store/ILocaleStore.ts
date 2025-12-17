import {defineStore} from "pinia";
import {LocaleObject, LocaleRecord} from "/src-com";
import {Api} from "../Api";

export interface ILocaleState extends LocaleRecord {
}

export interface ILocaleStore extends ILocaleState {
	loadMessages(): Promise<void>;
}

export const useLocaleStore: () => ILocaleStore = defineStore('locale', {
	state: (): ILocaleState => {
		return {...LocaleObject};
	},
	actions: {
		async loadMessages() {
			this.$patch(await Api.locale.getMessages());
		}
	}
}) as any;