import {defineStore} from "pinia";
import {builtInSceneIds, IScene, ISearchTerm} from "/src-com";
import {AutoMode, IInputItem, IPageContextActions, IPageContextState, IPageContextStore} from "../type";
import {queryTerm} from "/src-page/lib/queryTerm";
import {writeInput} from "../lib/writeInput";
import {getTermText} from "/src-com/lib/getTermText";


export const usePageContextStore: () => IPageContextStore = defineStore('page-context-store', {
	state: (): IPageContextState => {
		return {
			scene: {id: builtInSceneIds.unspecifiedScene} as IScene,
			terms: [],
			inputItem: undefined,
			autoMode: AutoMode.Off,
			changeAutoModeTime: undefined,
			termListEl: undefined,
			active: false,
			locationChangeTime: undefined
		};
	},
	getters: {
		el(state): HTMLElement | undefined {
			return state.inputItem?.el;
		},
		hasWork({terms, inputItem, active}: IPageContextStore): boolean {
			return active && inputItem?.text?.length > 0 && terms.length > 0;
		},
	},
	actions: <IPageContextActions>{
		async queryTerm(search: string, start: number, end: number): Promise<void> {
			if (!search) {
				this.terms = [];
				return;
			}
			this.terms = await queryTerm(search, this.inputItem.text, start, end);
		},
		async changeText(text: string): Promise<void> {
			await writeInput(this.el, text);
			setTimeout(() => this.queryTerm(text, text.length, text.length), 10)
		},
		async fullTerm(term: ISearchTerm): Promise<void> {
			if (!term) return;
			const text = this.inputItem.text = getTermText(this.inputItem.text, term);
			this.terms.length = 0;
			await this.changeText(text);
		},
		changeAutoMode(autoMode: AutoMode): void {
			if (autoMode === AutoMode.Term && this.terms.length) {
				this.autoMode = AutoMode.Term;
			} else {
				this.autoMode = AutoMode.Off;
				this.el?.focus();
			}
			// console.log(autoMode,this.autoMode)
			this.changeAutoModeTime = Date.now();
		},
		setInputItem(item: IInputItem): void {
			this.inputItem = item;
			this.locationChangeTime = Date.now();
		},
		async autoComplete(index: number): Promise<void> {
			if (this.autoMode === AutoMode.Term) {
				await this.fullTerm(this.terms[index])
			}
			this.changeAutoMode(AutoMode.Off);
		}
	}
}) as any;
