export interface ISite {
	title: string
	urlPrefix: string
}

export interface IScene {
	id?: number
	name: string
	description?: string
	sites: Array<ISite>
}
