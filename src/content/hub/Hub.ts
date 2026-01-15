import {Api} from "../Api";
import {getInputValue} from "../util/getInputValue";
import {getPureUrl} from "/src-com/lib/getPureUrl";
import {writeTextToElement} from "../util/writeTextToElement";

const idMap = new WeakMap<Element | string, number>()

export class Hub {
	static #el?: HTMLElement

	static async sendStatus(el?: HTMLElement): Promise<void> {
		this.#el = el;
		const key = el || location.href;
		if (!idMap.has(key)) {
			idMap.set(key, Date.now());
		}
		const id = idMap.get(key);
		const currentInput = getInputValue(el);
		await Api.contentToBg.setInputStatus({
			id,
			currentInput,
			mainContent: "",
			title: document.title,
			url: getPureUrl(document.location.href),
			writable: !!el,
		})
	}

	static setInputValue(value: string): void {
		writeTextToElement(this.#el, value);
	}

}
