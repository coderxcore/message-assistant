import {MsgMethods, RemoteMethods} from "gs-br-ext";

interface ISpecialCaseBase {

	fullRebuildIndex(): Promise<any>;

	clearAllData(): Promise<any>;

	updateIndex(): Promise<any>;

}

export interface ISpecialCaseApi extends ISpecialCaseBase, RemoteMethods {
}

export interface ISpecialCaseService extends ISpecialCaseBase, MsgMethods {
}
