import {IDocumentBase, ISearchEngine} from "gs-search/type";
import {SearchEngine} from "gs-search/core";
import {BrowserStorage} from "gs-search/browser";
import {IMessage, ITerm} from "/src-com";
import {messageLastToken, messageTokens} from "../pre/messageTokens";
import {buildFuzzy, buildPrefix} from "../pre/multiLangTokenizer";

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
			storage: new BrowserStorage('termPrefix'),
			indexingTokenizer: doc => arrayToLower((doc as ITerm).prefix || [])
			// indexingTokenizer: doc => {
			// 	const r = arrayToLower((doc as ITerm).prefix || []);
			// 	console.log(doc, r)
			// 	return r;
			// }
		}));
	}

	static get termFuzzy() {
		return this.#termFuzzy || (this.#termFuzzy = new SearchEngine({
			storage: new BrowserStorage('termFuzzy'),
			indexingTokenizer: doc => arrayToLower((doc as ITerm).fuzzy || [])
			// indexingTokenizer: doc => {
			// 	const r = arrayToLower((doc as ITerm).fuzzy || []);
			// 	console.log(doc, r)
			// 	return r;
			// }
		}));
	}

	static async searchTerm(text: string) {
		if (!text) return []
		text = await messageLastToken(text)
		console.log(text)
		if (!text) return []
		const term = {
			text: text,
			prefix: [text, ...buildPrefix(text, 2)]
		}
		const result = await this.termPrefix.search(term);
		if (result?.length > 0) {
			return result;
		}
		const term2 = {
			text: text,
			fuzzy: [text, ...buildFuzzy(text, {} as any)],
		}
		return await this.termFuzzy.search(term2);
	}

	static async searchMsg(text: string) {
		const doc = {
			text,
			tokens: await messageTokens(text),
		} as IDocumentBase;
		return await this.message.search(doc);
	}
}
