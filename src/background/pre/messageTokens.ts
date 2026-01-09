import {IMultilingualTokenizer, LexiconLoader, MultilingualTokenizer} from "gs-tokenizer";
import {FileData} from "../data";

let tokenizer: IMultilingualTokenizer = null;

export async function messageTokens(text: string) {
	if (!tokenizer) {
		await loadLexicon();
	}
	return tokenizer.tokenizeTextAll(text)
}

async function loadLexicon() {
	tokenizer = new MultilingualTokenizer({lowercaseEnglish: false});
	LexiconLoader.loadTo(tokenizer);
	// tokenizer.addDictionary([
	// 	'我有一段。中文',
	// ], 'test', 300, 'zh');
	for (const {lang, words, name, priority} of await FileData.lexicon()) {
		try {
			tokenizer.addDictionary(words, name, priority, lang);
		} catch (e) {
			console.error(e)
		}
	}
}
