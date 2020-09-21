

/**
 * @instance
 * @description
 * @author tmastalirsch
 */
export interface IDraggable {

    dragStartHandler(event: DragEvent): void;

    dragEndHandler(event: DragEvent): void;
}