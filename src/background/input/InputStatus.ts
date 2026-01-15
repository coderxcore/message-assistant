import {builtInSceneIds, IInputStatus, IMessage} from "/src-com";
import {callTabMsgMethod, StorageLocal} from "gs-br-ext";
import {Scene} from "../repo/Scene";
import {preprocessMessages} from "../pre/preprocessMessage";
import {saveMessagePack} from "../repo/saveMessagePack";
import {updateIndex} from "../search/updateIndex";

const tmpMessageKey = "tmp-message";
const inputStatusKey = "input-status";

interface ITmpMsg {
	inputStatus: IInputStatus;
	text: string;
}

export async function setInputStatus(status: IInputStatus) {
	await checkAndSaveTmpMsg(status)
	await StorageLocal.setValue(inputStatusKey, status);
}

export async function setTmpMessage(message: string) {
	const inputStatus = await StorageLocal.getValue<IInputStatus>(inputStatusKey);
	if (!inputStatus || !message) {
		return;
	}
	console.log(message)
	await checkAndSaveTmpMsg(inputStatus)
	await StorageLocal.setValue(tmpMessageKey, {
		inputStatus,
		text: message,
	})
	await callTabMsgMethod({
		id: inputStatus.tabId,
		method: 'setInputValue',
		arg: message,
		hasReturn: true
	})
}

async function checkAndSaveTmpMsg(inputStatus: IInputStatus): Promise<void> {
	const tmpMsg = await StorageLocal.getValue<ITmpMsg>(tmpMessageKey);
	if (!tmpMsg) {
		return;
	}
	if (tmpMsg.inputStatus.id === inputStatus?.id) {
		return;
	}
	await saveTmpMsg(tmpMsg);
}

async function saveTmpMsg({text, inputStatus: {url, isReply}}: ITmpMsg) {
	const scene = Scene.getSceneByUrl(url);
	const msg: IMessage = {
		text,
		sceneId: scene?.id || builtInSceneIds.unresolvedScene,
	}
	if (isReply) {
		msg.replyUrls = [url];
	} else {
		msg.bodyUrls = [url];
	}
	await saveMessagePack(await preprocessMessages([msg]));
	await updateIndex();
}


















