import {MsgMethods, RemoteMethods} from "gs-br-ext";
import {LocaleKey} from "../db";

interface ILocaleBase {

	getMessages(): Promise<Record<LocaleKey, string>>;

	clearMessageCache(): Promise<void>;
}

export interface ILocaleApi extends ILocaleBase, RemoteMethods {
}

export interface ILocaleService extends ILocaleBase, MsgMethods {
}