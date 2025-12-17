import {IStoreSchema} from "gs-idb-pro";
import {ILocaleRow, LocalesAll, LocaleKey} from "./ILocaleRow";
import {zh_CN} from "./zh_CN";
import {local_All} from "./local_All";

export const localesStoreSchema: IStoreSchema = {
	name: 'locales',
	addedTimeField: false,
	updatedTimeField: false,
	indexSchemas: [
		'locale',
		{
			name: 'locale_key',
			keyPath: ['locale', 'key'],
			unique: true
		}
	],
	defaultData: [
		...convertDefaultData(local_All, 'all'),
		...convertDefaultData(zh_CN, 'zh-CN'),
	]
}

function convertDefaultData(arr: [LocaleKey, string][], locale: LocalesAll): ILocaleRow[] {
	return arr.map(([key, value]) => ({key, locale, value}));
}