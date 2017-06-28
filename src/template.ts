import { ViewContainerRef, EmbeddedViewRef, ElementRef, TemplateRef } from '@angular/core';
import { setTemplateEngine } from '@syncfusion/ej2-base';
import { setValue, getValue } from '@syncfusion/ej2-base/util';

/**
 * Angular Template Compiler
 */
export function compile(templateEle: AngularElementType, helper?: Object): (data: Object | JSON) => Object {
    let contRef: ViewContainerRef = templateEle.elementRef.nativeElement._viewContainerRef;
    return (data: Object): Object => {
        let context: Object = { $implicit: data };
        let check: EmbeddedViewRef<Object> = contRef.createEmbeddedView(templateEle as TemplateRef<Object>, context);
        return check.rootNodes;
    };
}

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

//tslint:disable-next-line
setTemplateEngine({ compile: (compile as any) });

