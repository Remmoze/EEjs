import {Point} from '../math.js';

export default class BlockResolver {
	constructor(matrix, worldsize){
		this.blockSize = 16;
		this.matrix = matrix;
		this.worldsize = worldsize.subtract(1,1);
	}

	toIndex(pos){
		return Math.floor(pos / this.blockSize)
	}

	toIndexRange(pos1, pos2){
		const pMax = Math.ceil(pos2 / this.blockSize) * this.blockSize;
		const range = [];
		let pos = pos1;
		do {
			range.push(this.toIndex(pos));
			pos += this.blockSize;
		} while(pos < pMax)
		return range;
	}

	getByIndex(inX, inY){
		let block = this.matrix.get(inX, inY);
		if(!block){
			if(inX < 0 || inX > this.worldsize.x || inY < 0 || inY > this.worldsize.y)
				block = {name: "void", border: true};
		}

		if(block) {
			const top = inY * this.blockSize;
			const bottom = top + this.blockSize;
			const left = inX * this.blockSize;
			const right = left + this.blockSize;
			return {
				block, top, bottom, left, right,
			};
		}
	}

	searchByPosition(posX, posY) {
		return this.getByIndex(this.toIndex(posX),this.toIndex(posY));
	}

	searchByRange(x1, x2, y1, y2){
		const matches = [];
		this.toIndexRange(x1, x2).forEach(inX =>{
			this.toIndexRange(y1, y2).forEach(inY =>{
				const match = this.getByIndex(inX, inY);
				if(match && ItemManager.isSolid(match.block.name)){
					matches.push(match);
				}
			});
		});
		return matches;
	}
}