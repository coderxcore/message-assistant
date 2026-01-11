import {MsgMethods, RemoteMethods} from "gs-br-ext";

interface IIndexBase {
	updateIndex: () => Promise<any>;
}

export interface IIndexApi extends IIndexBase, RemoteMethods {
}

export interface IIndexService extends IIndexBase, MsgMethods {
}
