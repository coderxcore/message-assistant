export interface ICountLinesOption {
	min?: number;
	max?: number;
}

export function countLines(str: string, options?: ICountLinesOption): number {
	let lines = 0;
	if (str) {
		lines = 1;
		for (let i = 0; i < str.length; i++) {
			if (str[i] === '\n') lines++;
		}
	}

	const {min, max} = options || {};

	if (!isNaN(min) && lines < min) return min;
	if (!isNaN(max) && lines > max) return max;

	return lines;
}
