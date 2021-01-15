export default class Trait {
	constructor(player, name){
		this.NAME = name;
		this.player = player;
	}

	update(){
		console.warn("unhandled update call in Trait");
	}
}