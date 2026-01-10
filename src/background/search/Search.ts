import {IndexingTokenizer, ISearchEngineOption} from "gs-search/type";
import {IMessage, ITerm} from "/src-com";

function arrayToLower(arr: string[]): string[] {
	for (let i = 0, len = arr.length; i < len; i++) {
		arr[i] = arr[i].toLowerCase();
	}
	return arr;
}

const messageTokenize: IndexingTokenizer = (doc) => {
	const msg = doc as IMessage;
	return ([...(msg.keywords || []), ...(msg.tokens || [])]);
}

const termPrefixTokenize: IndexingTokenizer = doc => {
	const msg = doc as ITerm;
	return arrayToLower(msg.prefix || []);
}

const termFuzzyTokenize: IndexingTokenizer = doc => {
	const msg = doc as ITerm;
	return arrayToLower(msg.fuzzy || []);
}

// export class Search {
//
// 	static #message: SearchEngine
//
// 	static #termPrefix: SearchEngine;
//
// 	static #termFuzzy: SearchEngine;
//
// 	static get message() {
// 		return this.#message || (this.#message = new SearchEngine({baseDir: 'message'}));
// 	}
//
// 	static get termPrefix() {
// 		return this.#termPrefix || (this.#termPrefix = new SearchEngine({baseDir: 'term-prefix'}));
// 	}
//
// 	static get termFuzzy() {
// 		return this.#termFuzzy || (this.#termFuzzy = new SearchEngine({baseDir: 'term-fuzzy'}));
// 	}
// }
