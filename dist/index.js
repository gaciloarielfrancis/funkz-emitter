export default class EventEmitter {
    constructor() {
        this._registry = [];
    }
    emit(event, data, identifier) {
        for (let i = this._registry.length - 1; i > -1; i--) {
            if (this._registry[i].event === event) {
                const index = identifier ? (this._registry[i].identifier === identifier ? i : -1) : i;
                if (index > -1)
                    this.trigger(index, data);
            }
        }
    }
    on(event, callback, identifier) {
        this.register(event, callback, identifier);
    }
    once(event, callback, identifier) {
        this.register(event, callback, identifier, false);
    }
    off(event, identifier) {
        for (let i = this._registry.length - 1; i > -1; i--) {
            if (this._registry[i].event === event && this._registry[i].identifier === identifier)
                this._registry.splice(i, 1);
        }
    }
    register(event, callback, identifier, repeated = true) {
        const register = { event, repeated, callback, identifier };
        this._registry.push(register);
    }
    trigger(index, data) {
        this._registry[index].callback(data);
        if (!this._registry[index].repeated)
            this._registry.splice(index, 1);
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
