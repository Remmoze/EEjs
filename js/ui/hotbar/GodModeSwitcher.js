import HotbarItem from '../classes/HotbarItem.js';

export default class GodModeSwitcher extends HotbarItem {
	constructor(hotbar, x){
		super(hotbar, 'godmodeswitcher', x);
		this.setIcon(ItemManager.getItem('aura'));
	}

	onClick(event){
		Game.me.godMode = !Game.me.godMode;
		super.onClick(event);
	}
}