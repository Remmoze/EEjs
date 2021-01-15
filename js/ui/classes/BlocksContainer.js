import UIElement from './UIElement.js';

export default class BlocksContainer extends UIElement {
	constructor(parent, x, y, blockpack) {
		super(parent, 'blockcontainer-'+blockpack.name, x, y, 2+blockpack.blocks.length*16, 18);
		this.blocks = blockpack.blocks;
		this.airSprite = ItemManager.getBlock("air").image;
		this.redraw();
	}

	redraw() {
		for(let i=0;i<this.blocks.length;i++) {
			const block = this.blocks[i];
			this.context.drawImage(this.airSprite, 1+i*16, 1);
			this.context.drawImage(ItemManager.getBlock(block.name).image, 1+i*16, 1)
		}
		this.context.strokeStyle="rgba(33,33,33,1)";
		this.context.lineWidth=2;
		this.context.strokeRect(0, 0, this.canvas.width, this.canvas.height);
	}

	onClick(event, x, y) {
		if(x>1 && x<this.blocks.length*16+1)
			Events.createAndFire('blockSelected', this.blocks[Math.floor((x-1)/16)]);
		super.onClick(event);
	}
}

