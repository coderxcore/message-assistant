import {defineStore} from "pinia";
import {openFileHandler} from "grain-sand-web-fs";
import {router} from "../view";
import {ISplitOption, splitFile} from "/src-com";
import {Timer} from "gs-base";
import {Api} from "../api";
import {Bool} from "gs-idb-basic";

export interface IImportReferencesState {
	file?: File
	pattern: string
	preview: string[]
	loading: false
	sceneId: number
}

export interface IImportReferencesGetter {
	readonly delimiter: RegExp
}

export interface IImportReferencesStore extends IImportReferencesState, IImportReferencesGetter {
	selectFile(): Promise<void>

	updatePreview(): Promise<void>

	confirmImport(onProgress?: ISplitOption['onProgress']): Promise<void>
}

const previewCount = 1000;
const taskItemCount = 100;

const timer = new Timer(500);

export const useImportReferencesStore: () => IImportReferencesStore = defineStore('import-references', {
	state: (): IImportReferencesState => {
		return {
			file: undefined,
			pattern: '(\\s*\\n+\\s*){2,}',
			preview: [],
			loading: false,
			sceneId: -1
		};
	},
	getters: {
		delimiter() {
			return new RegExp(this.pattern, 'g');
		}
	},
	actions: {
		async selectFile() {
			try {
				const handle = await openFileHandler({accept: '.txt'});
				if (!handle) {
					return;
				}
				this.loading = true;
				this.file = await handle.getFile();
				if (router.currentRoute.value.name !== 'import-references') {
					await router.push({name: 'import-references'});
				}
				await this.updatePreview();
			} catch (e) {
			} finally {
				this.loading = false;
			}
		},
		async updatePreview() {
			await timer.reWait();
			this.loading = true;
			try {
				const {file, delimiter} = this;
				this.preview.length = 0;
				const tmp = [];
				let n = 1;
				for await (const part of splitFile(file, {delimiter})) {
					tmp.push(part.replace(/\n/g, '<br>'));
					if (n++ >= previewCount) {
						break;
					}
				}
				this.preview = tmp;
			} finally {
				this.loading = false;
			}
		},
		async confirmImport(fn?: ISplitOption['onProgress']) {
			const {file, delimiter, sceneId} = this;
			let onProgress: ISplitOption['onProgress'] = undefined, bytes = 0;
			if (fn) {
				onProgress = async (loaded: number, total: number) => {
					bytes = total;
					await fn(loaded / 2, total);
				}
			}
			try {
				let started = false;
				const rows = [];
				for await (const part of splitFile(file, {delimiter, onProgress})) {
					rows.push(part);
					if (!started) {
						started = true;
					}
					if (rows.length >= taskItemCount) {
						await Api.import.importReferences(rows.map(text => ({
							text,
							sceneIds: [sceneId],
							is_reference: Bool.True
						})));
						fn(len(rows, bytes), bytes)
						rows.length = 0;
					}
				}
				fn(len(rows, bytes), bytes)
				if (rows.length) {
					await Api.import.importReferences(rows.map(text => ({
						text,
						sceneIds: [sceneId],
						is_reference: Bool.True
					})));
				}
				fn(bytes, bytes)
			} finally {
				try {
					this.file = undefined;
				} finally {
					// await Api.import.endImport();
				}
			}
		}
	}
}) as any;


function len(arr, bytes: number) {
	let total = 0
	for (let i = 0; i < arr.length; i++) {
		total += arr[i].length
	}
	const tmp = bytes / 2;
	total += tmp;
	if (total <= bytes) {
		return total;
	}
	return bytes;
}
