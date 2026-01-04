import {ILocaleStore, useLocaleStore} from "./ILocaleStore";
import {ISettingsStore, useSettingsStore} from "./ISettringsStore";
import {IMessageStore, useMessageStore} from "./IMessageStore";
import {IImportReferencesStore, useImportReferencesStore} from "./IImportReferencesStore";

export class Store {
	static #replyStore?: IMessageStore
	static #localeStore?: ILocaleStore
	static #settingsStore?: ISettingsStore
	static #importReferencesStore?: IImportReferencesStore

	static get message(): IMessageStore {
		return Store.#replyStore || (Store.#replyStore = useMessageStore());
	}

	static get locale(): ILocaleStore {
		return Store.#localeStore || (Store.#localeStore = useLocaleStore());
	}

	static get settings(): ISettingsStore {
		return Store.#settingsStore || (Store.#settingsStore = useSettingsStore());
	}

	static get importReferences(): IImportReferencesStore {
		return Store.#importReferencesStore || (Store.#importReferencesStore = useImportReferencesStore());
	}
}
