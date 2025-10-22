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
                const index = identifier ? (this._registry[i].identifier === identifier ? i : -1) : i;
                if(index > -1) 
                    this.trigger(index, data);
            }
        }
    }

    public on<T = undefined> (event: string, callback: (data: T) => void, identifier?: string | number): void {
        this.register(event, callback, identifier);
    }

    public once<T = undefined> (event: string, callback: (data: T) => void, identifier?: string | number): void {
        this.register(event, callback, identifier, false);
    }

    public off (event: string, identifier?: string | number): void {
        for(let i = this._registry.length - 1; i > -1; i--) {
            if(this._registry[i].event === event && this._registry[i].identifier === identifier) 
                this._registry.splice(i, 1);
        }
    }

    private register<T> (event: string, callback: (data: T) => void, identifier?: string | number, repeated: boolean = true): void {
        const register: TEvent = { event, repeated, callback, identifier };
        this._registry.push(register);
    }

    private trigger<T> (index: number, data: T): void {
        this._registry[index].callback(data);
        if(!this._registry[index].repeated) 
            this._registry.splice(index, 1);
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