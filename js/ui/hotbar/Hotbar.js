import UIContainer from '../classes/UIContainer.js';
import SmileyChanger from './SmileyChanger.js';
import GodModeSwitcher from './GodModeSwitcher.js';
import BlockSelector from './BlockSelector.js';

export default class Hotbar extends UIContainer {
	constructor(overlay) {
		super(overlay, "hotbar", 0, 640 - 35, 640, 35);
		this.baseSprite = ItemManager.getItem('hotbar');
		this.add(new SmileyChanger(this, 0));
		this.add(new GodModeSwitcher(this, 31));
		this.add(new BlockSelector(this, 62));
		this.redraw();
	}

	redraw() {
		this.clear();
		this.context.drawImage(this.baseSprite, 0, 0, this.canvas.width, this.canvas.height);
		super.redraw(true);
	}


}