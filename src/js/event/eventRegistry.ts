import {randomUUID} from 'crypto'
import {GameEvent} from "./GameEvent.js";

type CallbackType = (event: Event) => void
type CallbackUuidKey = string
const eventToCallbacks: Map<GameEvent, Map<CallbackUuidKey, CallbackType>> = new Map();

export function registerEvent(gameEvent: GameEvent, callbackFn: CallbackType): CallbackUuidKey {
    let eventCallbacks: Map<CallbackUuidKey, CallbackType> | undefined = eventToCallbacks.get(gameEvent);
    if(!eventCallbacks) {
        eventCallbacks = new Map();
        eventToCallbacks.set(gameEvent, eventCallbacks);
    }

    const callbackKey: CallbackUuidKey = randomUUID();
    eventCallbacks.set(callbackKey, callbackFn);

    return callbackKey;
}

export function unregisterEvent(gameEvent: GameEvent, callbackKey: CallbackUuidKey) {
    const eventCallbacks = eventToCallbacks.get(gameEvent);
    eventCallbacks?.delete(callbackKey);
}

export function triggerEvent(gameEvent: GameEvent, event: Event) {
    let eventCallbacks: Map<CallbackUuidKey, CallbackType> | undefined = eventToCallbacks.get(gameEvent);
    if(!eventCallbacks) {
        throw new Error("Received request to trigger event " + gameEvent.name + " when none registered");
    }

    eventCallbacks.forEach((callbackFunction) => {
        callbackFunction(event);
    });
}