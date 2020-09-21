
namespace Interfaces {

    /**
     * @interface
     * @description
     */
    export interface CreateProjectDto {
        title: string;
        desc: string;
        users: number
    }

    /**
     * @instance
     * @description
     */
    export interface IProject {
        readonly id: string;
        title: string;
        desc: string;
        users: number
    }

    /**
     * @interface
     * @description
     */
    export interface IValidate {
        value: string | number;
        required?: boolean;
        minLength?: number;
        maxLength?: number;
        min?: number;
        max?: number;
    }
}