import { ProjectItem } from './ProjectItem';
import { ProjectStatus } from '../enums/ProjectStatus';
import { Project } from './../classes/Project';
import { ProjectState } from '../state/ProjectState';
import { Component } from './Component';
import { IDragTarget } from '../interfaces/IDragTarget';
import { AutoBind } from '../decorators/index';
/**
 * @description Represent the template with id project-list on index.html
 * @author tmastalirsch
 */
export class ProjectList extends Component<HTMLDivElement, HTMLElement> implements IDragTarget {

    public projectState = ProjectState.getInstance();
    public assignedProjects: Project[] = [];

    constructor(private type: 'active' | 'finished'){
        super('project-list', 'app', false, false,`${type}-projects`);
        
        this.configure();
        this.renderContent();
    }

    /**
     * @description Handle the drag over event to add css class 'droppable'
     */
    dragOverHandler(event: DragEvent): void {
        if(event.dataTransfer && event.dataTransfer.types[0] === 'text/plain')
        {
            event.preventDefault();
            const listElement = this.element.querySelector('ul')!;
            listElement.classList.add('droppable');
        }
        
    }

    /**
     * @description Handle the drop event to change the project status
     */
    dropHandler(event: DragEvent): void {
        const projectId = event.dataTransfer!.getData('text/plain');
        const status = (this.type === 'active') ? ProjectStatus.Active : ProjectStatus.Finished;
        this.projectState.updateProjectStatus(projectId, status);
    }
    
    /**
     * @description handle drag leave event to remove css class 'droppable'
     */
    @AutoBind
    dragLeaveHandler(_event: DragEvent): void {
        const listElement = this.element.querySelector('ul')!;
        listElement.classList.remove('droppable');
    }

    configure(): void {

        this.element.addEventListener('dragover', this.dragOverHandler.bind(this));
        this.element.addEventListener('drop', this.dropHandler.bind(this));
        this.element.addEventListener('dragleave', this.dragLeaveHandler);

        this.projectState.addListener((projects: Project[]) => {
            const relevantProjects = projects.filter(
                (project) => {
                    if(this.type === 'active'){
                        return project.status === ProjectStatus.Active;
                    }
                    return project.status === ProjectStatus.Finished;
                }
            ) 
            this.assignedProjects = relevantProjects;
            this.renderProjects();
        });
    }

    renderContent()
    {
        const listId = `${this.type}-projects-list`;
        this.element.querySelector('ul')!.id = listId;
        this.element.querySelector('h2')!.textContent = this.type.toUpperCase() + ' PROJECTS';
    }
    /**
     * @description
     */
    private renderProjects()
    {
        const listElement = document.getElementById(
            `${this.type}-projects-list`)! as HTMLUListElement;

        // prevent to show duplicated list items from array  
        listElement.innerHTML = '';

        for(const projectItem of this.assignedProjects){
            new ProjectItem(this.element.querySelector('ul')!.id, projectItem)
        }
    }
}