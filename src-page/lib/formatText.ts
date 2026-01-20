export function formatText(text: string) {
	if (!text) return '';
	return text.replace(/\s*[\r\n]\s*/g, '<br/>');
}
