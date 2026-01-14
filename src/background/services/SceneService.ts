import {setMsgMethod} from "gs-br-ext";
import {IScene, ISceneService} from "/src-com";
import {Db} from "../db";
import {Scene} from "../repo/Scene";

setMsgMethod<ISceneService>({
	async queryScenes(): Promise<IScene[]> {
		try{
			return await Scene.query();
		} catch (e) {
			console.error("queryScenes error", e);
			return [];
		}
	},
	async saveScene(scene: IScene): Promise<any> {
		return await Db.scene.replace(scene);
	}
})
