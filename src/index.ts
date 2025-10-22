type TEvent = {
    event: string,
    callback: Function,
    repeated: boolean,
    identifier?: string | number
}

interface IEventEmitter {
    emit<T> (event: string, data?: T, identifier?: string | number): void,
    on<T = undefined> (event: string, callback: (data: T) => void, identifier?: string | number): void,
    once<T = undefined> (event: string, callback: (data: T) => void, identifier?: string | number): void,
    off (event: string, identifier?: string | number): void
}
 
export default class EventEmitter implements IEventEmitter {

    private _registry: Array<TEvent> = [];

    public emit<T> (event: string, data?: T, identifier?: string | number): void {
        for(let i = this._registry.length - 1; i > -1; i--) {
            if(this._registry[i].event === event) {
                this._registry[i].callback(data);
                if(!this._registry[i].repeated) this._registry.splice(i, 1);
            }
        }
    }

    public on<T = undefined> (event: string, callback: (data: T) => void, identifier?: string | number): void {
        this.register(event, callback);
    }

    public once<T = undefined> (event: string, callback: (data: T) => void, identifier?: string | number): void {
        this.register(event, callback, false);
    }

    public off (event: string, identifier?: string | number): void {
        for(let i = this._registry.length - 1; i > -1; i--) {
            if(this._registry[i].event === event) this._registry.splice(i, 1);
        }
    }

    private register<T> (event: string, callback: (data: T) => void, repeated: boolean = true): void {
        const register: TEvent = { event, repeated, callback };
        this._registry.push(register);
    }

}

declare global {
    interface Window {
        FunkzEmitter: EventEmitter
    }
}

const emitter = new EventEmitter();
window.FunkzEmitter = emitter;

export function emit<T> (event: string, data?: T, identifier?: string | number): void {
    emitter.emit(event, data, identifier);
}

export function on<T = undefined> (event: string, callback: (data: T) => void, identifier?: string | number): void {
    emitter.on(event, callback, identifier);
}

export function once<T = undefined> (event: string, callback: (data: T) => void, identifier?: string | number): void {
    emitter.once(event, callback, identifier);
}

export function off (event: string, identifier?: string | number): void {
    emitter.off(event, identifier);
}