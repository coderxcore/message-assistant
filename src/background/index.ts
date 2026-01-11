import './services/SettingsService'
import './services/LocalService'
import './services/MessageService'
import './services/ImportService'
import './services/SceneService'
import './services/IndexService'

export default defineBackground({
	main() {
		chrome.sidePanel.setPanelBehavior({openPanelOnActionClick: true}).catch(console.log)
		// chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
		// 	if (tab.url?.includes('options.html')) {
		// 		(chrome.sidePanel as any).close({ tabId });
		// 	}
		// });
	}
})
