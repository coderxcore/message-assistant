import {setMsgMethod, StorageSync} from "gs-br-ext";
import {defaultSettings, ISettings, ISettingsService} from "/src-com";

const SettingsKey = 'settings';
let settingsCache: ISettings | undefined;

export async function resetSettings() {
	settingsCache = {...defaultSettings};
	await StorageSync.raw.remove(SettingsKey);
}

export async function getSettings(): Promise<ISettings> {
	return settingsCache || (settingsCache = {
		...defaultSettings,
		...await StorageSync.getValue(SettingsKey) as any
	});
}

async function setSettings(settings: Partial<ISettings>): Promise<ISettings> {
	settingsCache = {...settingsCache, ...settings};
	await StorageSync.setValue(SettingsKey, settingsCache);
	return settingsCache;
}

setMsgMethod<ISettingsService>({getSettings, setSettings})
