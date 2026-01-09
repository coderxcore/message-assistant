import {setMsgMethod} from "gs-br-ext";
import {IImportService, IMessage} from "/src-com";
import {preprocessMessages} from "../pre/preprocessMessage";

setMsgMethod<IImportService>({
	async importReferences(references: IMessage[]): Promise<void> {
		const time = Date.now();
		try {
			const packs = await preprocessMessages(references);
			console.log(packs)
			console.log(Date.now() - time)
		} catch (e) {
			console.error(e)
		}
	},
})

