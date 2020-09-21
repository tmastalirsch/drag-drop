


/**
 * @type
 * @description 
 * @author tmastalirsch
 */
type Listener<T> = (projects: T[]) => void;

/**
 * @description A class for management the state
 * @author tmastalirsch
 */
export class State<T> {

    protected listener: Listener<T>[] = [];

    public addListener(listenerFn: Listener<T>)
    {
        this.listener.push(listenerFn);
        return this;
    }
}