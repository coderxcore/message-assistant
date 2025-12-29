import {IDocument, IDocumentBase} from "gs-search";

export const enum ReplyType {
	Draft = 1,
	Reply = 2,
	References = 3,
}

export interface IReply extends IDocumentBase {
	id?: number
	text: string
	type?: ReplyType
	url?: string
	scenes?: string[]
	added_at?: number
	updated_at?: number
	keywords?: string[]
	keywords_only?: boolean
}

export interface ISearchReply extends IReply, IDocument {
	text: string
	tokens: string[]
}
