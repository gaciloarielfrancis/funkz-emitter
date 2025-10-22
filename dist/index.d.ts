interface IEventEmitter {
    emit<T>(event: string, data?: T, identifier?: string | number): void;
    on<T = undefined>(event: string, callback: (data: T) => void, identifier?: string | number): void;
    once<T = undefined>(event: string, callback: (data: T) => void, identifier?: string | number): void;
    off(event: string, identifier?: string | number): void;
}
export default class EventEmitter implements IEventEmitter {
    private _registry;
    emit<T>(event: string, data?: T, identifier?: string | number): void;
    on<T = undefined>(event: string, callback: (data: T) => void, identifier?: string | number): void;
    once<T = undefined>(event: string, callback: (data: T) => void, identifier?: string | number): void;
    off(event: string, identifier?: string | number): void;
    private register;
}
declare global {
    interface Window {
        FunkzEmitter: EventEmitter;
    }
}
export declare function emit<T>(event: string, data?: T, identifier?: string | number): void;
export declare function on<T = undefined>(event: string, callback: (data: T) => void, identifier?: string | number): void;
export declare function once<T = undefined>(event: string, callback: (data: T) => void, identifier?: string | number): void;
export declare function off(event: string, identifier?: string | number): void;
export {};
