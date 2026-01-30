import {isEditable} from "../lib/isEditable";
import {Timer} from "gs-base";
import {listenInput} from "./listenInput";
import {ContextVars, rootEl} from "./contextVars";

const timer = new Timer(20);

export function listenRoot() {
	check().then(console.warn)
	document.body.addEventListener("focusin", check, true);
}

async function check() {
	await timer.reWait()
	const el = document.activeElement as HTMLElement;
	if (el === ContextVars.lastListenEl) {
		return;
	}
	ContextVars.lastListenEl = el;
	if (el === rootEl) {
		return;
	}
	if (isEditable(el)) {
		await listenInput(el);
	} else {
		await listenInput();
	}
}
