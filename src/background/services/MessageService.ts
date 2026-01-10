import {setMsgMethod} from "gs-br-ext";
import {IMessage, IMessageService, ISearchReply} from "/src-com";
import {clearMessageStatusCache, messageStatus} from "../repo/messageStatus";

setMsgMethod<IMessageService>({
	clearMessageStatusCache,
	messageStatus
	, queryReply(text: ISearchReply): Promise<IMessage[]> {
		return Promise.resolve([]);
	}, queryWord(text: string): Promise<string[]> {
		return Promise.resolve([]);
	}
})
