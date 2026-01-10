import {setMsgMethod} from "gs-br-ext";
import {IMessage, IMessageService, IMessageStatus, ISearchReply} from "/src-com";
import {messageStatus} from "../repo/messageStatus";


let statusCache: IMessageStatus | undefined;

setMsgMethod<IMessageService>({
	clearStatusCache(): Promise<void> {
		return Promise.resolve(statusCache = undefined);
	},
	messageStatus
	, queryReply(text: ISearchReply): Promise<IMessage[]> {
		return Promise.resolve([]);
	}, queryWord(text: string): Promise<string[]> {
		return Promise.resolve([]);
	}
})
