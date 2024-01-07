import {GameEvent} from "./GameEvent.js";

type CallbackType = (event: Event | undefined) => void
type CallbackUuidKey = string
const eventToCallbacks: Map<GameEvent, Map<CallbackUuidKey, CallbackType>> = new Map();

export function registerEvent(gameEvent: GameEvent, callbackFn: CallbackType): CallbackUuidKey {
    let eventCallbacks: Map<CallbackUuidKey, CallbackType> | undefined = eventToCallbacks.get(gameEvent);
    if(!eventCallbacks) {
        eventCallbacks = new Map();
        eventToCallbacks.set(gameEvent, eventCallbacks);
    }

    const callbackKey: CallbackUuidKey = self.crypto.randomUUID();
    eventCallbacks.set(callbackKey, callbackFn);

    return callbackKey;
}

export function unregisterEvent(gameEvent: GameEvent, callbackKey: CallbackUuidKey) {
    const eventCallbacks = eventToCallbacks.get(gameEvent);
    eventCallbacks?.delete(callbackKey);
}

export function triggerEvent(gameEvent: GameEvent, relevantData?: any) {
    let eventCallbacks: Map<CallbackUuidKey, CallbackType> | undefined = eventToCallbacks.get(gameEvent);
    if(!eventCallbacks) {
        console.debug("Received request to trigger event " + gameEvent.name + " when none registered");
        return;
    }

    eventCallbacks.forEach((callbackFunction) => {
        callbackFunction(relevantData);
    });
}