import {setMsgMethod} from "gs-br-ext";
import {ILocaleRow, ILocaleService, LocaleKey, LocaleRecord} from "/src-type";
import {SettingsService} from "./SettingsService";
import {Db} from "/src-db";

let cache: LocaleRecord | undefined;

function toRecord(result: ILocaleRow[]): LocaleRecord {
	const record = {};
	for (const {key, value} of result) {
		record[key] = value;
	}
	return record as any;
}

setMsgMethod<ILocaleService>({
	async getMessages(): Promise<Record<LocaleKey, string>> {
		if (cache) return cache;
		const {language} = await SettingsService.getSettings();
		return cache = await Db.locale.batchRead<any>(async reader => {
			return {
				...toRecord(await reader.filter('all') as any),
				...toRecord(await reader.filter(language) as any)
			}
		})
	},
	async clearMessageCache(): Promise<void> {
		cache = undefined;
	}
})
