import {MsgMethods, RemoteMethods} from "gs-br-ext";
import {IReply, ISearchReply} from "../db/IReply";

interface IIReplyBase {

	queryWord(text: string): Promise<string[]>;

	queryReply(text: ISearchReply): Promise<IReply[]>;

	importReplies(replies: IReply[]): Promise<string | undefined>;

	backup(): Promise<string>;

	importBackup(buffer: ArrayBuffer): Promise<string | undefined>;

}

export interface IReplyApi extends IIReplyBase, RemoteMethods {
}

export interface IReplyService extends IIReplyBase, MsgMethods {
}
