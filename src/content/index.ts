// import "./dom/event-register";
// import './services/ContentService'
// import '/src-page/style/index.scss'

import "./ui";

export default defineContentScript({
	matches: ['<all_urls>'],
	cssInjectionMode: 'ui',
	main(): void | Promise<void> {
		console.log('plugin loaded')
	}
});
