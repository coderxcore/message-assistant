import {Timer} from "gs-base";

import {ContentStore as cs} from "../store";
import {getInputValue} from "../lib/getInputValue";
import {getSelectionRange} from "/src-page/lib/getSelectionRange";
import {ContextVars} from "./contextVars";

const timer = new Timer(200);

let lastStart: number, lastEnd: number, lastWidth: number, lastHeight: number, lastTarget: EventTarget;

export async function readInput(target: EventTarget, always?: boolean) {
	const {pageContext: cxt} = cs
	const {el} = cxt
	if (!el || el !== target) return;
	await timer.reWait();
	const value = cxt.inputItem.text = getInputValue(el);
	const {start, end} = getSelectionRange(el);
	const {innerWidth: w, innerHeight: h} = window;
	const sizeChanged = lastWidth !== w || lastHeight !== h;
	lastWidth = w;
	lastHeight = h;
	if (lastStart != start || lastEnd != end || value !== ContextVars.lastValue || sizeChanged || always || lastTarget !== target) {
		lastStart = start
		lastEnd = end
		lastTarget = target
		const search = start === end ? value.slice(0, start) : value.slice(start, end)
		await cxt.queryTerm(search, start, end)
		cxt.active = true;
	}
	if (value !== ContextVars.lastValue || sizeChanged || always || lastTarget !== target) {
		ContextVars.lastValue = value;
		await timer.reWait(100);
		await cxt.draftChang();
	}
}
