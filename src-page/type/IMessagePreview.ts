import {ISearchMessage} from "/src-com";

export const enum PartType {
	Source = 1,
	Replace = 2,
}


export interface ITextPart {
	type: PartType,
	text: string;
	keyword?: string
	src?: string
}

export interface IMessagePreview {
	srcMsg: Partial<ISearchMessage>
	parts: ITextPart[];
}
