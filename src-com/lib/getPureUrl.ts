export function getPureUrl(url: string): string {
	return url?.replace(/^[^/]+\/\/|\?.*$/g, "")!;
}
