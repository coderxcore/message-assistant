import {IStoreSchema} from "gs-idb-pro";

export const MessageStoreName = 'message'

export const messageSchema: IStoreSchema = {
	name: MessageStoreName,
	addedTimeField: {
		name: 'added_at',
		isIndexed:false
	},
	updatedTimeField: {
		name: 'updated_at',
		isIndexed:false
	},
	softDeletedField: 'deleted',
	indexSchemas: [
		'kind',
		'stage',
		{
			name: 'stage_deleted',
			keyPath: ['stage', 'deleted'],
		},
		{
			name: 'kind_deleted',
			keyPath: ['kind', 'deleted'],
		},
	]
}
