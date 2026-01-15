export async function tabExist(tabId: number) {
	try {
		const tab = await chrome.tabs.get(tabId);
		return !!tab;
	} catch (e) {
		return false;
	}
}
