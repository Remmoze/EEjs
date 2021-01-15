import UIContainer from './UIContainer.js';

export default class HotbarItem extends UIContainer {
	constructor(hotbar, name, x, width){
		super(hotbar, name, x, 4, width || 31, 31);
		this.icon = document.createElement('canvas');
		this.icon.width = 30;
		this.icon.height = 30;
	}

	setIcon(sprite) {
		if(!sprite) return;
		let context = this.icon.getContext('2d');
		context.clearRect(0, 0, this.icon.width, this.icon.height);
		context.drawImage(sprite, 0, 0, this.icon.width, this.icon.height);
		this.redraw();
	}

	redrawInsides() {
		this.context.drawImage(this.icon, this.canvas.width/2 - this.icon.width/2 - 1, this.canvas.height/2 - this.icon.height/2);
	}

	redraw() {
		this.clear();
		this.context.drawImage(ItemManager.getItem('UIContent'), 0, 0, this.canvas.width, this.canvas.height);
		this.redrawInsides();
		this.context.strokeStyle="rgba(99,99,99,1)";
		this.context.lineWidth=2;
		this.context.strokeRect(0, 0, this.canvas.width, this.canvas.height);
		this.requestRedraw(true);
	}
}