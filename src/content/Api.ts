import {createMsgMethodProxy} from "gs-br-ext";
import {IContentToBgApi} from "/src-com";

export class Api {

	static #proxy?: any;

	static get contentToBg(): IContentToBgApi {
		return this.#api
	}

	static get #api(): any {
		return this.#proxy || (this.#proxy = createMsgMethodProxy<any>(true));
	}
}
