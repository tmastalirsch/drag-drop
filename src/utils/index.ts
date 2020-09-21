import { Collection } from './Collection';
import { IValidate } from './../interfaces/IValidate';
/**
 * @description Returns an boolean by validate inputs
 * @param {IValidate} input 
 * @returns {boolean}
 */
const validate = function(input: IValidate): boolean
{
    let isValid = true

    if(input.required)
    {
        isValid = (
            isValid &&
            input.value.toString().trim().length !== 0
        );
    }

    if(input.minLength != null && typeof input.value === 'string')
    {
        isValid = (
            isValid &&
            input.value.length > input.minLength
        );
    }

    if(input.maxLength != null && typeof input.value === 'string')
    {
        isValid = (
            isValid &&
            input.value.length < input.maxLength
        );
    }

    if(input.min != null && typeof input.value === 'number')
    {
        isValid = (
            isValid &&
            input.value > input.min
        );
    }

    if(input.max != null && typeof input.value === 'number')
    {
        isValid = (
            isValid &&
            input.value < input.max
        );
    }

    return isValid;
}
/**
 * 
 */
export {
    validate,
    Collection
}