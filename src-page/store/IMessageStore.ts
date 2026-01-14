import {defineStore} from "pinia";
import {Api} from "../api";
import {IMessage, IMessageQuery, IMessageStatus, ISearchMessage, ISearchTerm} from "/src-com";

export interface IMessageState {
	input: string
	terms: ISearchTerm[]
	status: IMessageStatus
	searchMessages: ISearchMessage[]
	lastMessages: IMessage[]
	query: IMessageQuery
}

export interface IMessageStore extends IMessageState {
	queryTerm(text: string): Promise<void>;

	queryMessage(): Promise<void>;

	loadStatus(): Promise<void>;

	loadMessage(): Promise<void>;
}

export const useMessageStore: () => IMessageStore = defineStore('message', {
	state: (): IMessageState => {
		return {
			input: localStorage.messageInput || '',
			terms: [],
			status: {} as any,
			searchMessages: [],
			query: {},
			lastMessages: [],
		};
	},
	actions: <IMessageStore>{
		async queryTerm(text: string) {
			this.terms.length = 0;
			this.terms = await Api.search.searchTerm(text);
		},
		async queryMessage() {
			if (!this.input) {
				this.searchMessages.length = [];
				return;
			}
			this.searchMessages = await Api.search.searchMsg(this.input);
			localStorage.messageInput = this.input;
		},
		async loadStatus() {
			this.status = await Api.message.messageStatus();
		},
		async loadMessage() {
			this.lastMessages = await Api.message.loadMessage(this.query);
			if (this.input) {
				await this.queryTerm(this.input)
				await this.queryMessage()
			}
		}
	}
}) as any;
