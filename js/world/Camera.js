import {Point, RoundPoint} from '../math.js';

export default class Camera {
	constructor(){
		this.pos = new Point(0,0);
		this.size = new Point(640,640);
	}

	update(entity){
		this.pos.x = RoundPoint(3, (this.pos.x - (this.pos.x - entity.pos.x + 320) * 1/10));
		this.pos.y = RoundPoint(3, (this.pos.y - (this.pos.y - entity.pos.y + 320) * 1/10));
	}
}