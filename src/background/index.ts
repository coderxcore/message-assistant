import './services/SettingsService'
import './services/LocalService'

export default defineBackground({
	main() {
		chrome.sidePanel.setPanelBehavior({openPanelOnActionClick: true}).catch(console.log)
		chrome.commands.onCommand.addListener(function(command) {
			console.log(command)
		});
	}
})
