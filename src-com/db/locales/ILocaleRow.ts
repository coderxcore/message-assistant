export const Locales = ['zh-CN', 'en', 'zh-TW', 'ja'] as const;

export const LocaleKeys = ['title', 'settings'] as const;

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