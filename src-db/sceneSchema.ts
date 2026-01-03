import {IStoreSchema} from "gs-idb-pro";
import {IScene} from "../src-type";

export const SceneStoreName = 'scene'


export const sceneSchema: IStoreSchema = {
	name: SceneStoreName,
	defaultData:<IScene[]>[
		{
			id: -2,
			name: 'allScene',
			description: 'allSceneDesc',
			sites: []
		},
		{
			id: -1,
			name: 'defaultScene',
			description: 'defaultSceneDesc',
			sites: []
		},
		{
			id: 1,
			name: 'aiScene',
			description: 'aiSceneDesc',
			sites: [
				{
					title: 'chatgpt',
					urlPrefix: 'chatgpt.com',
				},
				{
					title: 'google bard',
					urlPrefix: 'bard.google.com',
				},
				{
					title: 'claude',
					urlPrefix: 'claude.ai',
				},
				{
					title: '文心一言',
					urlPrefix: 'yiyan.baidu.com',
				},
				{
					title: '通义千问',
					urlPrefix: 'tongyi.aliyun.com',
				}
			]
		},
		{
			id: 2,
			name: 'socioScene',
			description: 'socioSceneDesc',
			sites: [
				{
					title: 'facebook',
					urlPrefix: 'facebook.com',
				},
				{
					title: 'x',
					urlPrefix: 'x.com',
				},
				{
					title: 'instagram',
					urlPrefix: 'instagram.com',
				},
				{
					title: 'linkedin',
					urlPrefix: 'linkedin.com',
				},
				{
					title: 'wechat',
					urlPrefix: 'wechat.com',
				},
				{
					title: 'weibo',
					urlPrefix: 'weibo.com',
				}
			]
		},
		{
			id: 3,
			name: 'videoScene',
			description: 'videoSceneDesc',
			sites: [
				{
					title: 'youtube',
					urlPrefix: 'youtube.com',
				},
				{
					title: 'netflix',
					urlPrefix: 'netflix.com',
				},
				{
					title: 'twitch',
					urlPrefix: 'twitch.tv',
				},
				{
					title: 'bilibili',
					urlPrefix: 'bilibili.com',
				},
				{
					title: 'douyin',
					urlPrefix: 'douyin.com',
				}
			]
		},
	]
}
