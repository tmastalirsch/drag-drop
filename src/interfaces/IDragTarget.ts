

/**
 * @instance
 * @description
 * @author tmastalirsch
 */
export interface IDragTarget {

    dragOverHandler(event: DragEvent): void;

    dropHandler(event: DragEvent): void;

    dragLeaveHandler(event: DragEvent): void;
}