import {IDocument, IDocumentBase} from "gs-search";

export interface IWord extends IDocumentBase {
	text: string
}

export interface ISavedWord extends IWord, IDocument {
	id: number
}

export interface ISearchWord extends ISavedWord {
	tokens: string[]
}
