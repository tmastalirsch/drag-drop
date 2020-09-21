import { ProjectState } from '../state/ProjectState';
import { AutoBind } from './../decorators/index';
import { IValidate } from './../interfaces/IValidate';
import { validate } from './../utils/index';
import { Component } from './Component';
/**
 * @class
 * @description Represent the template with id project-input on index.html
 * @author tmastalirsch
 */
export class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {

    public projectState = ProjectState.getInstance();
    public titleInputElement: HTMLInputElement;
    public descriptionInputElement: HTMLInputElement;
    public peopleInputElement: HTMLInputElement;

    /**
     * @constructor
     */
    constructor()
    {
        super('project-input', 'app', true, false,'user-input');

        this.titleInputElement = this.element.querySelector(
            '#title') as HTMLInputElement;
        this.descriptionInputElement = this.element.querySelector(
            '#description') as HTMLInputElement;
        this.peopleInputElement = this.element.querySelector(
            '#people') as HTMLInputElement;

        this.configure();
    }


    /**
     * @description Configure an submit event listener to the element
     */
    configure()
    {
        this.element.addEventListener('submit', this.submitHandler);
    }

    renderContent(){}

    /**
     * 
     * @param {Event} event 
     */
    @AutoBind
    private submitHandler(event: Event)
    {
        event.preventDefault();
        const userInput = this.collectUserInput();

        if(Array.isArray(userInput)){
            const [title, desc, user] = userInput;
            this.projectState.addProject({title, desc, users: user})
            this.clearInputs();
        }
    }

    /**
     * @description
     * @returns {Array|void}  
     */
    private collectUserInput(): [string, string, number] | void
    {   const title = this.titleInputElement.value;
        const desc =  this.descriptionInputElement.value;
        const user = this.peopleInputElement.value 

        const titleValidate: IValidate = {value: title, required: true};
        const descValidate: IValidate = {value: desc, required: true, minLength: 50, maxLength: 150};
        const userValidate: IValidate = {value: user, required:true, min: 1, max: 500};

        const isValid = (
            !validate(titleValidate) ||
            !validate(descValidate) ||
            !validate(userValidate)
        );

        if(isValid){
            alert('Invalid input, please try again !');
            return;
        } else {

            const title = this.titleInputElement.value;
            const desc = this.descriptionInputElement.value;
            const user = this.peopleInputElement.value;

            return [title, desc, parseInt(user)];
        }
    }
    /**
     * @deprecated Please need the validate from utils folder
     * @description Returns an boolean by checking the user inputs 
     * @returns {boolean}
     */
    private isValidUserInput(): boolean
    {
        return (
            this.titleInputElement.value.trim().length == 0 ||
            this.descriptionInputElement.value.trim().length == 0 ||
            this.peopleInputElement.value.trim().length == 0
        );
    }

    /**
     * @description Clear user inputs after submit btn
     */
    private clearInputs()
    {
        this.titleInputElement.value = '';
        this.descriptionInputElement.value = '';
        this.peopleInputElement.value = '';
    }

    
}