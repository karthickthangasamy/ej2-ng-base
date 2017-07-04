import { ElementRef } from '@angular/core';
import { setValue, getValue } from '@syncfusion/ej2-base/util';


/**
 * Property decorator for angular.
 */
export function Template<T>(): PropertyDecorator {
    return (target: Object, key: string) => {
        let propertyDescriptor: Object = {
            set: setter(key),
            get: getter(key),
            enumerable: true,
            configurable: true
        };
        Object.defineProperty(target, key, propertyDescriptor);
    };
}

function setter(key: string): Function {
    return function (val: AngularElementType): void {
        if (val === undefined) { return; }
        val.elementRef.nativeElement._viewContainerRef = this.viewContainerRef;
        setValue(key + 'Ref', val, this);
    };
}

function getter(key: string): Function {
    return function (): Object {
        return getValue(key + 'Ref', this);
    };
}

export interface AngularElementType {
    elementRef: ElementRef;
}

