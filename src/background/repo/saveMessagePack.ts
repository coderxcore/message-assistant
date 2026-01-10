import {Db} from "../db";
import {IIndexUpdatePayload, IMessagePack} from "../type";
import {IndexUpdatePayload} from "../search/IndexUpdatePayload";
import {checkChangeMessage} from "./checkChangeMessage";
import {clearMessageStatusCache} from "./messageStatus";


export async function saveMessagePack(pack: IMessagePack): Promise<IIndexUpdatePayload> {
	const {termHashAndMsgHash} = Db
	const {terms, messages} = pack;
	let payload = {} as IIndexUpdatePayload;
	try {
		await termHashAndMsgHash.write(async (ts, ms) => {
			for (const term of terms) {
				const dbTerm = await ts.get(term.hash);
				if (term.text === dbTerm?.text) {
					continue;
				}
				if (isNaN(payload.termFromId)) {
					payload.termFromId = (await ts.add(term)).id;
				} else {
					await ts.add(term);
				}
			}
			for (const message of messages) {
				const dbMessage = await ms.get(message.hash);
				if (message.text === dbMessage?.text) {
					const changedMsg = checkChangeMessage(dbMessage, message);
					if (changedMsg) {
						await ms.replace(changedMsg);
					}
					continue;
				}
				if (isNaN(payload.msgFromId)) {
					payload.msgFromId = (await ms.add(message)).id;
				} else {
					await ms.add(message);
				}
			}
		})
	} finally {
		if (payload.msgFromId > 0 || payload.msgFromId > 0) {
			payload = await IndexUpdatePayload.mark(payload);
			clearMessageStatusCache();
		}
	}
	return payload;
}
