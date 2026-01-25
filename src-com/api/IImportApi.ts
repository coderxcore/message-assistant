import {MsgMethods, RemoteMethods} from "gs-br-ext";
import {BuiltInSceneKey, IMessage, Locale} from "../db";

export interface IBuiltInItem {
	lang: Locale
	scene: BuiltInSceneKey
}

interface IImportBase {

	importBuiltIn(item: IBuiltInItem): Promise<any>;

	importReferences(references: IMessage[]): Promise<any>;

}

export interface IImportApi extends IImportBase, RemoteMethods {
}

export interface IImportService extends IImportBase, MsgMethods {
}
