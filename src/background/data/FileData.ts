

import {getLexicon, LexiconItem} from "./getLexicon";


export class FileData {

	static #lexicon?: LexiconItem[]


	static async lexicon() {
		if (this.#lexicon) {
			return this.#lexicon;
		}
		return this.#lexicon = getLexicon();
	}


}
