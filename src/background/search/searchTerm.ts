import {messageLastToken} from "../pre/messageTokens";
import {buildFuzzy} from "../pre/multiLangTokenizer";
import {Search} from "./Search";
import {ISearchTerm} from "/src-com";

export async function searchTerm(text: string): Promise<ISearchTerm[]> {
	if (!text?.length) return []
	const lastToken = await messageLastToken(text)
	if (!lastToken) return []
	const map = new Map<number, ISearchTerm>();
	if (text.endsWith(lastToken)) {
		const term = {
			text: lastToken,
			prefix: [lastToken]
		}
		const result = await Search.termPrefix.search(term);
		result.forEach(item => map.set(item.id, {...item, termType: 'prefix'} as ISearchTerm));
	}
	if (map.size > 10) return [...map.values()];
	const term2 = {
		text: lastToken,
		fuzzy: [lastToken, ...buildFuzzy(lastToken, {} as any)],
	};
	(await Search.termFuzzy.search(term2)).forEach(item => map.set(item.id, {
		...item,
		termType: 'fuzzy'
	} as ISearchTerm));
	return [...map.values()];
}

//todo: 优化首字与模糊结果的合并
