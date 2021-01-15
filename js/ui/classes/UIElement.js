import {Point, Rectangle, overlaps} from '../../math.js';

export default class UIElement {
	constructor(parent, name, x, y, width, height) {
		this.name = name || "";
		this.parent = parent;
		this.pos = new Point(x, y);
		this.canvas = document.createElement('canvas');
		this.canvas.width = width;
		this.canvas.height = height;
		this.context = this.canvas.getContext('2d');
		this.shown = true;
		this.clickable = true;
		this.mouseActive = false;
	}

	destroy() {
		this.parent.remove(this);
	}

	hide() {
		this.shown = false;
		this.requestRedraw()
	}

	requestRedraw(disableClear) {
		if(this.parent) this.parent.redraw(disableClear);
	}

	show() {
		this.shown = true;
		this.requestRedraw()
	}

	getGlobalLocation() {
		let parents = [];
		if(this.parent) {
			parents.push(this.parent);
			while(true) {
				if (parents[parents.length] && parents[parents.length].parent) 
					parents.push(parents[parents.length].parent)
				else break;
			}
			let pos = new Point(this.pos.x, this.pos.y);
			parents.forEach(MrPapa => {
				pos.x += MrPapa.pos.x;
				pos.y += MrPapa.pos.y;
			});
			return pos;
		}
		else return this.pos;
	}

	onClick(event) {
		this.mouseActive = true;
		if(Game.debug) console.log("UIclicked: " + this.name + " ("+ event.type + ":" + event.button+")");
	}

	onUnclick(event) {
		this.mouseActive = false;
	}

	handleMouseEvent(event) {

		if(event.type == 'mouseup') {
			if(this.mouseActive) 
				this.onUnclick(event)
			return false;
		}

		const pos = this.getGlobalLocation();
		if(event.type == 'mousedown' && overlaps(new Rectangle(pos.x, pos.y, this.canvas.width, this.canvas.height), new Point(Game.mouseX, Game.mouseY))) {
			this.onClick(event, Game.mouseX - pos.x, Game.mouseY - pos.y);
			return true;
		}
		return false;
	}

	clear() {
		this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
	}

	draw(context) {
		if(this.shown)
			context.drawImage(this.canvas, this.pos.x, this.pos.y);
	}
}