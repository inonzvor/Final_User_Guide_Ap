export type Listener<T> = (state: T) => void;
export type Unsubscribe = () => void;

/**
 * Minimal, dependency-free observable state container. No framework
 * assumptions — wrap it in a React hook (useSyncExternalStore), a Vue ref,
 * or whatever the eventual UI layer uses.
 */
export class Store<T> {
  private state: T;
  private listeners = new Set<Listener<T>>();

  constructor(initialState: T) {
    this.state = initialState;
  }

  getState(): T {
    return this.state;
  }

  setState(next: T): void {
    if (Object.is(next, this.state)) return;
    this.state = next;
    this.listeners.forEach((listener) => listener(this.state));
  }

  update(partial: Partial<T>): void {
    this.setState({ ...this.state, ...partial });
  }

  subscribe(listener: Listener<T>): Unsubscribe {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }
}
