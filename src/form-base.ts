import { EventEmitter, ElementRef } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';

/**
 * Angular Form Base Module
 */
export class FormBase<T> implements ControlValueAccessor {
    public value: T;

    public propagateChange: (_: T) => void;
    public propagateTouch: () => void;

    public element: HTMLElement;
    public inputElement: HTMLInputElement;
    private ngEle: ElementRef;
    public appendTo: (ele: string | HTMLElement) => void;

    public focus: EventEmitter<Object>;
    public blur: EventEmitter<Object>;

    public localChange(e: { value?: T, checked?: T }): void {
        if (this.propagateChange !== undefined) {
            this.propagateChange((e.checked === undefined ? e.value : e.checked));
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
        this.value = value;
    }

    public ngOnFocus(e: Event): void {
        this.focus.emit(e);
    }

    public ngOnBlur(e: Event): void {
        this.propagateTouch();
        this.blur.emit(e);
    }
}
