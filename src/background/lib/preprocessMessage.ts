import {IMessage} from "/src-com";
import {hash} from "gs-search";
import {messageTokens} from "./messageTokens";

export async function preprocessMessages(messages: IMessage[]): Promise<IMessage[]> {
	return await Promise.all(messages.map(preprocessMessage));
}

export async function preprocessMessage(msg: IMessage,i:number): Promise<IMessage> {
	msg.hash = hash(msg.text);
	msg.tokens = await messageTokens(msg.text);
	console.log(i)
	console.log(msg.text)
	console.log(msg.tokens)
	return msg;
}
