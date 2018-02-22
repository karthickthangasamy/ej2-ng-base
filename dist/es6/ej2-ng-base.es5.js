import { getTemplateEngine, getValue, isNullOrUndefined, isUndefined, setTemplateEngine, setValue } from '@syncfusion/ej2-base';
import { EventEmitter } from '@angular/core';

/**
 * Angular Utility Module
 */
/* tslint:disable */
function applyMixins(derivedClass, baseClass) {
    baseClass.forEach(function (baseClass) {
        Object.getOwnPropertyNames(baseClass.prototype).forEach(function (name) {
            derivedClass.prototype[name] = baseClass.prototype[name];
        });
    });
}
/**
 * @private
 */
function clearTemplate(_this, templateNames) {
    var regTemplates = Object.keys(_this.registeredTemplate);
    if (regTemplates.length) {
        var regProperties = templateNames && templateNames.filter(function (val) {
            return (/\./g.test(val) ? false : true);
        });
        for (var _i = 0, _a = (regProperties && regProperties || regTemplates); _i < _a.length; _i++) {
            var registeredTemplate = _a[_i];
            for (var _b = 0, _c = _this.registeredTemplate[registeredTemplate]; _b < _c.length; _b++) {
                var rt = _c[_b];
                if (!rt.destroyed) {
                    var pNode = rt._view.renderer.parentNode(rt.rootNodes[0]);
                    for (var m = void 0; m < rt.rootNodes.length; m++) {
                        pNode.appendChild(rt.rootNodes[m]);
                    }
                    rt.destroy();
                }
            }
            delete _this.registeredTemplate[registeredTemplate];
        }
    }
    var _loop_1 = function (tagObject) {
        if (tagObject.instance) {
            tagObject.instance.clearTemplate((templateNames && templateNames.filter(function (val) {
                return (new RegExp(tagObject.name).test(val) ? true : false);
            })));
        }
    };
    for (var _d = 0, _e = _this.tagObjects; _d < _e.length; _d++) {
        var tagObject = _e[_d];
        _loop_1(tagObject);
    }
}
/**
 * To set value for the nameSpace in desired object.
 * @param {string} nameSpace - String value to the get the inner object
 * @param {any} value - Value that you need to set.
 * @param {any} obj - Object to get the inner object value.
 * @return {void}
 * @private
 */
function setValue$1(nameSpace, value, object) {
    var keys = nameSpace.split('.');
    var fromObj = object || {};
    for (var i = 0; i < keys.length; i++) {
        var key = keys[i];
        if (i + 1 === keys.length) {
            fromObj[key] = value === undefined ? {} : value;
        }
        else if (fromObj[key] === undefined) {
            fromObj[key] = {};
        }
        fromObj = fromObj[key];
    }
    return fromObj;
}

var ComplexBase = /** @__PURE__ @class */ (function () {
    function ComplexBase() {
        this.hasChanges = false;
        this.propCollection = {};
        this.tags = [];
        this.tagObjects = [];
    }
    ComplexBase.prototype.ngOnInit = function () {
        this.registeredTemplate = {};
        for (var _i = 0, _a = this.tags; _i < _a.length; _i++) {
            var tag = _a[_i];
            var objInstance = getValue('child' + tag.substring(0, 1).toUpperCase() + tag.substring(1), this);
            if (objInstance) {
                this.tagObjects.push({ instance: objInstance, name: tag });
            }
        }
        var templateProperties = Object.keys(this);
        templateProperties = templateProperties.filter(function (val) {
            return /Ref$/i.test(val);
        });
        for (var _b = 0, templateProperties_1 = templateProperties; _b < templateProperties_1.length; _b++) {
            var tempName = templateProperties_1[_b];
            var propName = tempName.replace('Ref', '');
            setValue(propName.replace('_', '.'), getValue(propName, this), this.propCollection);
        }
    };
    ComplexBase.prototype.ngOnChanges = function (changes) {
        for (var _i = 0, _a = Object.keys(changes); _i < _a.length; _i++) {
            var propName = _a[_i];
            var changedVal = changes[propName];
            this.propCollection[propName] = changedVal.currentValue;
        }
        this.hasChanges = true;
    };
    ComplexBase.prototype.clearTemplate = function (templateNames) {
        clearTemplate(this, templateNames);
    };
    
    ComplexBase.prototype.getProperties = function () {
        for (var _i = 0, _a = this.tagObjects; _i < _a.length; _i++) {
            var tagObject = _a[_i];
            this.propCollection[tagObject.name] = tagObject.instance.getProperties();
        }
        return this.propCollection;
    };
    ComplexBase.prototype.isChanged = function () {
        var result = this.hasChanges;
        for (var _i = 0, _a = this.tagObjects; _i < _a.length; _i++) {
            var item = _a[_i];
            result = result || item.instance.hasChanges;
        }
        return result;
    };
    ComplexBase.prototype.ngAfterContentChecked = function () {
        this.hasChanges = this.isChanged();
        var templateProperties = Object.keys(this);
        templateProperties = templateProperties.filter(function (val) {
            return /Ref$/i.test(val);
        });
    };
    ComplexBase.prototype.ngAfterViewChecked = function () {
        this.hasChanges = false;
    };
    return ComplexBase;
}());
var ArrayBase = /** @__PURE__ @class */ (function () {
    function ArrayBase(propertyName) {
        this.list = [];
        this.hasChanges = false;
        this.propertyName = propertyName;
    }
    ArrayBase.prototype.ngOnInit = function () {
        this.isInitChanges = true;
    };
    ArrayBase.prototype.ngAfterContentInit = function () {
        var _this = this;
        var index = 0;
        this.list = this.children.map(function (child) {
            child.index = index++;
            child.property = _this.propertyName;
            return child;
        });
        this.hasChanges = true;
    };
    ArrayBase.prototype.getProperties = function () {
        var onlyProp = [];
        for (var _i = 0, _a = this.list; _i < _a.length; _i++) {
            var item = _a[_i];
            onlyProp.push(item.getProperties());
        }
        return onlyProp;
    };
    ArrayBase.prototype.isChanged = function () {
        var result = false;
        for (var _i = 0, _a = this.list; _i < _a.length; _i++) {
            var item = _a[_i];
            result = result || item.hasChanges;
        }
        return !!this.list.length && result;
    };
    ArrayBase.prototype.clearTemplate = function (templateNames) {
        var _this = this;
        for (var _i = 0, _a = this.list; _i < _a.length; _i++) {
            var item = _a[_i];
            item.clearTemplate(templateNames && templateNames.map(function (val) {
                return new RegExp(_this.propertyName).test(val) ? val.replace(_this.propertyName + '.', '') : val;
            }));
        }
    };
    ArrayBase.prototype.ngAfterContentChecked = function () {
        this.hasChanges = this.isChanged();
    };
    ArrayBase.prototype.ngAfterViewInit = function () {
        this.isInitChanges = false;
    };
    return ArrayBase;
}());

/**
 * Angular Component Base Module
 */
var ComponentBase = /** @__PURE__ @class */ (function () {
    function ComponentBase() {
    }
    ComponentBase.prototype.ngOnInit = function () {
        this.registeredTemplate = {};
        this.ngBoundedEvents = {};
        this.tags = this.tags || [];
        this.complexTemplate = this.complexTemplate || [];
        this.tagObjects = [];
        for (var _i = 0, _a = this.tags; _i < _a.length; _i++) {
            var tag = _a[_i];
            var tagObject = {
                instance: getValue('child' + tag.substring(0, 1).toUpperCase() + tag.substring(1), this),
                name: tag
            };
            this.tagObjects.push(tagObject);
        }
        var complexTemplates = Object.keys(this);
        complexTemplates = complexTemplates.filter(function (val) {
            return /Ref$/i.test(val) && /\_/i.test(val);
        });
        for (var _b = 0, complexTemplates_1 = complexTemplates; _b < complexTemplates_1.length; _b++) {
            var tempName = complexTemplates_1[_b];
            var propName = tempName.replace('Ref', '');
            var val = {};
            setValue(propName.replace('_', '.'), getValue(propName, this), val);
            this.setProperties(val, true);
        }
    };
    ComponentBase.prototype.ngAfterViewInit = function () {
        var _this = this;
        // Used setTimeout for template binding
        // Refer Link: https://github.com/angular/angular/issues/6005
        setTimeout(function () {
            /* istanbul ignore else  */
            if (typeof window !== 'undefined') {
                _this.appendTo(_this.element);
            }
        });
    };
    ComponentBase.prototype.ngOnDestroy = function () {
        /* istanbul ignore else  */
        if (typeof window !== 'undefined') {
            this.destroy();
            this.clearTemplate(null);
        }
    };
    ComponentBase.prototype.clearTemplate = function (templateNames) {
        clearTemplate(this, templateNames);
    };
    
    ComponentBase.prototype.ngAfterContentChecked = function () {
        for (var _i = 0, _a = this.tagObjects; _i < _a.length; _i++) {
            var tagObject = _a[_i];
            if (!isUndefined(tagObject.instance) && (tagObject.instance.isInitChanges || tagObject.instance.hasChanges)) {
                if (tagObject.instance.isInitChanges) {
                    var propObj = {};
                    propObj[tagObject.name] = tagObject.instance.getProperties();
                    this.setProperties(propObj, tagObject.instance.isInitChanges);
                }
                else {
                    for (var _b = 0, _c = tagObject.instance.list; _b < _c.length; _b++) {
                        var list = _c[_b];
                        if (list.hasChanges) {
                            var curIndex = tagObject.instance.list.indexOf(list);
                            getValue(tagObject.name, this)[curIndex].setProperties(list.getProperties());
                        }
                    }
                }
            }
        }
    };
    ComponentBase.prototype.registerEvents = function (eventList) {
        var ngEventsEmitter = {};
        if (eventList && eventList.length) {
            for (var _i = 0, eventList_1 = eventList; _i < eventList_1.length; _i++) {
                var event_1 = eventList_1[_i];
                ngEventsEmitter[event_1] = new EventEmitter(false);
            }
            this.setProperties(ngEventsEmitter, true);
        }
    };
    ComponentBase.prototype.addTwoWay = function (propList) {
        var _this = this;
        var _loop_1 = function (prop) {
            getValue(prop, this_1);
            Object.defineProperty(this_1, prop, {
                get: function () {
                    return getValue(prop, _this.properties);
                },
                set: function (newVal) {
                    var oldVal = getValue(prop, _this.properties);
                    if (oldVal === newVal) {
                        return;
                    }
                    _this.saveChanges(prop, newVal, oldVal);
                    setValue(prop, (isNullOrUndefined(newVal) ? null : newVal), _this.properties);
                    getValue(prop + 'Change', _this).emit(newVal);
                }
            });
            setValue(prop + 'Change', new EventEmitter(), this_1);
        };
        var this_1 = this;
        for (var _i = 0, propList_1 = propList; _i < propList_1.length; _i++) {
            var prop = propList_1[_i];
            _loop_1(prop);
        }
    };
    ComponentBase.prototype.addEventListener = function (eventName, handler) {
        var eventObj = getValue(eventName, this);
        if (!isUndefined(eventObj)) {
            if (!this.ngBoundedEvents[eventName]) {
                this.ngBoundedEvents[eventName] = new Map();
            }
            this.ngBoundedEvents[eventName].set(handler, eventObj.subscribe(handler));
        }
    };
    ComponentBase.prototype.removeEventListener = function (eventName, handler) {
        var eventObj = getValue(eventName, this);
        if (!isUndefined(eventObj)) {
            this.ngBoundedEvents[eventName].get(handler).unsubscribe();
        }
    };
    ComponentBase.prototype.trigger = function (eventName, eventArgs) {
        var eventObj = getValue(eventName, this);
        if (!isUndefined(eventObj)) {
            eventObj.next(eventArgs);
        }
        var localEventObj = getValue('local' + eventName.charAt(0).toUpperCase() + eventName.slice(1), this);
        if (!isUndefined(localEventObj)) {
            localEventObj.call(this, eventArgs);
        }
    };
    return ComponentBase;
}());

/**
 * Angular Form Base Module
 */
var FormBase = /** @__PURE__ @class */ (function () {
    function FormBase() {
    }
    FormBase.prototype.propagateChange = function (_) { return; };
    FormBase.prototype.propagateTouch = function () { return; };
    FormBase.prototype.localChange = function (e) {
        var value = (e.checked === undefined ? e.value : e.checked);
        if (this.propagateChange !== undefined && value !== undefined) {
            // Update angular from our control
            this.propagateChange(value);
        }
    };
    FormBase.prototype.registerOnChange = function (registerFunction) {
        this.propagateChange = registerFunction;
    };
    FormBase.prototype.registerOnTouched = function (registerFunction) {
        this.propagateTouch = registerFunction;
    };
    FormBase.prototype.ngAfterViewInit = function () {
        var _this = this;
        /* istanbul ignore else  */
        if (typeof window !== 'undefined') {
            // Used setTimeout for template binding
            // Refer Link: https://github.com/angular/angular/issues/6005
            setTimeout(function () {
                _this.appendTo(_this.element);
                var ele = _this.inputElement || _this.element;
                ele.addEventListener('focus', _this.ngOnFocus.bind(_this));
                ele.addEventListener('blur', _this.ngOnBlur.bind(_this));
            });
        }
    };
    FormBase.prototype.setDisabledState = function (disabled) {
        this.enabled = !disabled;
    };
    FormBase.prototype.writeValue = function (value) {
        //update control value from angular
        if (this.checked === undefined) {
            this.value = value;
        }
        else {
            if (typeof value === 'boolean') {
                this.checked = value;
            }
            else {
                this.checked = value === this.value;
            }
        }
        if (value === null) {
            return;
        }
    };
    FormBase.prototype.ngOnFocus = function (e) {
        this.focus.emit(e);
    };
    FormBase.prototype.ngOnBlur = function (e) {
        this.propagateTouch();
        this.blur.emit(e);
    };
    return FormBase;
}());

var stringCompiler = getTemplateEngine();
/**
 * Angular Template Compiler
 */
function compile(templateEle, helper) {
    if (typeof templateEle === 'string') {
        return stringCompiler(templateEle, helper);
    }
    else {
        var contRef_1 = templateEle.elementRef.nativeElement._viewContainerRef;
        var pName_1 = templateEle.elementRef.nativeElement.propName;
        //tslint:disable-next-line        
        return function (data, component, propName) {
            var context = { $implicit: data };
            var conRef = contRef_1 ? contRef_1 : component.viewContainerRef;
            var viewRef = conRef.createEmbeddedView(templateEle, context);
            var viewCollection = component ?
                component.registeredTemplate : getValue('currentInstance.registeredTemplate', conRef);
            propName = propName ? propName : pName_1;
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
function Template(defaultValue) {
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
//tslint:disable-next-line
setTemplateEngine({ compile: compile });

/**
 * Index
 */

export { ComplexBase, ArrayBase, ComponentBase, FormBase, applyMixins, clearTemplate, setValue$1 as setValue, compile, Template };
//# sourceMappingURL=ej2-ng-base.es5.js.map