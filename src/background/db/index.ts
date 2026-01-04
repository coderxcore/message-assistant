import {defaultStoreSchemaTemplate, IDataOperators, IDataWriter, IDbPro, IIDbPro} from "gs-idb-pro";
import {ILocaleRow, IMessage, IScene, IWord} from "/src-com";
import {localeStoreSchema} from "./localeStoreSchema";
import {messageSchema, MessageStoreName} from "./messageSchema";
import {wordSchema, WordStoreName} from "./wordSchema";
import {sceneSchema} from "./sceneSchema";

const dbName = 'message-assistant'

let currentDb: IIDbPro | undefined;

export class Db {

	static locale: IDataWriter<ILocaleRow> = Db.db.store(localeStoreSchema, 'locale');
	static message: IDataWriter<IMessage> = Db.db.store(messageSchema);
	static word: IDataWriter<IWord> = Db.db.store(wordSchema);
	static scene: IDataWriter<IScene> = Db.db.store(sceneSchema);

	static wordAndReply: IDataOperators<IWord, IMessage> = Db.db.stores([WordStoreName, MessageStoreName])

	static get db(): IIDbPro {
		return currentDb || (currentDb = new IDbPro({
			name: dbName,
			storeTemplate: {
				...defaultStoreSchemaTemplate,
				addedTimeField: false,
				updatedTimeField: false,
			}
		}));
	}

}
