import {LexiconLoader, MultilingualTokenizer} from "gs-tokenizer";
import {FileData} from "../data";

const tokenizer = new MultilingualTokenizer();

let tokenInit: boolean = false;

export async function messageTokens(text: string) {
	if (!tokenInit) {
		await loadLexicon();
		tokenInit = true;
	}
	return tokenizer.tokenizeText(text);
}

async function loadLexicon() {
	LexiconLoader.loadTo(tokenizer);
	for (const {lang, words, name, priority} of await FileData.lexicon()) {
		try {
			tokenizer.addDictionary(words, name, priority, lang);
		} catch (e) {
			console.error(e)
		}
	}
}
