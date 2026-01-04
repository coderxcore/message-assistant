import {setMsgMethod} from "gs-br-ext";
import {IImportService} from "/src-com";
import {Status} from "../Status";

setMsgMethod<IImportService>({
	async startImport(text: string): Promise<void> {
		await Status.setImportStart(text)
	},
	async endImport(): Promise<void> {
		await Status.clearImportStart();
	},
	async importReferences(references: string[]): Promise<void> {
		// const data:IMessage[] = references.map(text=>({
		//
		// 	text
		// }))
	},
})

