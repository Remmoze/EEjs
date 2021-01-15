import Layer from './Layer.js';

export default class BackgroundLayer extends Layer {
	constructor(world){
		super(world, 'background', 1600, 1600);
		this.world.bgblocks.forEach((block, x, y) => this.drawBlock(block.name, x, y));
	}

	clearBlock(x, y) {
		this.context.drawImage(ItemManager.getBlock('air').image, x*16, y*16);
	}
}