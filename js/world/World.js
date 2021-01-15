import Compositor from './Compositor.js';
import BlockCollider from './BlockCollider.js';
import {Matrix, Point} from '../math.js';
export default class World {
	constructor(worldJson) {
		this.size = new Point(worldJson.worldsize[0], worldJson.worldsize[1]);
		this.gravity = 2200;
		this.comp = new Compositor();
		this.players = [];
		this.bgblocks = new Matrix();
		this.fgblocks = new Matrix();
		this.spawn = new Point(worldJson.spawnpoint[0] * 16,worldJson.spawnpoint[1] * 16);
		this.blockCollider = new BlockCollider(this.fgblocks, this.size);
	}

	update(deltaTime){
		this.players.forEach(entity => {
			entity.update(deltaTime, this.gravity);

			entity.pos.x += entity.vel.x * deltaTime;
			this.blockCollider.checkX(entity)

      		entity.pos.y += entity.vel.y * deltaTime;
			this.blockCollider.checkY(entity)
		});
	}

	//Warning! use only if you know the exact location of the block and did all checks.
	setExactBlock(block, layer, x, y) {
		if(layer == 'foreground') {
			if(ItemManager.isSame(this.fgblocks.get(x, y), block)) {
				this.fgblocks.set(x, y, block);
				this.comp.getLayer(layer).setBlock(block, x, y);
			}
		} else if(layer == 'background') {
			if(ItemManager.isSame(this.bgblocks.get(x, y), block)) {
				this.bgblocks.set(x, y, block);
				this.comp.getLayer(layer).setBlock(block, x, y);
			}
		}
	}

	isEmpty(block, x, y, draw) {
		if(!block || block.name != 'empty' && block.name != 'air') return false;
		if(block.name == 'empty') {
			if(ItemManager.isSame(this.fgblocks.get(x, y), block)) return true;
			this.fgblocks.set(x, y, block);
			if(draw) this.comp.getLayer('foreground').setBlock(block, x, y);
		} else if(block.name == 'air') {
			if(ItemManager.isSame(this.bgblocks.get(x, y), block)) return true;
			this.bgblocks.set(x, y, block);
			if(draw) this.comp.getLayer('background').setBlock(block, x, y);
		}
		return true;
	}

	setBlock(orig, x, y, draw = true){
		if(this.checkPosition(x, y) == 'void') return;
		let block = ItemManager.getBlock(orig.name);
		if(block) {
			if(this.isEmpty(block, x, y, draw)) return;
			if(block.layer === 'foreground') {
				if(!ItemManager.isSame(this.fgblocks.get(x, y), block)) {
					this.fgblocks.set(x, y, block);
					if(draw) this.comp.getLayer('foreground').setBlock(block, x, y);
				}
			} else if(block.layer === 'background') {
				if(!ItemManager.isSame(this.bgblocks.get(x, y), block)) {
					if(block.name == 'empty') block.name = 'air';
					this.bgblocks.set(x, y, block);
					if(draw) this.comp.getLayer('background').setBlock(block, x, y);
				}
			} else console.warn("Unknown layer ", block.layer);
		} else console.warn("Unknown block name: ", orig.name);
	}

	deleteBlock(x, y, layer) {
		if(this.checkPosition(x, y) == 'void') return;
		layer = layer || this.pickBlock(x, y).layer;
		if(layer == 'foreground')
			this.setBlock({name:'empty'}, x, y);
		else this.setBlock({name:'air'}, x, y);
	}

	pickBlock(x, y) {
		let block = this.getBlock('foreground', x, y);
		if(block.name == 'empty') return this.getBlock('background', x, y);
		if(block.name == 'void') return ItemManager.getBlock('void');
		return block;
	}

	getBlock(layer, x, y) {
		if(this.checkPosition(x, y) == 'void') return {name:'void'};
		if(layer === 'foreground') {
			return this.fgblocks.get(x, y);
		} else if(layer === 'background') {
			return this.bgblocks.get(x, y);
		} else console.warn("Unknown layer ", layer); return null;
	}

	checkPosition(x, y) {
		if(x < 0 || y < 0 || x > this.size.x+1 || y > this.size.y+1) return 'void';
		if(x === 0 || y === 0 || x === this.size.x+1 || y === this.size.y+1) return 'border';
		return 'world';
	}
}