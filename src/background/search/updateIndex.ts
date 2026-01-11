import {IndexUpdatePayload} from "./IndexUpdatePayload";
import {Db} from "../db";
import {Search} from "./Search";
import {IMessage} from "/src-com";
import {keyGt, keyGte} from "gs-idb-basic";

export async function updateIndex() {
	console.log(await Search.searchMsg('世界上都有谁？'))
	const history = await IndexUpdatePayload.get();
	if (!history) {
		return;
	}
	const {msgFromId, termFromId} = history;
	if (msgFromId > 0) {
		await updateMsgIndex(msgFromId, termFromId);
	}

	return {history, new: await IndexUpdatePayload.get()}
}

async function updateMsgIndex(msgFromId: number, termFromId: number) {
	try {
		Search.message.startBatch();
		let result = await Db.message.all(keyGte(msgFromId) as any, 100)
		while (result.length) {
			msgFromId = result[result.length - 1].id;
			await Search.message.addDocumentsIfMissing(result as any);
			await IndexUpdatePayload.replace({msgFromId, termFromId});
			result = await Db.message.all(keyGt(msgFromId) as any, 100)
		}
		await IndexUpdatePayload.replace({msgFromId: undefined, termFromId});
	} catch (e) {
		console.warn(e)
	} finally {
		try {
			await Search.message.endBatch();
		} catch (e) {
			console.log(e)
		}
	}
}
