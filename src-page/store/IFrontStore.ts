import {defineStore} from "pinia";

export interface IFrontState {
	showProgress: boolean;
	progress: number;
	message: string;
	confirm?: (result: boolean) => void | Promise<void>;
}

export interface IFrontGetters {
	readonly show: boolean;
}

export interface IFrontStore extends IFrontState, IFrontGetters {
}

export const useFrontStore: () => IFrontStore = defineStore('front', {
	state: (): IFrontState => {
		return {
			showProgress: false,
			progress: 0,
			message: '',
			confirm: undefined
		};
	},
	getters: {
		show({showProgress, message, confirm}: IFrontState): boolean {
			return Boolean(showProgress || message || confirm);
		}
	},
	actions: {}
}) as any;
