import {StorageLocal} from "gs-br-ext";
import {IIndexUpdatePayload} from "../type";

const IndexUpdatePayloadKey = 'index-update-payload';

export class IndexUpdatePayload {

	static async get(): Promise<IIndexUpdatePayload> {
		return await StorageLocal.getValue(IndexUpdatePayloadKey);
	}

	static async mark(newValue: IIndexUpdatePayload): Promise<IIndexUpdatePayload> {
		const {msgFromId: nm, termFromId: nt} = newValue;
		const oldPayload = await this.get() || {};
		if (isNaN(nm) && isNaN(nt)) {
			return oldPayload;
		}
		const {msgFromId: om, termFromId: ot} = oldPayload;
		if (om > 0 && ot > 0) {
			return oldPayload;
		}
		await this.#change(newValue, oldPayload);
		return newValue;
	}

	static async clear(): Promise<void> {
		await StorageLocal.raw.remove(IndexUpdatePayloadKey);
	}

	static async replace(value: IIndexUpdatePayload): Promise<IIndexUpdatePayload> {
		const {msgFromId, termFromId} = value;
		if (isNaN(msgFromId) && isNaN(termFromId)) {
			return;
		}
		await StorageLocal.setValue(IndexUpdatePayloadKey, value);
		return value;
	}

	static async #change(newValue: IIndexUpdatePayload, oldValue: IIndexUpdatePayload): Promise<void> {
		const {msgFromId: nm, termFromId: nt} = newValue;
		const {msgFromId: om, termFromId: ot} = oldValue;
		if (nm > 0 && isNaN(om)) {
			oldValue.msgFromId = nm;
		}
		if (nt > 0 && isNaN(ot)) {
			oldValue.termFromId = nt;
		}
		await StorageLocal.setValue(IndexUpdatePayloadKey, oldValue);
	}

}
