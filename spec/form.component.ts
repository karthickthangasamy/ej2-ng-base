import { Component, ElementRef, Inject, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { ComponentBase, IComponentBase } from '../src/component-base';
import { FormBase } from '../src/form-base';
import { applyMixins } from '../src/util';
import { DemoBase } from './sample.core';

/**
 * Form Component
 */
@Component({
    selector: 'ej2-button,[ej2-button]',
    inputs: ['text', 'height', 'width', 'value'],
    outputs: ['click', 'focus', 'blur'],
    template: '',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => DemoFormComponent),
            multi: true
        }
    ],
})
export class DemoFormComponent extends DemoBase implements IComponentBase {


    constructor( @Inject(ElementRef) private ngEle: ElementRef) {
        super();
        this.element = this.ngEle.nativeElement;
        this.registerEvents(['click']);
        this.addTwoWay(['text']);
    }

    public registerEvents: (eventList: string[]) => void;
    public addTwoWay: (propList: string[]) => void;
}

applyMixins(DemoFormComponent, [ComponentBase, FormBase]);


// //TO Cover coverage
let formCmpt: FormBase<any> = new FormBase();
formCmpt.localChange({ value: 'new' });