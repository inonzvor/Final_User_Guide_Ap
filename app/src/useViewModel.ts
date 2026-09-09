import { useSyncExternalStore } from 'react';

export interface Subscribable<S> {
  getState(): S;
  subscribe(listener: (state: S) => void): () => void;
}

/** Bridges any of the ../src view-models (getState/subscribe) into React state. */
export function useViewModel<S>(vm: Subscribable<S>): S {
  return useSyncExternalStore(
    (onChange) => vm.subscribe(onChange),
    () => vm.getState(),
  );
}
