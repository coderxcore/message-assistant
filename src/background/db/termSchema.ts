import {IStoreSchema} from "gs-idb-pro";

export const TermStoreName = 'term'


export const termSchema: IStoreSchema = {
	name: TermStoreName,
	indexSchemas: [
		'hash',
	]
}
