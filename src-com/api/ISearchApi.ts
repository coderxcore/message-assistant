import {MsgMethods, RemoteMethods} from "gs-br-ext";
import {ISearchTerm} from "../db/ITerm";
import {ISearchMessage} from "../db/IMessage";

interface ISearchBase {

	searchTerm(text: string): Promise<ISearchTerm[]>;

	searchMsg(text: string): Promise<ISearchMessage[]>;
}

export interface ISearchApi extends ISearchBase, RemoteMethods {
}

export interface ISearchService extends ISearchBase, MsgMethods {
}
