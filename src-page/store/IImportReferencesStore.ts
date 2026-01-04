import {defineStore} from "pinia";
import {openFileHandler} from "grain-sand-web-fs";
import {router} from "../view";
import {splitFile} from "/src-com";
import {Timer} from "gs-base";

export interface IImportReferencesState {
	file?: File
	delimiter: string
	preview: string[]
}

export interface IImportReferencesStore extends IImportReferencesState {
	selectFile(): Promise<void>

	updatePreview(): Promise<void>

	clearPreview(): void
}

const timer = new Timer(500);

export const useImportReferencesStore: () => IImportReferencesStore = defineStore('import-references', {
	state: (): IImportReferencesState => {
		return {
			file: undefined,
			delimiter: '(\\s*\\n+\\s*){2,}',
			preview: []
		};
	},
	actions: {
		async selectFile() {
			try {
				const handle = await openFileHandler({accept: '.txt'});
				if (!handle) {
					return;
				}
				this.file = await handle.getFile();
				if (router.currentRoute.value.name !== 'import-references') {
					await router.push({name: 'import-references'});
				}
				await this.updatePreview();
			} catch (e) {
			}
		},
		async updatePreview() {
			await timer.reWait();
			let {file, delimiter} = this;
			delimiter = new RegExp(delimiter,'g');
			this.preview.length = 0;
			const tmp = [];
			let n = 1;
			for await (const part of splitFile(file, {delimiter})) {
				tmp.push(part);
				if (n++ >= 30) {
					break;
				}
			}
			this.preview = tmp;
		},
		clearPreview() {
			this.preview.length = 0;
		}
	}
}) as any;
