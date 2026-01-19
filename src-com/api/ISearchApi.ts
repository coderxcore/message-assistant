import {MsgMethods, RemoteMethods} from "gs-br-ext";
import {IMessageQuery, ISearchMessage, ISearchTerm} from "../db";

interface ISearchBase {

	searchTerm(text: string): Promise<ISearchTerm[]>;

	searchMsg(text: string, query: IMessageQuery): Promise<ISearchMessage[]>;
}

export interface ISearchApi extends ISearchBase, RemoteMethods {
}

export interface ISearchService extends ISearchBase, MsgMethods {
}
