import { Project } from "../classes/Project";
import { AutoBind } from "../decorators/index";
import { IDraggable } from "../interfaces/IDraggable";
import { Component } from "./Component";


export class ProjectItem extends Component<HTMLUListElement, HTMLLIElement> implements IDraggable {
    
    constructor(
        rootIdName: string,
        private project: Project

    ){
        super('single-project', rootIdName, false, true, project.id);
        this.configure();
        this.renderContent();
    }

    dragStartHandler(event: DragEvent): void {
        event.dataTransfer!.setData('text/plain', this.project.id);
        event.dataTransfer!.effectAllowed = 'move';
    }

    @AutoBind
    dragEndHandler(_event: DragEvent): void {
        console.log('Dragend')
    }

    /**
     * @description Configure an drag and drop event listener to the element
     */
    configure(){
        this.element.addEventListener('dragstart', this.dragStartHandler.bind(this));
        this.element.addEventListener('dragend', this.dragEndHandler)
    }

    /**
     * @description Render content into the element
     */
    renderContent(){
        this.element.querySelector('h2')!.textContent = this.project.title;
        this.element.querySelector('h3')!.textContent = this.getContentForAssignedUsers()
        this.element.querySelector('p')!.textContent = this.project.desc;
    }

    /**
     * @description Returns an valid string
     * @returns {string}
     */
    private getContentForAssignedUsers(): string
    {
        const count: number  =this.project.users
        return (count === 1) ? `${count} Person assigned` : `${count} Persons assigned`;
    }
}