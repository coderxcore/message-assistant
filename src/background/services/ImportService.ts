import {setMsgMethod} from "gs-br-ext";
import {builtInSceneIds, IBuiltInItem, IImportService, IMessage} from "/src-com";
import {preprocessMessages} from "../pre/preprocessMessage";
import {saveMessagePack} from "../repo/saveMessagePack";
import {Bool} from "gs-idb-basic";
import {clearMessageStatusCache} from "../repo/messageStatus";

async function importReferences(references: IMessage[]): Promise<any> {
	try {
		const packs = await preprocessMessages(references);
		clearMessageStatusCache()
		return {
			preResult: {
				msgs: packs.messages.length,
				terms: packs.terms.length,
			},
			saveResult: await saveMessagePack(packs),
		};
	} catch (e) {
		console.error(e)
		throw e;
	}
}

setMsgMethod<IImportService>({
	importReferences,
	async importBuiltIn(item: IBuiltInItem): Promise<any> {
		const {lang, scene} = item;
		const sceneId = builtInSceneIds[scene];
		const path = `data/references/${lang.replace(/-/, '_')}/${scene}.txt`;
		const data = (await fetch(path).then(r => r.text())).split(/\s*[\r\n]\s*/).filter(Boolean)
		const msgs: IMessage[] = data.map(text => ({sceneId, text, is_reference: Bool.True}))
		return await importReferences(msgs);
	}
})

