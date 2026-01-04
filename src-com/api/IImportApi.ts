import {MsgMethods, RemoteMethods} from "gs-br-ext";

interface IImportBase {

	startImport(text: string): Promise<void>;

	importReferences(references: string[]): Promise<void>;

	endImport(): Promise<void>;

}

export interface IImportApi extends IImportBase, RemoteMethods {
}

export interface IImportService extends IImportBase, MsgMethods {
}
