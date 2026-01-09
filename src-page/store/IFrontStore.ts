import {defineStore} from "pinia";

export interface IFrontState {
	progress: number;
	message: string;
	confirm?: (result: boolean) => void | Promise<void>;
}

export interface IFrontGetters {
	readonly show: boolean;
	readonly showProgress: boolean;
}

export interface IFrontStore extends IFrontState, IFrontGetters {
}

export const useFrontStore: () => IFrontStore = defineStore('front', {
	state: (): IFrontState => {
		return {
			progress: -1,
			message: '',
			confirm: undefined
		};
	},
	getters: {
		show({showProgress, message, confirm}: IFrontState): boolean {
			return Boolean(showProgress || message || confirm);
		},
		showProgress({progress}: IFrontState): boolean {
			return progress >= 0;
		},
	},
	actions: {}
}) as any;
