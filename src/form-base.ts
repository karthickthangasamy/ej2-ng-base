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
    private ngEle: ElementRef;
    public appendTo: (ele: string | HTMLElement) => void;

    public focus: EventEmitter<Object>;
    public blur: EventEmitter<Object>;

    public localChange(e: { value: T }): void {
        if (this.propagateChange !== undefined) {
            this.propagateChange(e.value);
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
        if (this.ngEle.nativeElement.nodeName.toLowerCase() !== 'input') {
            this.element.addEventListener('focus', this.ngOnFocus.bind(this));
            this.element.addEventListener('blur', this.ngOnBlur.bind(this));
        }
    }

    public writeValue(value: T): void {
        this.value = value;
    }

    public ngOnFocus(e: Event): void {
        this.focus.emit(e);
    }

    public ngOnBlur(e: Event): void {
        this.blur.emit(e);
    }
}
