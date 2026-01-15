import {MsgMethods, RemoteMethods} from "gs-br-ext";

interface IContentBase {
	setInputValue(value: string): Promise<void>;
}

export interface IContentApi extends IContentBase, RemoteMethods {
}

export interface IContentService extends IContentBase, MsgMethods {
}
