import {setMsgMethod} from "gs-br-ext";
import {IImportService, IMessage} from "/src-com";
import {preprocessMessages} from "../pre/preprocessMessage";
import {saveMessagePack} from "../repo/saveMessagePack";

setMsgMethod<IImportService>({
	async importReferences(references: IMessage[]): Promise<void> {
		try {
			const packs = await preprocessMessages(references);
			const result = await saveMessagePack(packs);
			console.log(result)
		} catch (e) {
			console.error(e)
			throw e;
		}
	},
})

