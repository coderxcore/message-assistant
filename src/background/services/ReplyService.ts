import {setMsgMethod} from "gs-br-ext";
import {IReply, IReplyService, ISearchReply} from "/src-type";

setMsgMethod<IReplyService>({
	backup(): Promise<string> {
		return Promise.resolve("");
	}, importBackup(buffer: ArrayBuffer): Promise<string | undefined> {
		return Promise.resolve(undefined);
	}, importReplies(replies: IReply[]): Promise<string | undefined> {
		return Promise.resolve(undefined);
	}, queryReply(text: ISearchReply): Promise<IReply[]> {
		return Promise.resolve([]);
	}, queryWord(text: string): Promise<string[]> {
		return Promise.resolve([]);
	}
})
