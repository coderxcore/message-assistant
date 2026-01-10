import {ISearchEngine} from "gs-search/type";
import {SearchEngine} from "gs-search/core";
import {BrowserStorage} from "gs-search/browser";
import {IMessage, ITerm} from "/src-com";

function arrayToLower(arr: string[]): string[] {
	for (let i = 0, len = arr.length; i < len; i++) {
		arr[i] = arr[i].toLowerCase();
	}
	return arr;
}

export class Search {

	static #message: ISearchEngine

	static #termPrefix: ISearchEngine;

	static #termFuzzy: ISearchEngine;

	static get message() {
		return this.#message || (this.#message = new SearchEngine({
			storage: new BrowserStorage('message'),
			indexingTokenizer: (doc) => {
				const msg = doc as IMessage;
				return ([...(msg.keywords || []), ...(msg.tokens || [])]);
			}
		}));
	}

	static get termPrefix() {
		return this.#termPrefix || (this.#termPrefix = new SearchEngine({
			storage: new BrowserStorage('term-prefix'),
			indexingTokenizer: doc => arrayToLower((doc as ITerm).prefix || [])
		}));
	}

	static get termFuzzy() {
		return this.#termFuzzy || (this.#termFuzzy = new SearchEngine({
			storage: new BrowserStorage('term-fuzzy'),
			indexingTokenizer: doc => arrayToLower((doc as ITerm).fuzzy || [])
		}));
	}
}
