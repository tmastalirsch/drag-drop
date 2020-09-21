
/**
 * @description
 * @author tmastalirsch
 */
export abstract class Component<T extends HTMLElement, U extends HTMLElement> {

    protected templateElement: HTMLTemplateElement;
    protected rootElement: T;
    protected element: U;


    /**
     * 
     * @param templateIdName id from template html tag
     * @param rootElementIdName id from root html tag where component is load
     * @param insertAtStart define the position where component is load
     * @param isDraggable  define is an drag and drop component
     * @param newElementIdName 
     */
    constructor(
        readonly templateIdName: string,
        rootElementIdName: string = 'app',
        insertAtStart: boolean = false,
        isDraggable: boolean = false,
        newElementIdName?: string 
    )
    {
        this.templateElement = document.getElementById(templateIdName)! as HTMLTemplateElement;
        this.rootElement = document.getElementById(rootElementIdName)! as T;
        this.element = this.getImportedNodeContent().firstElementChild as U;

        if(newElementIdName){
            this.element.id = newElementIdName;
        }

        this.element.draggable = isDraggable

        this.attach(insertAtStart);
    }

    /**
     * @description
     * @returns {void}
     */
    protected attach(insertAfterBeginning: boolean): void    
    {   
        const position = (insertAfterBeginning) ? 'afterbegin' : 'beforeend';
        this.rootElement.insertAdjacentElement(position, this.element);
    }

    /**
     * @description Returns the nodes from template element
     * @returns {DocumentFragment}
     */
    protected getImportedNodeContent(): DocumentFragment   
    {   const templateElementContent = this.templateElement.content;
        return document.importNode(templateElementContent, true);
    }

    protected abstract configure?(): void
    protected abstract renderContent?(): void

}