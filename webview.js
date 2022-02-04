// Zalo integration
const path = require('path');

module.exports = (Franz, options) => {
	function getEntityFromCharacter(character) {
		var hexCode = character.replace(/['"]/g, '').charCodeAt(0).toString(16).toUpperCase();
		while (hexCode.length < 4) {
			hexCode = '0' + hexCode;
		}

		return '\\' + hexCode + ';';
	}

	function getBadgeNumberFromElement(element) {
		var badge = getEntityFromCharacter(window.getComputedStyle(element, '::after').content);
		switch (badge) {
			case '\\EBA1;': return 5;
			case '\\EBA0;': return 5;
			case '\\EB9F;': return 4;
			case '\\EB9E;': return 3;
			case '\\EB9D;': return 2;
			case '\\EB9C;': return 1;
			default: return 0;
		}
	}

	function getMessages() {
		var badgeElements = document.querySelectorAll("#conversationListId i.conv-unread")
		var count = [...badgeElements].reduce((s, element) => s + getBadgeNumberFromElement(element), 0);
		Franz.setBadge(count);
	};
	Franz.loop(getMessages);
	Franz.injectCSS(path.join(__dirname, 'style.css'));
};
