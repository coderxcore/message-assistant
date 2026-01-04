import {setMsgMethod} from "gs-br-ext";
import {Bool} from "gs-idb-basic";
import {IMessage, IMessageService, IMessageStatus, ISearchReply} from "/src-com";
import {Db} from "../db";


let statusCache: IMessageStatus | undefined;

setMsgMethod<IMessageService>({
	clearStatusCache(): Promise<void> {
		return Promise.resolve(statusCache = undefined);
	},
	async messageStatus(): Promise<IMessageStatus> {
		if (statusCache) {
			return statusCache;
		}
		return statusCache = await Db.message.batchRead(async s => ({
			draftCount: await s.index('stage_deleted').count(['draft', Bool.False]),
			historyCount: await s.index('stage_deleted').count(['history', Bool.False]),
			trashCount: await s.index('deleted').count(Bool.True),
			referencesCount: await s.index('kind_deleted').count(['reference', Bool.False])
		}))
	}, queryReply(text: ISearchReply): Promise<IMessage[]> {
		return Promise.resolve([]);
	}, queryWord(text: string): Promise<string[]> {
		return Promise.resolve([]);
	}
})
