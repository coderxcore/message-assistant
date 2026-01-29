import {IScene, ISearchTerm} from "/src-com";
import {IInputItem} from "./IInputItem";
import {IPoint} from "./IPoint";

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
	inputPoint?: IPoint
	autoMode: AutoMode
	changeAutoModeTime?: number,
	termListEl?: HTMLElement
}

export interface IPageContextGetters {
	readonly el?: HTMLElement
	readonly lineHeight: number
	readonly hasWork: boolean
}

export interface IPageContextActions {

	queryTerm(search: string, start: number, end: number): Promise<void>;

	changeText(text: string): Promise<void>

	fullTerm(term: ISearchTerm): Promise<void>

	changeAutoMode(autoMode: AutoMode): void
}

export interface IPageContextStore extends IPageContextState, IPageContextGetters, IPageContextActions {
}
