import {setMsgMethod} from "gs-br-ext";
import {ILocaleRow, ILocaleService, LocaleKey, LocaleRecord} from "/src-com";
import {Db} from "../db";
import {getSettings} from "./SettingsService";

let cache: LocaleRecord | undefined;

function toRecord(result: ILocaleRow[]): LocaleRecord {
	const record = {};
	for (const {key, value} of result) {
		record[key] = value;
	}
	return record as any;
}

export async function clearMessageCache(): Promise<void> {
	cache = undefined;
}

setMsgMethod<ILocaleService>({
	async getMessages(): Promise<Record<LocaleKey, string>> {
		if (cache) return cache;
		const {language} = await getSettings();
		return cache = await Db.locale.batchRead<any>(async reader => {
			return {
				...toRecord(await reader.filter('all') as any),
				...toRecord(await reader.filter(language as any) as any)
			}
		})
	},
	clearMessageCache
})
