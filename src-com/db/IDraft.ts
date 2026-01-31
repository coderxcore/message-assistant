export interface IDraft {

	id: number

	text: string


}

export interface IFullDaft extends IDraft {

	tabId: number

	sceneId: number

	/**
	 * 存在场景时，为场景 `site.urlPart`
	 * 不存在场景时，为`domain`
	 */
	siteKey: string

	url: string

	added_at?: number

	updated_at?: number
}
