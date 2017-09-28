import { setTemplateEngine, getTemplateEngine } from '@syncfusion/ej2-base';
import { setValue, getValue } from '@syncfusion/ej2-base';
var stringCompiler = getTemplateEngine();
export function compile(templateEle, helper) {
    if (typeof templateEle === 'string') {
        return stringCompiler(templateEle, helper);
    }
    else {
        var contRef_1 = templateEle.elementRef.nativeElement._viewContainerRef;
        var propName_1 = templateEle.elementRef.nativeElement.propName;
        return function (data) {
            var context = { $implicit: data };
            var viewRef = contRef_1.createEmbeddedView(templateEle, context);
            var viewCollection = getValue('currentInstance.registeredTemplate', contRef_1);
            if (typeof viewCollection[propName_1] === 'undefined') {
                viewCollection[propName_1] = [];
            }
            viewCollection[propName_1].push(viewRef);
            return viewRef.rootNodes;
        };
    }
}
export function Template(defaultValue) {
    return function (target, key) {
        var propertyDescriptor = {
            set: setter(key),
            get: getter(key, defaultValue),
            enumerable: true,
            configurable: true
        };
        Object.defineProperty(target, key, propertyDescriptor);
    };
}
function setter(key) {
    return function (val) {
        if (val === undefined) {
            return;
        }
        setValue(key + 'Ref', val, this);
        if (typeof val !== 'string') {
            val.elementRef.nativeElement._viewContainerRef = this.viewContainerRef;
            val.elementRef.nativeElement.propName = key;
        }
        else {
            if (this.saveChanges) {
                this.saveChanges(key, val, undefined);
                this.dataBind();
            }
        }
    };
}
function getter(key, defaultValue) {
    return function () {
        return getValue(key + 'Ref', this) || defaultValue;
    };
}
setTemplateEngine({ compile: compile });
