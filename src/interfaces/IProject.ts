import { ProjectStatus } from './../enums/ProjectStatus';
/**
* @instance
* @description Represent an interface for project object
*/
export interface IProject {
    readonly id: string;
    title: string;
    desc: string;
    users: number,
    status: ProjectStatus
}