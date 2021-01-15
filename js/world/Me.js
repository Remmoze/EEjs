import Player from './Player.js';

export default class Me extends Player {
	constructor(world, name, x, y) {
		super(world, name, x, y);
		this.me = true;
		Game.me = this;
		this.switchSmiley('batman');
      	Events.on('changeSmiley', name => this.switchSmiley(name));
	}

	update(deltaTime, gravity) {
		if(Keyboard.justPressed('KeyG')) this.godMode = !this.godMode;
		super.update(deltaTime, gravity);
	}

	draw(context) {
		super.draw(context);
		if(Game.debug) this.world.comp.getLayer('background').context.drawImage(this.animation(), this.sides.left - 5, this.sides.top - 5);
	}

	switchSmiley(name) {
		super.switchSmiley(name);
		Events.createAndFire('smileyChanged', name);
	}
}