import {IDocument, IDocumentBase} from "gs-search/type";
import {Bool} from "gs-idb-basic";

export interface IMessage extends IDocumentBase {
	id?: number
	hash?: number
	text: string
	sceneIds: number[],
	is_reference?: Bool
	is_content?: Bool
	bodyUrls?: string[]
	replyUrls?: string[]
	added_at?: number
	updated_at?: number
	keywords?: string[]
	keywords_only?: boolean
	deleted?: Bool
	tokens?: string[]
}

export interface ISearchReply extends IMessage, IDocument {
	text: string
	sceneIds: number[]
	tokens: string[]
}
