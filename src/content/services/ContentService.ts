import {setMsgMethod} from "gs-br-ext";
import {IContentService} from "/src-com";
import {Hub} from "../util/Hub";

setMsgMethod<IContentService>('setInputValue', async (value: string) => {
	Hub.setInputValue(value)
});
