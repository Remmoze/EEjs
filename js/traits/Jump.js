import Trait from './Trait.js';

export default class Jump extends Trait {
   constructor(player){
		super(player, 'jump');
		this.player.attr.set('onGround', false);
		this.velocity = 520;
		this.injump = false;
		this.nextjump = 0;
   }

   update(deltaTime){
		if(Keyboard.justPressed('Space')) {
   			this.nextjump = 0.750;
	   		if(this.player.attr.get('onGround')) 
		   		this.injump = true;
   		}

   		if(Keyboard.space && this.nextjump <= 0 && this.player.attr.get('onGround')){
	   		this.injump = true;
	   		this.nextjump = 0.150;
	   	}
	   	if(this.injump){
	   		if(this.player.heading.x) this.player.vel.x = this.player.heading.x * -this.velocity;
	   		else if(this.player.heading.y) this.player.vel.y = this.player.heading.y * -this.velocity;
	   		this.injump = false;
	   	}
	   	this.nextjump -= deltaTime;
   	}
}