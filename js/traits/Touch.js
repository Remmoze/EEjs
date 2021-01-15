import Trait from './Trait.js';

export default class Touch extends Trait {
    constructor(player, world) {
        super(player, 'touch');
        this.world = world;
    }

    getVerticalFacing(face) {
        switch (face) {
            case 'up':
                return -1;
            case 'down':
                return 1;
            default:
                return 0;
        }
    }

    getHorizontalFacing(face) {
        switch (face) {
            case 'left':
                return -1;
            case 'right':
                return 1;
            default:
                return 0;
        }
    }

    update(deltaTime, gravity) {
        let cx = this.player.sides.center.x >> 4;
        let cy = this.player.sides.center.y >> 4;
        let current = this.world.getBlock('foreground', cx, cy);

        this.player.facing = ItemManager.getBlockDirection(current.name);
        if (this.player.godMode) this.player.facing = 'middle';
        this.player.heading.y = this.getVerticalFacing(this.player.facing);
        this.player.heading.x = this.getHorizontalFacing(this.player.facing);

        switch(current.name) {
            case 'special:crown': if(!this.player.attr.get('hasCrown') && !this.player.godMode) this.player.attr.set('hasCrown', true); break;
        }
    }
}