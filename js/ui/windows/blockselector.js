import UIWindow from '../classes/UIWindow.js';
import BlocksContainer from '../classes/BlocksContainer.js';

export default class BlockSelector extends UIWindow {
	constructor(overlay, y = 430) {
		super(overlay, 'blockselector', 0, y, 640, 610 - y > 180? 180: 610-y);
		this.maxHeight = 180;
		this.shown = false;
		this.initPacks([...ItemManager.packs.keys()]);
	}

	getNextPackPosition(width) {
		let row = 0;
		let widthUsed = 5; //starting with 5 - default offset.
		for(const pack of this.elements) {
			if(widthUsed + pack.canvas.width > 630) {//630 - left and right offset of 5
				row++;
				widthUsed = 5;
			}
			widthUsed+=pack.canvas.width + 7;
		}
		if(widthUsed + width > 630) {
			row ++;
			widthUsed = 5;
		}
		return {x: widthUsed, y: row*22+9};
	}

	getHeight() {
		let height = this.getNextPackPosition(0).y += 25;
		if(height > this.maxHeight) return this.maxHeight;
		return height;
	}

	redraw() {
		const height = this.getHeight();
		this.redrawBase(640, height);
		this.pos.y = 609 - height;
		super.redraw(true);
	}

	initPacks(names) {
		for(const name of names) {
			const pack = ItemManager.getBlockPack(name);
			if(!pack || pack.name == '') continue;
			const container = new BlocksContainer(this, 0, 0, pack);
			const {x, y} = this.getNextPackPosition(container.canvas.width);
			container.pos.set(x, y); 
			//override 'add'
			this.elements.push(container);
			this[container.name] = container;
		}
		this.redraw();
	}

	addPack(name) {
		const pack = ItemManager.getBlockPack(name);
		if(!pack) return;
		const container = new BlocksContainer(this, 0, 0, pack);
		const {x, y} = this.getNextPackPosition(container.canvas.width);
		container.pos.set(x, y); 
		this.add(container);
	}


}