/*
	LEFT - 0
	MIDDLE - 1
	RIGHT - 2
*/

export default class Mouse { //mouse is a global variable
	constructor() {
        this.mouseX = 0;
        this.mouseY = 0;
		this.keyMap = new Map();
        this.UIaffected = new Map();
		this.justPressedMap = [];
		[0,1,2].forEach(button => this.keyMap.set(button, false)); //initKeys
        this.canvasRect = Game.canvas.getBoundingClientRect();
		['mouseup', 'mousedown', 'mousemove'].forEach(name => {
		   	window.addEventListener(name, event => {
		   		this.handleEvent(event);
			});
	    });
	    ['resize','scroll'].forEach(name => {
		   	window.addEventListener(name, event => {
		   		this.canvasRect = Game.canvas.getBoundingClientRect();
			});
	    });
	}

	static init() {
		window.Mouse = new Mouse();
	}

	setMousePosition(camera) {
        Game.blockX = Math.floor((this.mouseX + camera.pos.x) >> 4);
        Game.blockY = Math.floor((this.mouseY + camera.pos.y) >> 4);
    }

	update(camera) {
		if(camera) this.setMousePosition(camera);
		this.justPressedMap = [];
	}

	handleEvent(event) {
		event.preventDefault();
		this.mouseX = Game.mouseX = event.clientX - this.canvasRect.left;
        this.mouseY = Game.mouseY = event.clientY - this.canvasRect.top;
        const {button, type} = event;
        if(type == 'mousemove') return;
        const keyState = type == 'mousedown';
        if(keyState) this.justPressedMap.push(button);
        if(this.keyMap.get(button) != keyState) this.keyMap.set(button, keyState);
        this.UIaffected.set(button, Game.overlay.handleMouseEvent(event));
	}

	justPressed(code) {
		return this.justPressedMap.indexOf(code) !== -1;
	}

	get JPleft() {return this.justPressed(0)}
	get JPmiddle() {return this.justPressed(1)}
	get JPright() {return this.justPressed(2)}
	get left() {return this.keyMap.get(0)}
	get middle() {return this.keyMap.get(1)}
	get right() {return this.keyMap.get(2)}
	get over() {return Game.mouseX >= 0 && 
					   Game.mouseY >= 0 && 
					   Game.mouseX < this.canvasRect.width && 
					   Game.mouseY < this.canvasRect.height}
}