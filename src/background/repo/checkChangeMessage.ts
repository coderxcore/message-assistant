import {IMessage} from "/src-com";
import {arraysEqualIgnoreOrder} from "gs-base";
import {Bool} from "gs-idb-basic";

export function checkChangeMessage(baseMsg: IMessage, newMsg: IMessage): IMessage | undefined {
	let props: Partial<IMessage> = {};

	if (newMsg.sceneId !== baseMsg.sceneId) {
		props.sceneId = newMsg.sceneId
	}
	if (newMsg.is_reference && !baseMsg.is_reference) {
		props.is_reference = Bool.True
	}
	if (newMsg.is_content && !baseMsg.is_content) {
		props.is_content = Bool.True
	}
	if (!arraysEqualIgnoreOrder(baseMsg.bodyUrls || [], newMsg.bodyUrls || [])) {
		props.bodyUrls = Array.from(new Set([...baseMsg.bodyUrls || [], ...newMsg.bodyUrls || []]))
	}

	if (!arraysEqualIgnoreOrder(baseMsg.replyUrls || [], newMsg.replyUrls || [])) {
		props.replyUrls = Array.from(new Set([...baseMsg.replyUrls || [], ...newMsg.replyUrls || []]))
	}

	if (Object.keys(props).length) {
		return {...baseMsg, ...props}
	}
}
