import {setMsgMethod} from "gs-br-ext";
import {IScene, ISceneService} from "/src-com";
import {Db} from "../db";

setMsgMethod<ISceneService>({
	async queryScenes(): Promise<IScene[]> {
		return await Db.scene.all();
	},
	async saveScene(scene: IScene): Promise<any> {
		return await Db.scene.replace(scene);
	}
})
