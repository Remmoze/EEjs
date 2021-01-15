import Trait from './Trait.js';

export default class Go extends Trait {
    constructor(player) {
        super(player, 'go');

        this.speedLimit = 1000;
        this.verdir = 0;
        this.hordir = 0;
        this.acceleration = 2000;
        this.deceleration = 800;
        this.dragFactor = 1 / 5000;
    }

    fixPosition() {
        if (Math.abs(this.player.vel.x) < 10) {
            let tempX = this.player.pos.x % this.player.size.x;
            if (tempX < 2)
                if (tempX < 0.3) this.player.pos.x = this.player.pos.x >> 0;
                else this.player.pos.x = this.player.pos.x - tempX / 5;
            else if (tempX > 14)
                if (tempX > 15.7) {
                    this.player.pos.x = this.player.pos.x >> 0;
                    this.player.pos.x++;
                }
            else this.player.pos.x = this.player.pos.x + (tempX - 14) / 5;
        }
        if (Math.abs(this.player.vel.y) < 10) {
            let tempY = this.player.pos.y % this.player.size.y;
            if (tempY < 2)
                if (tempY < 0.3) this.player.pos.y = this.player.pos.y >> 0;
                else this.player.pos.y = this.player.pos.y - tempY / 5;
            else if (tempY > 14)
                if (tempY > 15.7) {
                    this.player.pos.y = this.player.pos.y >> 0;
                    this.player.pos.y++;
                }
            else this.player.pos.y = this.player.pos.y + (tempY - 14) / 5;
        }
    }

    // overlaps() {
    //     return this.player.world.blockCollider.blocks.searchByRange(this.player.sides.left,this.player.sides.right,this.player.sides.top,this.player.sides.bottom).length != 0;
    // }

    update(deltaTime, gravity) {
        let absX = Math.abs(this.player.vel.x);
        let absY = Math.abs(this.player.vel.y);
        let signX = Math.sign(this.player.vel.x);
        let signY = Math.sign(this.player.vel.y);

        this.hordir = Keyboard.right - Keyboard.left;
        this.verdir = Keyboard.down - Keyboard.up;

        if (this.player.heading.y) { //если двигается вертекально. (гравитация ввниз или вврех)

            if (this.hordir)
                this.player.vel.x += this.acceleration * deltaTime * this.hordir; //move
            else if (this.player.vel.x)
                this.player.vel.x -= signX * Math.min(absX, this.deceleration * deltaTime); //slowdown

            this.player.vel.y += this.player.heading.y * gravity * deltaTime; //gravity

            this.player.vel.x -= this.dragFactor * this.player.vel.x * Math.abs(this.player.vel.x);
            this.player.vel.y -= this.dragFactor / 10 * this.player.vel.y * Math.abs(this.player.vel.y);


        } else if (this.player.heading.x) { //если двигается горизонтально. (гравитация вправо или влево)

            if (this.verdir)
                this.player.vel.y += this.acceleration * deltaTime * this.verdir; //move
            else if (this.player.vel.y)
                this.player.vel.y -= signY * Math.min(absY, this.deceleration * deltaTime); //slowdown

            this.player.vel.x += this.player.heading.x * gravity * deltaTime;
            this.player.vel.y -= this.dragFactor * this.player.vel.y * Math.abs(this.player.vel.y); //speedlimit
            this.player.vel.x -= this.dragFactor / 10 * this.player.vel.x * Math.abs(this.player.vel.x); //speedlimit


        } else { // no gravity. aka godmode or dot.
            if (this.hordir)
                this.player.vel.x += this.acceleration * deltaTime * this.hordir; //move
            else if (this.player.vel.x)
                this.player.vel.x -= signX * Math.min(absX, this.deceleration * deltaTime); //slowdown

            if (this.verdir)
                this.player.vel.y += this.acceleration * deltaTime * this.verdir; //move
            else if (this.player.vel.y)
                this.player.vel.y -= signY * Math.min(absY, this.deceleration * deltaTime); //slowdown

            this.player.vel.x -= this.dragFactor * this.player.vel.x * Math.abs(this.player.vel.x);
            this.player.vel.y -= this.dragFactor * this.player.vel.y * Math.abs(this.player.vel.y);
            //no gravity
        }

        this.fixPosition();
        
        if(Math.abs(this.player.vel.x) > 1000) this.player.vel.x = Math.sign(this.player.vel.x) * 1000;
        if(Math.abs(this.player.vel.y) > 1000) this.player.vel.y = Math.sign(this.player.vel.y) * 1000;

    }
}