import {StorageLocal} from "gs-br-ext";

const ImportStartKey = 'import-start';

export class Status {

	static async getImportStart(): Promise<string> {
		return await StorageLocal.getValue(ImportStartKey);
	}

	static async setImportStart(text: string): Promise<void> {
		await StorageLocal.setValue(ImportStartKey, text);
	}

	static async clearImportStart(): Promise<void> {
		await StorageLocal.raw.remove(ImportStartKey);
	}
}
