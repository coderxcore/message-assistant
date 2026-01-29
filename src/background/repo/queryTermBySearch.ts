import {Db} from "../db";
import {ISearchTerm} from "/src-com";
import {findLongest} from "/src-com/lib/findLongest";

export async function queryTermBySearch(results: ISearchTerm[], text: string): Promise<ISearchTerm[]> {
	return await Db.term.batchRead(async (store) => {
		const terms: ISearchTerm[] = [];
		for (const result of results) {
			const term = await store.get(result.id);
			if (
				!term
				|| term.text == result.tokens[0]
				|| text.includes(term.text)
			) {
				continue;
			}
			if (term.text < 3) {
				const token = findLongest(result.tokens);
				if (!text.endsWith(token)) {
					continue;
				}
			}
			if (result.tokens.some(t => term.text.includes(t))) {
				terms.push({
					...result,
					text: term.text,
				} as any);
			}
			if (terms.length >= 9) break;
		}
		return terms;
	})
}
