import {IStoreSchema} from "gs-idb-pro";

export const ReplyStoreName = 'reply'

export const replySchema: IStoreSchema = {
	name: ReplyStoreName,
	addedTimeField: 'added_at',
	updatedTimeField: 'updated_at',
	softDeletedField: 'deleted',
	indexSchemas:['type']
}
