import {MsgMethods, RemoteMethods} from "gs-br-ext";
import {IScene} from "../db";

interface ISceneBase {

	queryScenes(): Promise<IScene[]>;

	saveScene(scene: IScene): Promise<IScene>;
}

export interface ISceneApi extends ISceneBase, RemoteMethods {
}

export interface ISceneService extends ISceneBase, MsgMethods {
}
