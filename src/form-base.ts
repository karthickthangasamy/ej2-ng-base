import { ControlValueAccessor } from '@angular/forms';

/**
 * Angular Form Base Module
 */
export class FormBase<T> implements ControlValueAccessor {
    public value: T;

    public propagateChange: (_: T) => void;
    public propagateTouch: () => void;

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

    public writeValue(value: T): void {
        this.value = value;
    }

}
