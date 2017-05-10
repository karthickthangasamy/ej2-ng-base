import { Component } from '@angular/core';

/**
 * App Module
 */
@Component({
    selector: 'app-component',
    template: `
    <ej2-button [(value)]='val' [(text)]='text' (updated)='onButtonClick()' ></ej2-button>
    <p>{{text}}</p>
    `
})
export class AppComponent {
    public uName: string = '';
    public dest: string = '';
    public text: string = 'EJButton';
    public val: string = '';
    public child1: Object = { text: 'Child1', header: true };
    public child2: Object = { text: 'Child2', header: false };
    public child3: Object = { text: 'Child3', header: true };
    constructor() {
        //Todo
    }

    public onButtonClick(): void {
        // Todo 
    }

    public onFormSubmit(data: any): void {
        //Todo
    }


}
