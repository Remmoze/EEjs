import HotbarItem from '../classes/HotbarItem.js';

export default class SmileyChanger extends HotbarItem {
	constructor(hotbar, x){
		super(hotbar, 'smileychanger', x);
		this.icon.width = 26;
		this.icon.height = 26;
		this.smileyChanged('smile');
		Events.on('smileyChanged', name => this.smileyChanged(name));
	}

	smileyChanged(name) {
		this.setIcon(ItemManager.getSmiley(name).image);
	}

	onClick(event){
		if(event.button===0)
			Events.createAndFire('changeSmiley', this.nextSmiley(Game.me.smiley, 1));
		else if(event.button==2)
			Events.createAndFire('changeSmiley', this.nextSmiley(Game.me.smiley, -1));
		super.onClick(event);
	}

	nextSmiley(name, increment) {
		let allSmileys = [...ItemManager.smileys.keys()];

		for (let i = 0; i < allSmileys.length; i++) {
			if(allSmileys[i] == name) {
			 	if(i+increment == allSmileys.length) i = -1;
			 	else if(i+increment == -1) i = allSmileys.length;
				return allSmileys[i+increment];
			}
		}
		return undefined;
	}
}