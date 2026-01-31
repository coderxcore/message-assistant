import {MsgMethods, RemoteMethods} from "gs-br-ext";
import {IDraft, IFullDaft, IMessage, ISearchMessage} from "../db";

export interface IDraftChangeResult {
	siteDrafts: IFullDaft[];
	lastDrafts: IFullDaft[];
	titleSearchMsgs: ISearchMessage[]
	valueSearchMsgs: ISearchMessage[]
	margeSearchMsgs: ISearchMessage[]
	lastMsgs: IMessage[]
}

export interface IDraftChangeArg {
	draft: IDraft
	title: string
	content?: string
	sceneId: number
}


interface IContentToBgBase {
}

export interface IContentToBgApi extends IContentToBgBase, RemoteMethods {

	onDraftChange(arg: IDraftChangeArg): Promise<Partial<ISearchMessage>[]>;

	saveCurrMsgs(data?: any): Promise<void>;

}

export interface IContentToBgService extends IContentToBgBase, MsgMethods {

	saveCurrMsgs(data: any, sender: chrome.runtime.MessageSender): Promise<void>;

	onDraftChange(draft: IDraftChangeArg, sender: chrome.runtime.MessageSender): Promise<Partial<ISearchMessage>[]>;

}
