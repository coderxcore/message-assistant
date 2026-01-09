import {defaultStoreSchemaTemplate, IDataOperators, IDataWriter, IDbPro, IIDbPro} from "gs-idb-pro";
import {ILocaleRow, IMessage, IScene, ITerm} from "/src-com";
import {localeStoreSchema} from "./localeStoreSchema";
import {messageSchema, MessageStoreName} from "./messageSchema";
import {termSchema, TermStoreName} from "./termSchema";
import {sceneSchema} from "./sceneSchema";
import {draftSchema, DraftStoreName} from "./draftSchema";

const dbName = 'message-assistant'

let currentDb: IIDbPro | undefined;

export class Db {

	static locale: IDataWriter<ILocaleRow> = Db.db.store(localeStoreSchema, 'locale');
	static draft: IDataWriter<IMessage> = Db.db.store(draftSchema);
	static message: IDataWriter<IMessage> = Db.db.store(messageSchema);
	static term: IDataWriter<ITerm> = Db.db.store(termSchema);
	static scene: IDataWriter<IScene> = Db.db.store(sceneSchema);

	static allMessage: IDataOperators<ITerm, IMessage> = Db.db.stores([TermStoreName, MessageStoreName, DraftStoreName])
	static termAndMessage: IDataOperators<ITerm, IMessage> = Db.db.stores([TermStoreName, MessageStoreName])
	static termAndDraft: IDataOperators<ITerm, IMessage> = Db.db.stores([TermStoreName, DraftStoreName])
	static msgAndDraft: IDataOperators<ITerm, IMessage> = Db.db.stores([MessageStoreName, DraftStoreName])

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
