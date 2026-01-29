export function mergeWithMaxLength<T>(a: T[], b: T[], maxLen: number): T[] {
	const total = a.length + b.length;

	if (total <= maxLen) {
		return [...a, ...b];
	}

	if (maxLen <= 0) return [];

	const ratioA = a.length / total;
	let lenA = Math.floor(maxLen * ratioA);
	let lenB = maxLen - lenA;

	if (a.length > 0 && lenA === 0) {
		lenA = 1;
		lenB = maxLen - 1;
	}
	if (b.length > 0 && lenB === 0) {
		lenB = 1;
		lenA = maxLen - 1;
	}

	return [
		...a.slice(0, lenA),
		...b.slice(0, lenB),
	];
}
