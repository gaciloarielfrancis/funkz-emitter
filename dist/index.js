export default class EventEmitter {
    constructor() {
        this._registry = [];
    }
    emit(event, data, identifier) {
        for (let i = this._registry.length - 1; i > -1; i--) {
            if (this._registry[i].event === event) {
                this._registry[i].callback(data);
                if (!this._registry[i].repeated)
                    this._registry.splice(i, 1);
            }
        }
    }
    on(event, callback, identifier) {
        this.register(event, callback);
    }
    once(event, callback, identifier) {
        this.register(event, callback, false);
    }
    off(event, identifier) {
        for (let i = this._registry.length - 1; i > -1; i--) {
            if (this._registry[i].event === event)
                this._registry.splice(i, 1);
        }
    }
    register(event, callback, repeated = true) {
        const register = { event, repeated, callback };
        this._registry.push(register);
    }
}
const emitter = new EventEmitter();
window.FunkzEmitter = emitter;
export function emit(event, data, identifier) {
    emitter.emit(event, data, identifier);
}
export function on(event, callback, identifier) {
    emitter.on(event, callback, identifier);
}
export function once(event, callback, identifier) {
    emitter.once(event, callback, identifier);
}
export function off(event, identifier) {
    emitter.off(event, identifier);
}
