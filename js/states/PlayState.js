//import Player from '../world/Player.js';
import Me from '../world/Me.js';
import Hotbar from '../ui/hotbar/Hotbar.js';
import Camera from '../world/Camera.js';
import UIHandler from '../ui/UIHandler.js';
import DebugStats from '../ui/DebugStats.js';
import blockselector from '../ui/windows/blockselector.js';

export default class PlayState {
	constructor(world) {
		this.world = world;

		initEvents(this);

		this.hotbar = new Hotbar(Game.overlay);
		this.debugStats = new DebugStats(Game.overlay);

    	Game.overlay.add(new blockselector(Game.overlay));
    	Game.overlay.add(this.debugStats);
    	Game.overlay.add(this.hotbar);

    	
		this.me = new Me(this.world, 'gosha');
		this.addPlayer(this.me);

		this.camera = new Camera();
		this.UIHandler = new UIHandler(this);
	}

	addPlayer(player) {
		this.world.players.push(player);
	}

	update(deltatime, context){
		this.world.update(deltatime);
		 if(Game.render) {
		 	this.camera.update(this.me);
		 	this.world.comp.draw(context, this.camera);
			if(Game.debug) {
				if(!this.debugStats.shown)
					this.debugStats.show(); 
				this.debugStats.redraw();
			} else if(this.debugStats.shown) {
				this.debugStats.hide();
			}
		} 
        this.UIHandler.update(deltatime);
	}
}

function initEvents(state) {
	Events.on('setBlock', data => state.world.setBlock(data.block, data.x, data.y));
	Events.on('deleteBlock', data => state.world.deleteBlock(data.x, data.y, data.layer));
}