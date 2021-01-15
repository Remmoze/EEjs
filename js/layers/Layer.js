export default class Layer {
	constructor(world, name, width, height){
		this.world = world;
		this.name = name;
		this.buffer = document.createElement('canvas');
		this.buffer.width = width; //656
  		this.buffer.height = height; //496
		this.context = this.buffer.getContext('2d');
		this.world.comp.setLayer(this);
	}

	drawBlock(name, x, y) {
		this.context.drawImage(ItemManager.getBlock(name).image, x*16, y*16);
	}

	setBlock(block, x, y){
		this.clearBlock(x, y);
		this.drawBlock(block.name, x, y);
	}

	clearBlock(x, y) {
		this.context.clearRect(x*16, y*16, 16, 16);
	}

	draw(context, camera){
		context.drawImage(this.buffer, Math.round(-camera.pos.x), Math.round(-camera.pos.y));
	}
}