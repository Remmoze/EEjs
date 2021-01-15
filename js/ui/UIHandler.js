import {Point} from '../math.js';

export default class UIHandler  {
	constructor(state) {
		this.state = state;
		this.nextTime = 0.3;
		this.placeLoc = new Point(-1, -1);
		this.delLoc = new Point(-1, -1);
		this.mouseLeft = false;
	}

	updateLeft() {
		if(Mouse.left) {
			if(this.nextTime <= 0 || !this.placeLoc.compare(Game.blockX, Game.blockY))
				this.setBlock();
		}

		if(!Mouse.left) this.placeLoc = new Point(-1, -1);
	}

	updateMiddle() {
		if(Mouse.JPmiddle) this.selectBlock();
	}

	updateRight() {
		if(Mouse.JPright) Game.selectedLayer = this.state.world.pickBlock(Game.blockX, Game.blockY).layer;
		if(Mouse.right) {
			if(this.nextTime <= 0 || !this.delLoc.compare(Game.blockX, Game.blockY))
				this.deleteBlock();
		}
		if(!Mouse.right) this.delLoc = new Point(-1, -1);
	}
	
	update(deltatime) {
		this.nextTime-=deltatime;
     	if(!Mouse.over) {this.mouseLeft = true; return;}
		if(this.noUI(0)) this.updateLeft();
		if(this.noUI(1)) this.updateMiddle();
		if(this.noUI(2)) this.updateRight();
		this.mouseLeft = false;
	}

	noUI(code) {
		return !Mouse.UIaffected.get(code);
	}

	selectBlock() {
		Events.createAndFire('blockSelected', this.state.world.pickBlock(Game.blockX, Game.blockY));
	}

	setBlock() {
		 if(!this.placeLoc.compare(-1, -1) && !this.mouseLeft)
		 	line(this.placeLoc.x,this.placeLoc.y,Game.blockX,Game.blockY, (x,y) => {
		 		if(!ItemManager.isSame(this.state.world.getBlock(Game.selectedLayer, x, y), Game.selectedBlock))
		 			Events.createAndFire('setBlock', {block:Game.selectedBlock, x:x, y:y});	
		 	});
		 else 
			Events.createAndFire('setBlock', {block: Game.selectedBlock, x: Game.blockX, y: Game.blockY});
		this.placeLoc.set(Game.blockX, Game.blockY);
		this.nextTime = 0.3;
	}

	deleteBlock() {
		 if(!this.delLoc.compare(-1, -1) && !this.mouseLeft)
		 	line(this.delLoc.x,this.delLoc.y,Game.blockX,Game.blockY, (x,y) => {
		 		if(!ItemManager.isEmpty(this.state.world.getBlock(Game.selectedLayer, x, y)))
		 		Events.createAndFire('deleteBlock', {layer:Game.selectedLayer, x:x, y:y});
		 	});
		 else 
			Events.createAndFire('deleteBlock', {layer: Game.selectedLayer, x: Game.blockX, y: Game.blockY});
		this.delLoc.set(Game.blockX, Game.blockY);
		this.nextTime = 0.3;
	}
}

function line(x0, y0, x1, y1, func){
	const dx = Math.abs(x1-x0);
	const dy = Math.abs(y1-y0);
	const sx = (x0 < x1) ? 1 : -1;
	const sy = (y0 < y1) ? 1 : -1;
	let err = dx-dy;

	while(true){
		func(x0, y0);

		if ((x0==x1) && (y0==y1)) break;
		let e2 = 2*err;
		if (e2 >-dy){ err -= dy; x0  += sx; }
		if (e2 < dx){ err += dx; y0  += sy; }
	}
}