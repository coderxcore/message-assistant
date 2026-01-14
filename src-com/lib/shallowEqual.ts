export function shallowEqual<T extends Record<string, any>>(a: T, b: T): boolean {
	if (a === b) return true;
	if (b && !a || a && !b) return false;

	const aKeys = Object.keys(a);
	const bKeys = Object.keys(b);
	if (aKeys.length !== bKeys.length) return false;

	for (const k of aKeys) {
		if (a[k] !== b[k]) return false;
	}
	return true;
}
