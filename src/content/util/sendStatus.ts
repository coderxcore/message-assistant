import {Api} from "../Api";
import {getInputValue} from "./getInputValue";
import {getPureUrl} from "/src-com/lib/getPureUrl";

const idMap = new WeakMap<Element | string, number>()

export async function sendStatus(el?: HTMLElement) {
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
		writable: !!el
	})
}
