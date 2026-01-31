import {IScene, ISearchMessage, ISearchTerm} from "/src-com";
import {IInputItem} from "./IInputItem";

export const enum AutoMode {
	Off = undefined,
	Term = 1,
	Msg = 2,
}

export interface IPageContextState {
	active: boolean
	scene: IScene
	inputItem?: IInputItem
	terms: ISearchTerm[]
	autoMode: AutoMode
	changeAutoModeTime?: number,
	termListEl?: HTMLElement
	locationChangeTime?: number
	searchMsgs: Partial<ISearchMessage>[]
}

export interface IPageContextGetters {
	readonly el?: HTMLElement
	readonly hasWork: boolean
}

export interface IPageContextActions {

	queryTerm(search: string, start: number, end: number): Promise<void>;

	changeText(text: string): Promise<void>

	fullTerm(term: ISearchTerm): Promise<void>

	changeAutoMode(autoMode: AutoMode): void

	setInputItem(item: IInputItem): void

	autoComplete(index: number): Promise<void>

	draftChang(): Promise<void>
}

export interface IPageContextStore extends IPageContextState, IPageContextGetters, IPageContextActions {
}
