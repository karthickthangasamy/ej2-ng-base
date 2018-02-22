import { EventEmitter, ElementRef } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';

/**
 * Angular Form Base Module
 */
export class FormBase<T> implements ControlValueAccessor {
    public value: T;
    public checked: boolean;
    public enabled: Object;

    public propagateChange(_: T): void { return; }
    public propagateTouch(): void { return; }

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
        /* istanbul ignore else  */
        if (typeof window !== 'undefined') {
            // Used setTimeout for template binding
            // Refer Link: https://github.com/angular/angular/issues/6005
            setTimeout(() => {
                this.appendTo(this.element);
                let ele: HTMLElement = this.inputElement || this.element;
                ele.addEventListener('focus', this.ngOnFocus.bind(this));
                ele.addEventListener('blur', this.ngOnBlur.bind(this));
            });
        }

    }

    public setDisabledState(disabled: boolean): void {
        this.enabled = !disabled;
    }

    public writeValue(value: T): void {
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
        if (value === null) {
            return;
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
