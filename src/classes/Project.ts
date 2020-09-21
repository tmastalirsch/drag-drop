import { ProjectStatus } from './../enums/ProjectStatus';
import { CreateProjectDto } from '../interfaces/CreateProjectDto';
import { IProject } from './../interfaces/IProject';

/**
 * @class
 * @description Represent a project object
 * @author tmastalirsch
 */
export class Project implements IProject {

    private constructor(
        readonly id: string,
        public title: string,
        public desc: string,
        public users: number,
        public status: ProjectStatus
    ){
        this.id = id;
        this.title = title;
        this.desc = desc;
        this.users = users;
        this.status = status
    }

    /**
     * @static
     * @description Create a new project object
     * @returns {Project}
     */
    public static create(
        createProject: CreateProjectDto
    ): Project
    {
        const id = Math.random().toString();
        const status = ProjectStatus.Active;
        return new Project(
            id,
            createProject.title,
            createProject.desc,
            createProject.users,
            status
        )
    }

}