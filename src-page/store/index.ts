import {ILocaleStore, useLocaleStore} from "./ILocaleStore";

export class Store {
	static #localeStore?:ILocaleStore
	static get locale(): ILocaleStore {
		return Store.#localeStore || (Store.#localeStore = useLocaleStore());
	}
}