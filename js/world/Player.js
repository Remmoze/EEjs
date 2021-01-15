import {Point, RoundPoint} from '../math.js';
import Trait from '../traits/Trait.js';
import Go from '../traits/Go.js';
import Jump from '../traits/Jump.js';
import Touch from '../traits/Touch.js';
import Sides from '../traits/Sides.js';

export default class Player {
	constructor(world, name, x, y) {
		this.world = world;
		this.attr = new Map();
		this.name = name.substring(0, 20).toLowerCase();
		init(this, x, y);
	}

   addTrait(trait){
      this.traits.push(trait);
      this[trait.NAME] = trait;
   }

   update(deltaTime, gravity){
		this.traits.forEach(trait => trait.update(deltaTime, gravity)); //update Traits
   }

   draw(context){
   	if(this.godMode) context.drawImage(this.aura, 0, 0); //draw aura

      context.drawImage(this.animation(), 0, 0, 26, 26, 19, 19, 26, 26); //draw smiley

      if(this.attr.get('hasCrown')) context.drawImage(ItemManager.getBlock('special:crown').image, 24, 13); //draw crown

      context.drawImage(this.nameImage, -28, 43); //draw name
   }

   switchSmiley(name) {
      const smiley = ItemManager.getSmiley(name);
      this.smiley = smiley.name;
      this.animation = createAnimation(smiley);
   }
}

function initPhysics(player, x, y) {
   player.pos = new Point(x * 16 || player.world.spawn.x, y * 16 || player.world.spawn.y);
   player.vel = new Point(0, 0);
   player.size = new Point(16, 16);
   player.heading = new Point(0, 0);
   player.facing = 'down';
   player.godMode = false;
   player.attr.set('hasCrown', false);
}

function initTraits(player) {
   player.traits = [];
   player.addTrait(new Sides(player));
   player.addTrait(new Touch(player, player.world));
   player.addTrait(new Go(player));
   player.addTrait(new Jump(player));
}

function init(player, x, y) {
   initPhysics(player, x, y);
   initTraits(player);
   player.aura = ItemManager.auras.get('basic');
   player.nameImage = createNameCanvas(player.name);
   player.switchSmiley('smile');
}

function createAnimation(smiley) {
	return function playAnimation() {
		if(!smiley.frames) return smiley.image;
		return smiley.frames[Math.floor(Game.totalFrames / smiley.animSpeed) % smiley.frames.length]
	}
}
function createNameCanvas(name) {
   const nameBuffer = document.createElement('canvas');
   nameBuffer.width = 120;
   nameBuffer.height = 5;
   const context = nameBuffer.getContext('2d');
   context.font = "14px visitor";
   context.fillStyle = "#EEEEEE";
   context.textAlign = "center";

   var gradient=context.createLinearGradient(60,-5,60,10);
   gradient.addColorStop("0","#eee");
   gradient.addColorStop("0.5","#e1e1e1");
   gradient.addColorStop("1.0","#444");
   context.fillStyle=gradient;
   context.fillText(name,60,5);
   return nameBuffer;
}