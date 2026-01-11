import {setMsgMethod} from "gs-br-ext";
import {IMessage, IMessageService, ISearchedMessage} from "/src-com";
import {clearMessageStatusCache, messageStatus} from "../repo/messageStatus";

setMsgMethod<IMessageService>({
	clearMessageStatusCache,
	messageStatus
})
