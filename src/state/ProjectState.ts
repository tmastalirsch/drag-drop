import { Project } from '../classes/Project';
import { ProjectStatus } from '../enums/ProjectStatus';
import { CreateProjectDto } from '../interfaces/CreateProjectDto';
import { State } from './State';

/**
 * @description Singleton class for project state management
 * @author tmastalirsch
 */
export class ProjectState extends State<Project> {

    private static instance: ProjectState;
    private projects: Project[] = [];

    private constructor(){
        super();
    }
    /**
     * @public
     * @static
     * @description
     */
    public static getInstance(): ProjectState
    {   
        if(this.instance != null)
        {
            return this.instance;
        }

        this.instance = new ProjectState();
        return this.instance;
    }   

    /**
     * 
     * @param projectDto 
     */
    public addProject(projectDto: CreateProjectDto): this
    {      
        const project = Project.create(projectDto);
        this.projects.push(project);
        this.updateListener()
        return this;
    }
    /**
     * 
     * @param projectId 
     */
    public updateProjectStatus(projectId: string, newStatus: ProjectStatus): this
    {
        const project = this.projects.find((project) => project.id === projectId);
        if(project && project.status !== newStatus)
        {
            project.status = newStatus;
            this.updateListener();
        }
        return this;
    }

    /**
     * 
     */
    private updateListener(): void
    {
        for(const listenerFn of this.listener){
            listenerFn(this.projects.slice())
        }
    }
}