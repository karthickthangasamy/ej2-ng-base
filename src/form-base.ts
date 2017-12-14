import { EventEmitter, ElementRef } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';

/**
 * Angular Form Base Module
 */
export class FormBase<T> implements ControlValueAccessor {
    public value: T;
    public checked: boolean;

    public propagateChange: (_: T) => void;
    public propagateTouch: () => void;

    public element: HTMLElement;
    public inputElement: HTMLInputElement;
    private ngEle: ElementRef;
    public appendTo: (ele: string | HTMLElement) => void;

    public focus: EventEmitter<Object>;
    public blur: EventEmitter<Object>;

    public localChange(e: { value?: T, checked?: T }): void {
        let value: T = (e.checked === undefined ? e.value : e.checked);
        if (this.propagateChange !== undefined && value !== undefined) {
            // Update angular from our control
            this.propagateChange(value);
        }
    }

    public registerOnChange(registerFunction: (_: T) => void): void {
        this.propagateChange = registerFunction;
    }

    public registerOnTouched(registerFunction: () => void): void {
        this.propagateTouch = registerFunction;
    }

    public ngAfterViewInit(): void {
        this.appendTo(this.element);
        let ele: HTMLElement = this.inputElement || this.element;
        ele.addEventListener('focus', this.ngOnFocus.bind(this));
        ele.addEventListener('blur', this.ngOnBlur.bind(this));
    }

    public writeValue(value: T): void {
        if (value === null) { return; }
        //update control value from angular
        if (this.checked === undefined) {
            this.value = value;
        } else {
            if (typeof value === 'boolean') {
                this.checked = value;
            } else {
                this.checked = value === this.value;
            }
        }
    }

    public ngOnFocus(e: Event): void {
        this.focus.emit(e);
    }

    public ngOnBlur(e: Event): void {
        this.propagateTouch();
        this.blur.emit(e);
    }
}
