import Keyboard from './Utilis/Keyboard.js';
import Mouse from './Utilis/Mouse.js';
import Events from './Utilis/Events.js';
import PlayState from './states/PlayState.js';
import {loadWorld} from './loaders.js';
import OverlayContainer from './ui/OverlayContainer.js';

export default class EE {
	constructor(canvas) {
		initGame(canvas);
		this.overlay = new OverlayContainer();
		window.EEjs = this;
		this.setupPlayState();
	}

	setupPlayState(worldID = 'default') {
		//this.state = loading stage
		console.log("Loading world id", worldID);
		loadWorld(worldID).then(world => {
			this.state = new PlayState(world);
		});
	}

	update(deltaTime) {
		//update
		if(this.state) this.state.update(deltaTime, window.Game.context);
		if(Game.render) {
			this.overlay.draw(window.Game.context);
        	window.Keyboard.update();
        	if(this.state) window.Mouse.update(this.state.camera);
		}
		
	}
} 

function initGame(canvas) {
	window.Game = {
	    canvas: canvas,
	    context: canvas.getContext('2d'),
	    width: 640,
	    height: 640,
	    blockX: 0,
	    blockY: 0,
	    fps: 0,
	    selectedBlock: {name: "empty"},
	    selectedLayer: "foreground",
	    totalFrames: 0,
	    version: "alpha 0.1",
	    render: true
	}
    Events.init();
    Keyboard.init();
    Mouse.init();
}