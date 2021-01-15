export default class Timer {
    constructor() {		
        this.lastUpdate = 0;
        this.framesPassed = 0;
        this.lastFps = 0;

        Game.totalFrames = 0;
        let deltaTime = 1 / 60;
        let accTime = 0;
        let lastTime = 0;
        this.updateProxy = time => {
            this.updateFps(time);

            accTime += (time - lastTime) / 1000;

            while (accTime > deltaTime) {
                if (accTime > 1) {
                    accTime = deltaTime;
                    Game.render = false;
                }
                else Game.render = true;
                
                 this.update(deltaTime);
                accTime -= deltaTime;
            }

            lastTime = time;
            Game.totalFrames++;
            requestAnimationFrame(this.updateProxy);
        }
    }

    updateFps(time) {
        this.framesPassed++;
        if (time >= this.lastUpdate + 1000) {
            this.lastUpdate = time;
            if(this.lastFps != this.framesPassed) {
                Events.createAndFire('fps', this.framesPassed);
                this.lastFps = this.framesPassed;
            }
            this.framesPassed = 0;
        }
    }
    play() {
        requestAnimationFrame(this.updateProxy);
    }
}