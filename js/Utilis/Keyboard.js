export default class Input {
	constructor() {
		this.keyMap = new Map();
		this.addKeys('KeyA', 'KeyS', 'KeyD', 'KeyW', 'ArrowRight', 'ArrowUp', 'ArrowLeft', 'ArrowDown', 'Space');
		this.update();
		['keydown', 'keyup'].forEach(eventName => {
		   	window.addEventListener(eventName, event => {
		   		this.handleEvent(event);
			});
	   });
	}

	static init() {
		window.Keyboard = new Input();
	}

	update() {
		this.justPressedMap = [];
	}

	handleEvent(event) {
		const {code} = event;
      	const keyState = event.type == 'keydown';
      	if(keyState && keyState != this.keyMap.get(code)) {
      		this.justPressedMap.push(code);
      		Events.createAndFire('keyPressed', code);
      	}
      	if(!this.keyMap.has(code)) return;
      	event.preventDefault();
      	if(this.keyMap.get(code) == keyState) return;
      	this.keyMap.set(code, keyState);
	}

	getKeys(...keys) {
		for(let x of keys) if(this.keyMap.get(x)) return true;
		return false;
	}

	addKeys(...codes) {
		for(let code of codes) this.addKey(code)
	}

	addKey(code) {
		this.keyMap.set(code, false);
	}

	pressed(code) {
		return this.keyMap.get(code) || false;
	}

	justPressed(code) {
		return this.justPressedMap.indexOf(code) !== -1;
	}

	get space() {return this.getKeys('Space')}
	get right() {return this.getKeys('KeyD', 'ArrowRight')}
	get left() {return this.getKeys('KeyA', 'ArrowLeft')}
	get up() {return this.getKeys('KeyW', 'ArrowUp')}
	get down() {return this.getKeys('KeyS', 'ArrowDown')}
}