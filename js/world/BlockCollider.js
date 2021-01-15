import BlockResolver from './BlockResolver.js';

export default class blockCollider {
	constructor(blockmatrix, worldsize){
		this.blocks = new BlockResolver(blockmatrix,worldsize);
	}

	checkY(entity){
		if(entity.heading.y) entity.attr.set('onGround', false);
		let y;
		if(entity.vel.y > 0){
			y = entity.sides.bottom;
		} else if(entity.vel.y < 0){
			y = entity.sides.top;
		} else return;

		const matches = this.blocks.searchByRange(entity.sides.left, entity.sides.right, y, y);

		matches.forEach(match => {
			if(entity.godMode && !match.block.border) return;
			if(entity.vel.y > 0){
				if(entity.sides.bottom > match.top){
					entity.sides.top = match.top - entity.size.y;
					entity.vel.y = 0;
					if(entity.facing == 'down') entity.attr.set('onGround', true);
				}
			} else if(entity.vel.y < 0){
				if (entity.sides.top < match.bottom){
					entity.sides.top = match.bottom;
					entity.vel.y = 0;
					if(entity.facing == 'up') entity.attr.set('onGround', true);
				}
			} else {
				if(entity.sides.bottom > match.top && entity.sides.top < match.bottom)
				entity.sides.top = match.top + (match.bottom - match.top) /2;
				entity.vel.y = 0;
			}
		});
	} 

	checkX(entity){
		if(entity.heading.x) entity.attr.set('onGround', false);
		let x;
		if(entity.vel.x > 0){
			x = entity.sides.right;
		} else if(entity.vel.x < 0){
			x = entity.sides.left;
		} else return;

		const matches = this.blocks.searchByRange(x, x, entity.sides.top, entity.sides.bottom);

		matches.forEach(match => {
			if(entity.godMode && !match.block.border) return;
			if(entity.vel.x > 0){
				if(entity.sides.right > match.left){
					entity.sides.left = match.left - entity.size.x;
					entity.vel.x = 0;
					if(entity.facing == 'right') entity.attr.set('onGround', true);
				}
			} else if(entity.vel.x < 0){
				if (entity.sides.left < match.right){
					entity.sides.left = match.right;
					entity.vel.x = 0;
					if(entity.facing == 'left') entity.attr.set('onGround', true);
				}
			} else {
				if(entity.sides.right > match.left && entity.sides.left < match.right)
				entity.sides.left = match.left + (match.right - match.left) /2;
				entity.vel.x = 0;
			}
		});
	}

	test(entity){
		this.checkY(entity);
		this.checkX(entity);
	}
}