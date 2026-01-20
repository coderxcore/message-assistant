import {IMultilingualTokenizer, IToken, LexiconLoader, MultilingualTokenizer} from "gs-tokenizer";
import {FileData} from "../data";

let tokenizer: IMultilingualTokenizer = null;

export async function messageTokens(text: string) {
	if (!tokenizer) {
		await loadLexicon();
	}
	return tokenizer.tokenizeTextAll(text)
}

export async function messageLastToken(text: string) {
	if (!tokenizer) {
		await loadLexicon();
	}
	const tokens = tokenizer.tokenizeAll(text)
	let token: IToken;
	while (token = tokens.pop()) {
		if (token.type !== 'space') {
			return token.txt;
		}
	}
	return '';
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
