import {callTabMsgMethod} from "gs-br-ext";
import {tabExist} from "./tabExist";

export async function sendInputValueToContent(tabId: number, message: string) {
	if (await tabExist(tabId)) {
		await callTabMsgMethod({
			id: tabId,
			method: 'setInputValue',
			arg: message,
			hasReturn: true
		})
	}
}
