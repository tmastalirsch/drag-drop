
/**
 * @interface
 * @description Represent an interface for user input validation 
 */
export interface IValidate {
    value: string | number;
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    min?: number;
    max?: number;
}