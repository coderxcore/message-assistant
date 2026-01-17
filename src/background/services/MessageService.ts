import {setMsgMethod} from "gs-br-ext";
import {IMessage, IMessageService} from "/src-com";
import {clearMessageStatusCache, messageStatus} from "../repo/messageStatus";
import {Db} from "../db";
import {Bool} from "gs-idb-basic";
import {setTmpMessage} from "../input/InputStatus";
import {updateIndex} from "../search/updateIndex";
import {getSettings} from "./SettingsService";
import {saveMessagePack} from "../repo/saveMessagePack";
import {preprocessMessages} from "../pre/preprocessMessage";
import {loadMessage} from "../repo/loadMessage";

setMsgMethod<IMessageService>({
	clearMessageStatusCache,
	messageStatus,
	loadMessage,
	async sendMessageToContent(msg: string): Promise<void> {
		try {
			await setTmpMessage(msg);
		} catch (e) {
			console.warn(e)
		}
	},
	removeMessage(id: number): Promise<void> {
		clearMessageStatusCache();
		return Db.message.delete(id)
	},
	async addMessage(msg: IMessage): Promise<any> {
		const {minSaveLength} = await getSettings();
		if (msg.text.length < minSaveLength) {
			throw new Error(`msg.text.length should be greater than ${minSaveLength}`);
		}
		msg.is_reference = Bool.True;
		const addedResult = await saveMessagePack(await preprocessMessages([msg]))
		clearMessageStatusCache();
		return {
			addedResult,
			indexResult: await updateIndex()
		}
	}
})
