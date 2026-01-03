import {IDocument, IDocumentBase} from "gs-search";
import {Bool} from "gs-idb-basic";

export interface IMessage extends IDocumentBase {
	id?: number
	hash?: number
	text: string
	scenes: number[],
	kind?: 'reference' | 'content'
	stage?: 'history' | 'draft'
	scope?: 'body' | 'reply'
	url?: string
	added_at?: number
	updated_at?: number
	keywords?: string[]
	keywords_only?: boolean
	deleted?: Bool
}

export interface ISearchReply extends IMessage, IDocument {
	text: string
	scenes: number[]
	tokens: string[]
}
