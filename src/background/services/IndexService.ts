import {setMsgMethod} from "gs-br-ext";
import {IIndexService} from "/src-com";
import {updateIndex} from "../search/updateIndex";

setMsgMethod<IIndexService>({
	updateIndex
})
