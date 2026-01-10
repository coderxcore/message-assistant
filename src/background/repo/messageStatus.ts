import {IMessageStatus} from "/src-com";
import {Db} from "../db";
import {Bool} from "gs-idb-basic";

export async function messageStatus(): Promise<IMessageStatus> {
	return await Db.msgAndDraft.read(async (mes, draft) => ({
		draftCount: await draft.count(),
		historyCount: await mes.index('is_content_deleted').count([Bool.True, Bool.False]),
		trashCount: await mes.index('deleted').count(Bool.True),
		referencesCount: await mes.index('is_reference_deleted').count([Bool.True, Bool.False])
	}))
}
