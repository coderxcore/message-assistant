import {themes} from "../api";
import {BuiltInSceneKeys} from "./IScene";

const settingsPageKeys = [
	'language', 'languageDesc', 'theme', 'themeDesc', 'pref',
	'ok', 'cancel', 'selectAll',
	'dataMgr', 'exportData', 'exportDataDesc', 'importData', 'importDataDesc',
	'importReferences', 'mode', 'preview', 'confirmImport', 'emptyContent', 'loading', 'importing', 'imported', 'importError', 'askImport',
	'import_fileReading', 'import_dbSaving', 'import_indexing', 'import_done', 'showImportBuiltIn',
	'scene', 'importAs', 'initTitle', 'initSubtitle', 'importCustomReference', 'selectImportLanguage',
	'unspecifiedSceneDesc', 'selectScene', 'ecommerceSceneDesc', 'aiSceneDesc', 'socioSceneDesc', 'videoSceneDesc',
] as const;

export const importModes = ['blankLine', 'eachLine', 'custom'] as const;

export const Locales = ['zh-CN', 'zh-TW', 'en', 'ja', 'ko'] as const;

export const LocaleKeys = [
	'title', 'settings', 'home', 'draft', 'trash', 'history', 'references',
	...BuiltInSceneKeys,
	...settingsPageKeys,
	...themes,
	...importModes,
] as const;

export type ImportMode = typeof importModes[number];

export type Locale = typeof Locales[number];

export type LocalesAll = Locale | 'all';

export type LocaleKey = typeof LocaleKeys[number] | Locale

export interface ILocaleRow {
	id?: number
	key: LocaleKey
	locale: LocalesAll
	value: string
}

export type LocaleRecord = Record<LocaleKey, string>

export const LocaleObject: LocaleRecord = (() => {
	const obj: any = {};
	for (const locale of [...Locales, ...LocaleKeys]) {
		obj[locale] = locale
	}
	return obj;
})()
