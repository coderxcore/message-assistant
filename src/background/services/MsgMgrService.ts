import {setMsgMethod} from "gs-br-ext";
import {IMessage, IMsgMgrService, IPageParam} from "/src-com";
import {Db} from "../db";
import {Bool} from "gs-idb-basic";
import {strToRegex} from "../../../src-com/lib/strToRegex";
import {FindFn} from "gs-idb-pro";

const DefaultPageParam: IPageParam = Object.freeze({
	page: 1,
	size: 100
})

function createFn(regex?: string): FindFn<IMessage> | undefined {
	if (!regex) {
		return undefined;
	}
	const reg = strToRegex(regex);
	return (msg) => reg.test(msg.text);
}

setMsgMethod<IMsgMgrService>({
	clearTrash(): Promise<IMessage> {
		return Promise.resolve(undefined);
	},
	nativeRemove(id: number): Promise<IMessage> {
		return Promise.resolve(undefined);
	},
	queryHistory(param?: IPageParam): Promise<IMessage[]> {
		const {page, size, regex}: IPageParam = {...DefaultPageParam, ...param};
		return Db.msgContentDeleted.filter({
			query: [Bool.True, Bool.False],
			limit: size,
			preSkip: (page - 1) * size,
			fn: createFn(regex)
		});
	},
	queryReferences(param?: IPageParam): Promise<IMessage[]> {
		const {page, size, regex}: IPageParam = {...DefaultPageParam, ...param};
		return Db.msgReferenceDeleted.filter({
			query: [Bool.True, Bool.False], limit: size, preSkip: (page - 1) * size,
			fn: createFn(regex)
		});
	},
	queryTrash(param?: IPageParam): Promise<IMessage[]> {
		const {page, size, regex}: IPageParam = {...DefaultPageParam, ...param};
		return Db.msgDeleted.filter({
			query: Bool.True, limit: size, preSkip: (page - 1) * size,
			fn: createFn(regex)
		});
	},
	saveChange(msg: IMessage): Promise<IMessage> {
		return Promise.resolve(undefined);
	}
})
