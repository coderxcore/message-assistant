import {setMsgMethod} from "gs-br-ext";
import {IMessage, ISearchedMessage, ISearchService, ISearchTerm, ITerm} from "/src-com";
import {Search} from "../search/Search";
import {queryTermBySearch} from "../repo/queryTermBySearch";
import {queryMessageBySearch} from "../repo/queryMessageBySearch";

setMsgMethod<ISearchService>({
	async searchMsg(text: string): Promise<ISearchedMessage[]> {
		return await queryMessageBySearch(await Search.searchMsg(text));
	},
	async searchTerm(text: string): Promise<ISearchTerm[]> {
		return await queryTermBySearch(await Search.searchTerm(text));
	}

});
