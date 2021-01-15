import UIElement from './classes/UIElement.js';

export default class DebugStats extends UIElement {
	constructor(overlay, x=3, y=3){
		super(overlay, "debugStats", x, y, 200, 100);
		this.fps = 0;
		this.lines = [];
		this.clickable = false;
		Events.on('fps', fps => this.setFps(fps));
	}

	setFps(newFps) {
		if(this.fps == newFps) return;
		this.fps = Game.fps = newFps;
		this.redraw();
	}

	redrawLines() {
		this.lines = [];
		this.lines.push('EEjs (v '+ Game.version +')');
		this.lines.push('Fps: ' + this.fps);
		this.lines.push('X: ' + Math.round(Game.me.pos.x >> 4));
		this.lines.push('Y: ' + Math.round(Game.me.pos.y >> 4));
		this.lines.push('nextJump: ' + Math.round(Game.me.jump.nextjump * 10) / 10);
	}

	redraw(context){
		this.clear();
		this.redrawLines();
		this.context.font = "14px visitor";
		this.context.fillStyle = "#b00be5";
		for (let i=0;i < this.lines.length;i++) {
			this.context.fillText(this.lines[i], 1, (i+1) * 9);
		}
      	this.requestRedraw();
	}
}