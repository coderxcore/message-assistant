import {MsgMethods, RemoteMethods} from "gs-br-ext";
import {Locale} from "../db";

export interface ISettings {
	language: Locale
}

interface ISettingsBase {

	getSettings(): Promise<ISettings>;

	setSettings(settings: Partial<ISettings>): Promise<ISettings>;
}

export interface ISettingsApi extends ISettingsBase, RemoteMethods {
}

export interface ISettingsService extends ISettingsBase, MsgMethods {
}