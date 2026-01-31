import {setMsgMethod} from "gs-br-ext";
import {IContentToBgService, IDraftChangeArg, ISearchMessage} from "/src-com";

setMsgMethod<IContentToBgService>({
	async saveCurrMsgs(data: any, sender: chrome.runtime.MessageSender): Promise<void> {
		console.log(sender)
	},
	async onDraftChange(draft: IDraftChangeArg, sender: chrome.runtime.MessageSender): Promise<Partial<ISearchMessage>[]> {
		console.log(draft)
		return [];
	}

})
