import {IResult} from "gs-search";
import {Db} from "../db";
import {ISearchTerm} from "/src-com";

export async function queryTermBySearch(results: IResult[]): Promise<ISearchTerm[]> {
	return await Db.term.batchRead(async (store) => {
		const terms: ISearchTerm[] = [];
		for (const result of results) {
			const term = await store.get(result.id);
			if (term) {
				terms.push({
					...result,
					text: term.text,
				});
			}
		}
		return terms;
	})
}
