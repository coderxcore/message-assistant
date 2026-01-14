import {IDocument, IDocumentBase} from "gs-search/type";
import {Bool} from "gs-idb-basic";

export interface IMessageQuery {
	sceneId?: number[],
	is_reference?: Bool
	is_content?: Bool
}

export interface IMessage extends IDocumentBase,IMessageQuery {
	id?: number
	hash?: number
	text: string
	bodyUrls?: string[]
	replyUrls?: string[]
	added_at?: number
	updated_at?: number
	keywords?: string[]
	keywords_only?: boolean
	deleted?: Bool
	tokens?: string[]
}

export interface ISearchMessage extends IMessage, IDocument {
	id: number,
	text: string
	sceneIds: number[]
	searchedTokens: string[]
}
