
export class Matrix {
	constructor() {
		this.grid = [];
	}

	forEach(callback) {
		this.grid.forEach((col, x) => 
			col.forEach((value, y) => 
				callback(value, x, y)));
	}

	fillAll(block){
		this.grid.forEach((col, x) => 
	      col.forEach((value, y) => 
	      	this.grid[x][y] = block));
	}

	get(x, y){
		const col = this.grid[x];
		if(col) return col[y];
		return undefined;
	}

	set(x, y, value) {
		if(!this.grid[x]) this.grid[x] = [];
		this.grid[x][y] = value;
	}
}

function overlapsBoxPoint(target, pointer) {
	return pointer.x >= target.x && pointer.x <= target.x + target.width &&
		   pointer.y >= target.y && pointer.y <= target.y + target.height;
}

function overlapsBoxes(target, pointer) {
	return overlapsBoxPoint(target, new Point(pointer.x, 				 pointer.y)) || 
		   overlapsBoxPoint(target, new Point(pointer.x + pointer.width, pointer.y)) || 
		   overlapsBoxPoint(target, new Point(pointer.x, 				 pointer.y+ pointer.height)) || 
		   overlapsBoxPoint(target, new Point(pointer.x + pointer.width, pointer.y+ pointer.height));
}

export function overlaps(target, pointer) {
	if(target instanceof Point) {
		if(pointer instanceof Point) return target.x == pointer.x && target.y == pointer.y;
		if(pointer instanceof Rectangle) return overlapsBoxPoint(pointer,target);
	}
	if(target instanceof Rectangle) {
		if(pointer instanceof Rectangle) return overlapsBoxes(pointer,target);
		if(pointer instanceof Point) return overlapsBoxPoint(target,pointer);
	}
	return undefined;
}

export class Point {
   constructor(x, y){
      this.set(x, y);
   }
   
   set(x, y){
      this.x = x;
      this.y = y;
   }

   reset() {
   	  this.x = 0;
   	  this.y = 0;
   }

   compare(x, y) {
   	return this.x === x &&
   		   this.y === y
   }
   
   subtract(x,y){
   	this.x -= x;
   	this.y -= y;
   	return this;
   }

   add(x,y){
   	this.x += x;
   	this.y += y;
   	return this;
   }

}

export class Rectangle {
	constructor(x, y, width, height) {
		this.set(x, y, width, height);
	}

   set(x, y, width, height){
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;
   }

   reset() {
   	  this.x = 0;
   	  this.y = 0;
   	  this.width = 0;
      this.height = 0;
   }
}

export function RoundPoint(pointOffset, value) {
	let offset = Math.pow(10, pointOffset);
	return Math.round(value * offset) / offset;
}

export function randomPercent(x) {
	return Math.round(Math.random() * 100) < x;
}

export function randomFloat(min,max) {
	return Math.random() * (max - min) + min;
}

export function randomInt(min, max) {
	return Math.floor(randomFloat(min,max));
}

