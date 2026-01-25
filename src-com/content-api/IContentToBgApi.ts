import {MsgMethods, RemoteMethods} from "gs-br-ext";
import {IInputStatus} from "../other";

interface IContentToBgBase {
}

export interface IContentToBgApi extends IContentToBgBase, RemoteMethods {
	setInputStatus(status: IInputStatus): Promise<void>;

	saveCurrMsgs(data?: any): Promise<void>;
}

export interface IContentToBgService extends IContentToBgBase, MsgMethods {
	setInputStatus(status: IInputStatus, sender: chrome.runtime.MessageSender): Promise<void>;

	saveCurrMsgs(data: any, sender: chrome.runtime.MessageSender): Promise<void>;
}
