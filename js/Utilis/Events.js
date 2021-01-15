export default class Events {
    constructor() {
        this.handlers = new Map();
        this.nextIndex = -1;
    }

    static init() {
        window.Events = new Events();
    }

    on(name, callback) {
        this.nextIndex++;
        this.handlers.set(this.nextIndex, {
            name: name,
            callback: callback
        });
        return this.nextIndex;
    }

    remove(index) { 
    	if (this.handlers.has(index)) this.handlers.delete(index)
    }

    removeAll() {
        this.handlers = new Map();
        this.nextIndex = -1;
    }

    create(name, object) { 
    	return {name: name, data: object} 
    }

    createAndFire(name, object) {
        this.fire(this.create(name, object));
    }

    fire(event) {
        if (Game.debug) console.log('Fired Event: ' + event.name, event.data);
        for (const listener of [...this.handlers.values()]) {
            if (listener.name == event.name) listener.callback(event.data);
        }
    }
}