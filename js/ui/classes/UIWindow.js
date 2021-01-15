import UIContainer from './UIContainer.js';

export default class UIWindow extends UIContainer {
	constructor(overlay, name, x, y, width, height) {
		super(overlay, name, x, y, width, height);
		this.redrawBase(width, height);
		this.requestRedraw();
	}

	redrawBase(width, height) {
		this.baseContext.clearRect(0, 0, this.base.width, this.base.height);
		this.baseContext.drawImage(ItemManager.getItem('UIContent'), 0, 0, width || this.canvas.width, height || this.canvas.height);
		this.baseContext.strokeStyle="rgba(99,99,99,1)";
		this.baseContext.lineWidth=2;
		this.baseContext.strokeRect(0, 0, width || this.base.width, height || this.base.height);
	}


}