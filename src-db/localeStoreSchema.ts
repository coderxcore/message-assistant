import {IStoreSchema} from "gs-idb-pro";
import {zh_CN} from "./locale-default-values/zh_CN";
import {all} from "./locale-default-values/all";
import {zh_TW} from "./locale-default-values/zh_TW";
import {ja} from "./locale-default-values/ja";
import {en} from "./locale-default-values/en";
import {ILocaleRow, LocaleRecord, LocalesAll} from "/src-type";

export const LocalStoreName = 'locale'

export const localeStoreSchema: IStoreSchema = {
	name: LocalStoreName,
	indexSchemas: [
		'locale',
		{
			name: 'locale_key',
			keyPath: ['locale', 'key'],
			unique: true
		}
	],
	defaultData: [
		...toData(all, 'all'),
		...toData(zh_CN, 'zh-CN'),
		...toData(zh_TW, 'zh-TW'),
		...toData(ja, 'ja'),
		...toData(en, 'en')
	]
}

function toData(record: LocaleRecord, locale: LocalesAll): ILocaleRow[] {
	return Object.entries(record).map(([key, value]) => ({key, locale, value}));
}
