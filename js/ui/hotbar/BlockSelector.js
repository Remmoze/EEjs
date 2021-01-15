import HotbarItem from '../classes/HotbarItem.js';
import BlocksContainer from '../classes/BlocksContainer.js';

export default class BlockSelector extends HotbarItem {
	constructor(hotbar, x){
		super(hotbar, 'blockSelector', x, 195);
		this.blocksContainer = new BlocksContainer(this, 2, 11, {
			name: 'custom',
			blocks: [
				{name:"empty"},
				{name:"basic:grey"},
				{name:"basic:red"},
				{name:"basic:green"},
				{name:"bricks:brown"},
				{name:"bricks:yellow"},
				{name:"bricks:red"},
				{name:"special:facehappy"},
				{name:"arrows:up"},
				{name:"special:crown"}
			]
		});
		this.selectedIndex = 0;
		this.moreShown = false;
		this.initBase();
		initEvents(this);
		this.add(this.blocksContainer);
		this.selectBlock(1);
		this.redraw();
	}

	initBase() {
		this.baseContext.drawImage(ItemManager.getItem('blockSelector'), 0, 0);
	}

	setBlock(block) {
		if(this.selectedIndex == 0) {
			if(block.name == "air" || block.name == "empty") return;
			this.selectedIndex = 1;
		}
		else if(block.name == "air" || block.name == "empty") {
			this.selectedIndex = 0;
			block = {name:"empty"}
		}
		if(Game.selectedBlock == block && this.blocksContainer.blocks[this.selectedIndex] == block) return;
		Game.selectedBlock = this.blocksContainer.blocks[this.selectedIndex] = block;
		this.redraw();
	}

	selectBlock(index) {
		Game.selectedBlock = this.blocksContainer.blocks[index];
		this.selectedIndex = index;
		this.redraw();
	}

	redrawInsides() {
		this.context.drawImage(this.base, 0, 0);
		this.blocksContainer.redraw();
		this.context.drawImage(this.base, 0, 0);
		this.elements.forEach(element => element.draw(this.context));
		this.context.drawImage(ItemManager.getItem('selector'), 16*this.selectedIndex + 3, 12);
		this.requestRedraw();
	}

	switchMore() {
		this.moreShown = !this.moreShown;
		if(this.moreShown) Game.overlay.blockselector.show();
		else Game.overlay.blockselector.hide();
	}
	
	onClick(event, x, y){
		if(y > 11 && y < 27 && x > 2 && x < 162) this.selectBlock(Math.floor((x-2)/16));
		if(y > 7 && y < 27 && x > 164 && x < 195) this.switchMore();
		super.onClick(event);
	}
}

function initEvents(blockselector) {
	Events.on('blockSelected', block => {
		blockselector.setBlock(block);
	});
	Events.on('keyPressed', key => {
		if(key.indexOf('Digit') !== -1) {
			blockselector.selectBlock(parseInt(key.slice(5)));
		}
	})
}