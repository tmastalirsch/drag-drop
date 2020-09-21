/**
 * 
 * 
 * @description Decorator function for auto binding by event listener methods 
 * @param _target 
 * @param _methodName 
 * @param descriptor 
 */
const AutoBind = function (
    _target: any, 
    _methodName: string, 
    descriptor: PropertyDescriptor
): PropertyDescriptor
{
    const originalMethod = descriptor.value;
    const adjDescriptor: PropertyDescriptor = {
        configurable: true,
        get(){
            return originalMethod.bind(this)
        }
    };
    return adjDescriptor;
};

export {
    AutoBind
}