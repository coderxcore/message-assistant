import {IStoreSchema} from "gs-idb-pro";

export const MessageStoreName = 'message'

export const messageSchema: IStoreSchema = {
	name: MessageStoreName,
	addedTimeField: {
		name: 'added_at',
		isIndexed: false
	},
	updatedTimeField: {
		name: 'updated_at',
		isIndexed: false
	},
	updatedCountField: true,
	softDeletedField: 'deleted',
	indexSchemas: [
		'hash',
		{
			name: 'is_reference_deleted',
			keyPath: ['is_reference', 'deleted'],
		},
		{
			name: 'is_content_deleted',
			keyPath: ['is_content', 'deleted'],
		},
		{
			name: 'sceneId',
			keyPath: 'sceneId'
		},
		{
			name: 'sceneId_deleted',
			keyPath: ['sceneId', 'deleted'],
		},
		{
			name: 'sceneId_is_content_deleted',
			keyPath: ['sceneId','is_content', 'deleted'],
		},
		{
			name: 'sceneId_reference_deleted',
			keyPath: ['sceneId', 'is_reference', 'deleted'],
		},
	]
}
