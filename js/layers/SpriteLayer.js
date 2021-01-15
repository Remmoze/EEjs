import Layer from './Layer.js';

export default class SpriteLayer extends Layer {
	constructor(world, width = 640, height = 640){
		super(world, 'sprite', width, height);
	}

	draw(context, camera){
		this.world.players.forEach(player => {
	         this.context.clearRect(0, 0, this.buffer.width, this.buffer.height);
	         player.draw(this.context);
	         context.drawImage(this.buffer, Math.round(player.pos.x - camera.pos.x) - 24, Math.round(player.pos.y - camera.pos.y) - 24);
      	});
	}
}