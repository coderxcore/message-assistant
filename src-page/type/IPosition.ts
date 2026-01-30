export interface IPosition<T extends string | number = string> {
	top: T
	left: T
}

export interface ISize<T extends string | number = string> {
	width: T
	height: T
}

export interface IMaxSize<T extends string | number = string> {
	maxWidth: T
	maxHeight: T
}

export interface IBounds<T extends string | number = string> extends IPosition<T>, IMaxSize<T> {

}
