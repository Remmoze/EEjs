import UIContainer from './classes/UIContainer.js';

export default class OverlayContainer extends UIContainer {
	constructor(width = 640, height = 640) {
		super(undefined, 'overlay');
		Game.overlay = this;
	}

	handleMouseEvent(event) {
		let elements = this.getClickableElements();
		for (let i = elements.length - 1; i >= 0; i--) {
			if(elements[i].handleMouseEvent(event)) return true;
		}
		return false;
	}
}