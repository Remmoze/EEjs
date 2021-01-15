import UIElement from './UIElement.js';
import {Point, Rectangle, overlaps} from '../../math.js';

export default class UIContainer extends UIElement {
	constructor(parent, name, x = 0, y = 0, width = 640, height = 640) {
		super(parent || undefined, name, x, y, width, height);
		this.base = document.createElement('canvas');
		this.base.width = width;
		this.base.height = height;
		this.baseContext = this.base.getContext('2d');
		this.name = name || "";
		this.elements = [];
	}

	add(element) {
		this.elements.push(element);
		this[element.name] = element;
		this.redraw();
	}

	remove(element) {
		if(this.elements.indexOf(element) == -1) return;
		this.elements.slice(this.elements.indexOf(element), 1);
		this.redraw();
	}

	getByName(name) {
		for (let i = 0; i < this.elements.length; i++)
			if(this.elements[i].name == name) return this.elements[i];
		return undefined;
	}

	removeByName(name) {
		let element = this[name];
		if(element) this.remove(element);
	}

	redrawElement(element) {
		this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
		this.elements.forEach(element => element.draw(this.context));
	}

	redraw(disableClear) {
		if(!disableClear) this.clear();
		this.context.drawImage(this.base, 0, 0);
		this.elements.forEach(element => element.draw(this.context));
		this.requestRedraw();
	}

	getVisibleElements() {
		let elements = [];
		this.elements.forEach(element => {
			if(!element.shown) return;
			// if(element instanceof UIContainer) {
			// 	elements.push(element);
			// 	element.getVisibleElements().forEach(elem => elements.push(elem));
			// }
			else elements.push(element)
		})
		return elements;
	}

	getClickableElements() {
		let elements = [];
		this.elements.forEach(element => {
			if(element.clickable && element.shown) elements.push(element);
		})
		return elements;
	}

	handleMouseEvent(event) {
		if(event.type == 'mouseup') {
			for(const element of this.elements) 
				if(!element.handleMouseEvent(event)) return false;
			if(this.mouseActive) 
				this.onUnclick(event)
			return false;
		}
		const pos = this.getGlobalLocation();
		if(event.type == 'mousedown' && overlaps(new Rectangle(pos.x, pos.y, this.canvas.width, this.canvas.height), new Point(Game.mouseX, Game.mouseY))) {
			for(const element of this.elements) 
				if(element.handleMouseEvent(event)) return true;
			this.onClick(event, Game.mouseX - pos.x, Game.mouseY - pos.y);
			return true;
		}
		return false;
	}
}