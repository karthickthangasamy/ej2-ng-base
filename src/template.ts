import { ViewContainerRef, EmbeddedViewRef, ElementRef, TemplateRef } from '@angular/core';
import { setTemplateEngine, getTemplateEngine } from '@syncfusion/ej2-base';
import { setValue, getValue } from '@syncfusion/ej2-base';

let stringCompiler: (template: string, helper?: object) => (data: Object | JSON) => string = getTemplateEngine();

/**
 * Angular Template Compiler
 */
export function compile(templateEle: AngularElementType, helper?: Object): (data: Object | JSON, helper?: Object) => Object {
    if (typeof templateEle === 'string') {
        return stringCompiler(templateEle, helper);
    } else {
        let contRef: ViewContainerRef = templateEle.elementRef.nativeElement._viewContainerRef;
        let propName: string = templateEle.elementRef.nativeElement.propName;
        return (data: Object): Object => {
            let context: Object = { $implicit: data };
            let viewRef: EmbeddedViewRef<Object> = contRef.createEmbeddedView(templateEle as TemplateRef<Object>, context);
            let viewCollection: { [key: string]: EmbeddedViewRef<Object>[] } = getValue('currentInstance.registeredTemplate', contRef);
            if (typeof viewCollection[propName] === 'undefined') {
                viewCollection[propName] = [];
            }
            viewCollection[propName].push(viewRef);
            return viewRef.rootNodes;
        };
    }
}

/**
 * Property decorator for angular.
 */
export function Template<T>(defaultValue?: Object): PropertyDecorator {
    return (target: Object, key: string) => {
        let propertyDescriptor: Object = {
            set: setter(key),
            get: getter(key, defaultValue),
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
        val.elementRef.nativeElement.propName = key;
        setValue(key + 'Ref', val, this);
    };
}

function getter(key: string, defaultValue: Object): Function {
    return function (): Object {
        return getValue(key + 'Ref', this) || defaultValue;
    };
}

export interface AngularElementType {
    elementRef: ElementRef;
}

//tslint:disable-next-line
setTemplateEngine({ compile: (compile as any) });
