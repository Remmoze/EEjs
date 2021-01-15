import {ConsoleError} from './Utilis/Helpers.js';

export default class ItemManager {
	constructor() {
		window.ItemManager = this;
		this.assets = new Map(); //name - canvas
		this.auras = new Map();
		this.blocks = new Map();
		this.smileys = new Map();
		this.packs = new Map();
	}

	//blocks
	formatBlock(name) {return {name: name}}
	getBlock(name) {return this.blocks.get(name)}
	addBlock(block) {this.blocks.set(block.name, block)}
	hasBlock(name) {return this.blocks.has(name)}
	isSolid(name) {return this.blocks.get(name).solid}
	addBlockPack(pack) {this.packs.set(pack.name, pack)}
	getBlockPack(name) {return this.packs.get(name)}
	isSame(block, block2) {if(!block || !block2) return false; return block.name == block2.name} //block.prop == block2.prop
	isEmpty(block) {if(!block) return false; return block.name == 'empty' || block.name == 'air'}

	//smileys
	getSmiley(name) {return this.smileys.get(name)}
	addSmiley(smiley) {this.smileys.set(smiley.name, smiley)}
	hasSmiley(name) {return this.smileys.has(name);}

	addItem(assetItem) {
		if(!assetItem || !assetItem.image || !assetItem.name || !assetItem.type) ConsoleError('ItemManager: failed to add asset item. ' + assetItem);
		if(this.getItem(assetItem.name)) console.warn('ItemManager: item already exists! overriding. ' + assetItem);

		switch(assetItem.type) {
			case 'auras': this.auras.set(assetItem.name, assetItem.image); break;
			default: this.assets.set(assetItem.name, assetItem.image); break;
		}
	}

	hasItem(name) {
		return this.assets.has(name) || this.auras.get(name);
	}

	getItem(name) {
		return this.assets.get(name) || this.auras.get(name);
	}

	getBlockDirection(name) {
		let item = name.split(':');
		switch(item[0]) {
			case 'arrows': return item[1];
			default: return 'down';
		}
	}
}

