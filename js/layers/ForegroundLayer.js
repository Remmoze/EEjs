import Layer from './Layer.js';

export default class ForegroundLayer extends Layer {
	constructor(world){
		super(world, 'foreground', 1600, 1600);
		this.world.fgblocks.forEach((block, x, y) => this.drawBlock(block.name, x, y));
	}	
}