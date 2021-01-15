import Trait from './Trait.js';

export default class Sides extends Trait {
    constructor(player) {
        super(player, 'sides');
    }

    get left() {
        return this.player.pos.x;
    }

    set left(x) {
    	this.player.pos.x = x;
    }

    get right() {
        return this.player.pos.x + this.player.size.x;
    }

    set right(x) {
    	this.player.pos.x = x - this.player.size.x;
    }

    get top() {
        return this.player.pos.y;
    }

    set top(y) {
    	this.player.pos.y = y;
    }

    get bottom() {
    	return this.player.pos.y + this.player.size.y;
    }

    set bottom(y) {
    	this.player.pos.y = y - this.player.size.y;
    }

    get center() {
    	return {x: this.player.pos.x + this.player.size.x/2, 
    			y: this.player.pos.y + this.player.size.y/2}
    }

    set center({x, y}) {
    	this.player.pos.x = x - this.player.size.x/2;
    	this.player.pos.y = y - this.player.size.y/2;
    }

    update(deltaTime) {
        //nothing, really.
    }
}