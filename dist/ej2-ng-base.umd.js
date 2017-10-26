/*!
*  filename: ej2-ng-base.umd.js
*  version : 1.0.25
*  Copyright Syncfusion Inc. 2001 - 2017. All rights reserved.
*  Use of this code is subject to the terms of our license.
*  A copy of the current license can be obtained at any time by e-mailing
*  licensing@syncfusion.com. Any infringement will be prosecuted under
*  applicable laws. 
*/

(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("@syncfusion/ej2-base"), require("@angular/core"));
	else if(typeof define === 'function' && define.amd)
		define(["@syncfusion/ej2-base", "@angular/core"], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("@syncfusion/ej2-base"), require("@angular/core")) : factory(root["@syncfusion/ej2-base"], root["@angular/core"]);
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function(__WEBPACK_EXTERNAL_MODULE_2__, __WEBPACK_EXTERNAL_MODULE_5__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports, __webpack_require__(1), __webpack_require__(4), __webpack_require__(6), __webpack_require__(3), __webpack_require__(7)], __WEBPACK_AMD_DEFINE_RESULT__ = function (require, exports, complex_array_base_1, component_base_1, form_base_1, util_1, template_1) {
	    "use strict";
	    function __export(m) {
	        for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	    }
	    Object.defineProperty(exports, "__esModule", { value: true });
	    __export(complex_array_base_1);
	    __export(component_base_1);
	    __export(form_base_1);
	    __export(util_1);
	    __export(template_1);
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports, __webpack_require__(2), __webpack_require__(3)], __WEBPACK_AMD_DEFINE_RESULT__ = function (require, exports, ej2_base_1, util_1) {
	    "use strict";
	    Object.defineProperty(exports, "__esModule", { value: true });
	    var ComplexBase = (function () {
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
	                var objInstance = ej2_base_1.getValue('child' + tag.substring(0, 1).toUpperCase() + tag.substring(1), this);
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
	                ej2_base_1.setValue(propName.replace('_', '.'), ej2_base_1.getValue(propName, this), this.propCollection);
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
	            util_1.clearTemplate(this, templateNames);
	        };
	        ;
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
	    exports.ComplexBase = ComplexBase;
	    var ArrayBase = (function () {
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
	    exports.ArrayBase = ArrayBase;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),
/* 2 */
/***/ (function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports], __WEBPACK_AMD_DEFINE_RESULT__ = function (require, exports) {
	    "use strict";
	    Object.defineProperty(exports, "__esModule", { value: true });
	    function applyMixins(derivedClass, baseClass) {
	        baseClass.forEach(function (baseClass) {
	            Object.getOwnPropertyNames(baseClass.prototype).forEach(function (name) {
	                derivedClass.prototype[name] = baseClass.prototype[name];
	            });
	        });
	    }
	    exports.applyMixins = applyMixins;
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
	    exports.clearTemplate = clearTemplate;
	    function setValue(nameSpace, value, object) {
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
	    exports.setValue = setValue;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports, __webpack_require__(2), __webpack_require__(5), __webpack_require__(3)], __WEBPACK_AMD_DEFINE_RESULT__ = function (require, exports, ej2_base_1, core_1, util_1) {
	    "use strict";
	    Object.defineProperty(exports, "__esModule", { value: true });
	    var ComponentBase = (function () {
	        function ComponentBase() {
	        }
	        ComponentBase.prototype.ngOnInit = function () {
	            this.registeredTemplate = {};
	            this.tags = this.tags || [];
	            this.complexTemplate = this.complexTemplate || [];
	            this.tagObjects = [];
	            for (var _i = 0, _a = this.tags; _i < _a.length; _i++) {
	                var tag = _a[_i];
	                var tagObject = {
	                    instance: ej2_base_1.getValue('child' + tag.substring(0, 1).toUpperCase() + tag.substring(1), this),
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
	                ej2_base_1.setValue(propName.replace('_', '.'), ej2_base_1.getValue(propName, this), val);
	                this.setProperties(val, true);
	            }
	        };
	        ComponentBase.prototype.ngAfterViewInit = function () {
	            var _this = this;
	            setTimeout(function () {
	                _this.appendTo(_this.element);
	            });
	        };
	        ComponentBase.prototype.ngOnDestroy = function () {
	            this.destroy();
	            this.clearTemplate(null);
	        };
	        ComponentBase.prototype.clearTemplate = function (templateNames) {
	            util_1.clearTemplate(this, templateNames);
	        };
	        ;
	        ComponentBase.prototype.ngAfterContentChecked = function () {
	            for (var _i = 0, _a = this.tagObjects; _i < _a.length; _i++) {
	                var tagObject = _a[_i];
	                if (!ej2_base_1.isUndefined(tagObject.instance) && tagObject.instance.hasChanges) {
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
	                                ej2_base_1.getValue(tagObject.name, this)[curIndex].setProperties(list.getProperties());
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
	                    ngEventsEmitter[event_1] = new core_1.EventEmitter(false);
	                }
	                this.setProperties(ngEventsEmitter, true);
	            }
	        };
	        ComponentBase.prototype.addTwoWay = function (propList) {
	            var _this = this;
	            var _loop_1 = function (prop) {
	                ej2_base_1.getValue(prop, this_1);
	                Object.defineProperty(this_1, prop, {
	                    get: function () {
	                        return ej2_base_1.getValue(prop, _this.properties);
	                    },
	                    set: function (newVal) {
	                        var oldVal = ej2_base_1.getValue(prop, _this.properties);
	                        if (oldVal === newVal) {
	                            return;
	                        }
	                        _this.saveChanges(prop, newVal, oldVal);
	                        ej2_base_1.setValue(prop, (ej2_base_1.isNullOrUndefined(newVal) ? null : newVal), _this.properties);
	                        ej2_base_1.getValue(prop + 'Change', _this).emit(newVal);
	                    }
	                });
	                ej2_base_1.setValue(prop + 'Change', new core_1.EventEmitter(), this_1);
	            };
	            var this_1 = this;
	            for (var _i = 0, propList_1 = propList; _i < propList_1.length; _i++) {
	                var prop = propList_1[_i];
	                _loop_1(prop);
	            }
	        };
	        ComponentBase.prototype.trigger = function (eventName, eventArgs) {
	            var eventObj = ej2_base_1.getValue(eventName, this);
	            if (!ej2_base_1.isUndefined(eventObj)) {
	                eventObj.next(eventArgs);
	            }
	            var localEventObj = ej2_base_1.getValue('local' + eventName.charAt(0).toUpperCase() + eventName.slice(1), this);
	            if (!ej2_base_1.isUndefined(localEventObj)) {
	                localEventObj.call(this, eventArgs);
	            }
	        };
	        return ComponentBase;
	    }());
	    exports.ComponentBase = ComponentBase;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),
/* 5 */
/***/ (function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_5__;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports], __WEBPACK_AMD_DEFINE_RESULT__ = function (require, exports) {
	    "use strict";
	    Object.defineProperty(exports, "__esModule", { value: true });
	    var FormBase = (function () {
	        function FormBase() {
	        }
	        FormBase.prototype.localChange = function (e) {
	            if (this.propagateChange !== undefined) {
	                this.propagateChange((e.checked === undefined ? e.value : e.checked));
	            }
	        };
	        FormBase.prototype.registerOnChange = function (registerFunction) {
	            this.propagateChange = registerFunction;
	        };
	        FormBase.prototype.registerOnTouched = function (registerFunction) {
	            this.propagateTouch = registerFunction;
	        };
	        FormBase.prototype.ngAfterViewInit = function () {
	            this.appendTo(this.element);
	            if (this.ngEle.nativeElement.nodeName.toLowerCase() !== 'input') {
	                this.element.addEventListener('focus', this.ngOnFocus.bind(this));
	                this.element.addEventListener('blur', this.ngOnBlur.bind(this));
	            }
	        };
	        FormBase.prototype.writeValue = function (value) {
	            this.value = value;
	        };
	        FormBase.prototype.ngOnFocus = function (e) {
	            this.focus.emit(e);
	        };
	        FormBase.prototype.ngOnBlur = function (e) {
	            this.blur.emit(e);
	        };
	        return FormBase;
	    }());
	    exports.FormBase = FormBase;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports, __webpack_require__(2), __webpack_require__(2)], __WEBPACK_AMD_DEFINE_RESULT__ = function (require, exports, ej2_base_1, ej2_base_2) {
	    "use strict";
	    Object.defineProperty(exports, "__esModule", { value: true });
	    var stringCompiler = ej2_base_1.getTemplateEngine();
	    function compile(templateEle, helper) {
	        if (typeof templateEle === 'string') {
	            return stringCompiler(templateEle, helper);
	        }
	        else {
	            var contRef_1 = templateEle.elementRef.nativeElement._viewContainerRef;
	            var pName_1 = templateEle.elementRef.nativeElement.propName;
	            return function (data, component, propName) {
	                var context = { $implicit: data };
	                var conRef = contRef_1 ? contRef_1 : component.viewContainerRef;
	                var viewRef = conRef.createEmbeddedView(templateEle, context);
	                var viewCollection = component ?
	                    component.registeredTemplate : ej2_base_2.getValue('currentInstance.registeredTemplate', conRef);
	                propName = propName ? propName : pName_1;
	                if (typeof viewCollection[propName] === 'undefined') {
	                    viewCollection[propName] = [];
	                }
	                viewCollection[propName].push(viewRef);
	                return viewRef.rootNodes;
	            };
	        }
	    }
	    exports.compile = compile;
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
	    exports.Template = Template;
	    function setter(key) {
	        return function (val) {
	            if (val === undefined) {
	                return;
	            }
	            ej2_base_2.setValue(key + 'Ref', val, this);
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
	            return ej2_base_2.getValue(key + 'Ref', this) || defaultValue;
	        };
	    }
	    ej2_base_1.setTemplateEngine({ compile: compile });
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ })
/******/ ])
});
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCBjYWY5YzA2YThjYzA4MjdkYjNmNSIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBsZXgtYXJyYXktYmFzZS5qcyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJAc3luY2Z1c2lvbi9lajItYmFzZVwiIiwid2VicGFjazovLy8uL3NyYy91dGlsLmpzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnQtYmFzZS5qcyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJAYW5ndWxhci9jb3JlXCIiLCJ3ZWJwYWNrOi8vLy4vc3JjL2Zvcm0tYmFzZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdGVtcGxhdGUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNELE87QUNWQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1QkFBZTtBQUNmO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7O2lFQ3RDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbURBQWtELGNBQWM7QUFDaEU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUM7Ozs7Ozs7aUVDWEQ7QUFDQTtBQUNBLG1EQUFrRCxjQUFjO0FBQ2hFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZDQUE0QyxnQkFBZ0I7QUFDNUQ7QUFDQTtBQUNBO0FBQ0EsMkNBQTBDLG1DQUFtQztBQUM3RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYTtBQUNiLHdFQUF1RSxrQ0FBa0M7QUFDekc7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0RBQXVELGdCQUFnQjtBQUN2RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbURBQWtELGdCQUFnQjtBQUNsRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1EQUFrRCxnQkFBZ0I7QUFDbEU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkNBQTRDLGdCQUFnQjtBQUM1RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZDQUE0QyxnQkFBZ0I7QUFDNUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2Q0FBNEMsZ0JBQWdCO0FBQzVEO0FBQ0E7QUFDQTtBQUNBLGtCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQSxFQUFDOzs7Ozs7O0FDMUhELGdEOzs7Ozs7aUVDQUE7QUFDQTtBQUNBLG1EQUFrRCxjQUFjO0FBQ2hFO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYTtBQUNiLFVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWE7QUFDYixvRkFBbUYsZ0JBQWdCO0FBQ25HO0FBQ0Esb0ZBQW1GLGdCQUFnQjtBQUNuRztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBaUI7QUFDakI7QUFDQTtBQUNBLGdEQUErQyxnQkFBZ0I7QUFDL0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUF1QixpQkFBaUI7QUFDeEM7QUFDQTtBQUNBLHdEQUF1RDtBQUN2RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFDOzs7Ozs7O2lFQ3pERDtBQUNBO0FBQ0EsbURBQWtELGNBQWM7QUFDaEU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZDQUE0QyxnQkFBZ0I7QUFDNUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFhO0FBQ2Isb0VBQW1FLGdDQUFnQztBQUNuRztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbURBQWtELGdCQUFnQjtBQUNsRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUVBQXNFLGdCQUFnQjtBQUN0RjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBEQUF5RCx5QkFBeUI7QUFDbEY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQkFBcUI7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBLG9EQUFtRCx3QkFBd0I7QUFDM0U7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0EsRUFBQzs7Ozs7OztBQ25IRCxnRDs7Ozs7O2lFQ0FBO0FBQ0E7QUFDQSxtREFBa0QsY0FBYztBQUNoRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBLEVBQUM7Ozs7Ozs7aUVDcENEO0FBQ0E7QUFDQSxtREFBa0QsY0FBYztBQUNoRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQ0FBK0I7QUFDL0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBa0MsbUJBQW1CO0FBQ3JELEVBQUMiLCJmaWxlIjoiZWoyLW5nLWJhc2UudW1kLmpzIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeShyZXF1aXJlKFwiQHN5bmNmdXNpb24vZWoyLWJhc2VcIiksIHJlcXVpcmUoXCJAYW5ndWxhci9jb3JlXCIpKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFtcIkBzeW5jZnVzaW9uL2VqMi1iYXNlXCIsIFwiQGFuZ3VsYXIvY29yZVwiXSwgZmFjdG9yeSk7XG5cdGVsc2Uge1xuXHRcdHZhciBhID0gdHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnID8gZmFjdG9yeShyZXF1aXJlKFwiQHN5bmNmdXNpb24vZWoyLWJhc2VcIiksIHJlcXVpcmUoXCJAYW5ndWxhci9jb3JlXCIpKSA6IGZhY3Rvcnkocm9vdFtcIkBzeW5jZnVzaW9uL2VqMi1iYXNlXCJdLCByb290W1wiQGFuZ3VsYXIvY29yZVwiXSk7XG5cdFx0Zm9yKHZhciBpIGluIGEpICh0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgPyBleHBvcnRzIDogcm9vdClbaV0gPSBhW2ldO1xuXHR9XG59KSh0aGlzLCBmdW5jdGlvbihfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzJfXywgX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV81X18pIHtcbnJldHVybiBcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGlkOiBtb2R1bGVJZCxcbiBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgY2FmOWMwNmE4Y2MwODI3ZGIzZjUiLCJkZWZpbmUoW1wicmVxdWlyZVwiLCBcImV4cG9ydHNcIiwgXCIuL2NvbXBsZXgtYXJyYXktYmFzZVwiLCBcIi4vY29tcG9uZW50LWJhc2VcIiwgXCIuL2Zvcm0tYmFzZVwiLCBcIi4vdXRpbFwiLCBcIi4vdGVtcGxhdGVcIl0sIGZ1bmN0aW9uIChyZXF1aXJlLCBleHBvcnRzLCBjb21wbGV4X2FycmF5X2Jhc2VfMSwgY29tcG9uZW50X2Jhc2VfMSwgZm9ybV9iYXNlXzEsIHV0aWxfMSwgdGVtcGxhdGVfMSkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuICAgIGZ1bmN0aW9uIF9fZXhwb3J0KG0pIHtcbiAgICAgICAgZm9yICh2YXIgcCBpbiBtKSBpZiAoIWV4cG9ydHMuaGFzT3duUHJvcGVydHkocCkpIGV4cG9ydHNbcF0gPSBtW3BdO1xuICAgIH1cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG4gICAgX19leHBvcnQoY29tcGxleF9hcnJheV9iYXNlXzEpO1xuICAgIF9fZXhwb3J0KGNvbXBvbmVudF9iYXNlXzEpO1xuICAgIF9fZXhwb3J0KGZvcm1fYmFzZV8xKTtcbiAgICBfX2V4cG9ydCh1dGlsXzEpO1xuICAgIF9fZXhwb3J0KHRlbXBsYXRlXzEpO1xufSk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9pbmRleC5qc1xuLy8gbW9kdWxlIGlkID0gMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJkZWZpbmUoW1wicmVxdWlyZVwiLCBcImV4cG9ydHNcIiwgXCJAc3luY2Z1c2lvbi9lajItYmFzZVwiLCBcIi4vdXRpbFwiXSwgZnVuY3Rpb24gKHJlcXVpcmUsIGV4cG9ydHMsIGVqMl9iYXNlXzEsIHV0aWxfMSkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbiAgICB2YXIgQ29tcGxleEJhc2UgPSAoZnVuY3Rpb24gKCkge1xuICAgICAgICBmdW5jdGlvbiBDb21wbGV4QmFzZSgpIHtcbiAgICAgICAgICAgIHRoaXMuaGFzQ2hhbmdlcyA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5wcm9wQ29sbGVjdGlvbiA9IHt9O1xuICAgICAgICAgICAgdGhpcy50YWdzID0gW107XG4gICAgICAgICAgICB0aGlzLnRhZ09iamVjdHMgPSBbXTtcbiAgICAgICAgfVxuICAgICAgICBDb21wbGV4QmFzZS5wcm90b3R5cGUubmdPbkluaXQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB0aGlzLnJlZ2lzdGVyZWRUZW1wbGF0ZSA9IHt9O1xuICAgICAgICAgICAgZm9yICh2YXIgX2kgPSAwLCBfYSA9IHRoaXMudGFnczsgX2kgPCBfYS5sZW5ndGg7IF9pKyspIHtcbiAgICAgICAgICAgICAgICB2YXIgdGFnID0gX2FbX2ldO1xuICAgICAgICAgICAgICAgIHZhciBvYmpJbnN0YW5jZSA9IGVqMl9iYXNlXzEuZ2V0VmFsdWUoJ2NoaWxkJyArIHRhZy5zdWJzdHJpbmcoMCwgMSkudG9VcHBlckNhc2UoKSArIHRhZy5zdWJzdHJpbmcoMSksIHRoaXMpO1xuICAgICAgICAgICAgICAgIGlmIChvYmpJbnN0YW5jZSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnRhZ09iamVjdHMucHVzaCh7IGluc3RhbmNlOiBvYmpJbnN0YW5jZSwgbmFtZTogdGFnIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZhciB0ZW1wbGF0ZVByb3BlcnRpZXMgPSBPYmplY3Qua2V5cyh0aGlzKTtcbiAgICAgICAgICAgIHRlbXBsYXRlUHJvcGVydGllcyA9IHRlbXBsYXRlUHJvcGVydGllcy5maWx0ZXIoZnVuY3Rpb24gKHZhbCkge1xuICAgICAgICAgICAgICAgIHJldHVybiAvUmVmJC9pLnRlc3QodmFsKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgZm9yICh2YXIgX2IgPSAwLCB0ZW1wbGF0ZVByb3BlcnRpZXNfMSA9IHRlbXBsYXRlUHJvcGVydGllczsgX2IgPCB0ZW1wbGF0ZVByb3BlcnRpZXNfMS5sZW5ndGg7IF9iKyspIHtcbiAgICAgICAgICAgICAgICB2YXIgdGVtcE5hbWUgPSB0ZW1wbGF0ZVByb3BlcnRpZXNfMVtfYl07XG4gICAgICAgICAgICAgICAgdmFyIHByb3BOYW1lID0gdGVtcE5hbWUucmVwbGFjZSgnUmVmJywgJycpO1xuICAgICAgICAgICAgICAgIGVqMl9iYXNlXzEuc2V0VmFsdWUocHJvcE5hbWUucmVwbGFjZSgnXycsICcuJyksIGVqMl9iYXNlXzEuZ2V0VmFsdWUocHJvcE5hbWUsIHRoaXMpLCB0aGlzLnByb3BDb2xsZWN0aW9uKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgQ29tcGxleEJhc2UucHJvdG90eXBlLm5nT25DaGFuZ2VzID0gZnVuY3Rpb24gKGNoYW5nZXMpIHtcbiAgICAgICAgICAgIGZvciAodmFyIF9pID0gMCwgX2EgPSBPYmplY3Qua2V5cyhjaGFuZ2VzKTsgX2kgPCBfYS5sZW5ndGg7IF9pKyspIHtcbiAgICAgICAgICAgICAgICB2YXIgcHJvcE5hbWUgPSBfYVtfaV07XG4gICAgICAgICAgICAgICAgdmFyIGNoYW5nZWRWYWwgPSBjaGFuZ2VzW3Byb3BOYW1lXTtcbiAgICAgICAgICAgICAgICB0aGlzLnByb3BDb2xsZWN0aW9uW3Byb3BOYW1lXSA9IGNoYW5nZWRWYWwuY3VycmVudFZhbHVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5oYXNDaGFuZ2VzID0gdHJ1ZTtcbiAgICAgICAgfTtcbiAgICAgICAgQ29tcGxleEJhc2UucHJvdG90eXBlLmNsZWFyVGVtcGxhdGUgPSBmdW5jdGlvbiAodGVtcGxhdGVOYW1lcykge1xuICAgICAgICAgICAgdXRpbF8xLmNsZWFyVGVtcGxhdGUodGhpcywgdGVtcGxhdGVOYW1lcyk7XG4gICAgICAgIH07XG4gICAgICAgIDtcbiAgICAgICAgQ29tcGxleEJhc2UucHJvdG90eXBlLmdldFByb3BlcnRpZXMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBmb3IgKHZhciBfaSA9IDAsIF9hID0gdGhpcy50YWdPYmplY3RzOyBfaSA8IF9hLmxlbmd0aDsgX2krKykge1xuICAgICAgICAgICAgICAgIHZhciB0YWdPYmplY3QgPSBfYVtfaV07XG4gICAgICAgICAgICAgICAgdGhpcy5wcm9wQ29sbGVjdGlvblt0YWdPYmplY3QubmFtZV0gPSB0YWdPYmplY3QuaW5zdGFuY2UuZ2V0UHJvcGVydGllcygpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRoaXMucHJvcENvbGxlY3Rpb247XG4gICAgICAgIH07XG4gICAgICAgIENvbXBsZXhCYXNlLnByb3RvdHlwZS5pc0NoYW5nZWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgcmVzdWx0ID0gdGhpcy5oYXNDaGFuZ2VzO1xuICAgICAgICAgICAgZm9yICh2YXIgX2kgPSAwLCBfYSA9IHRoaXMudGFnT2JqZWN0czsgX2kgPCBfYS5sZW5ndGg7IF9pKyspIHtcbiAgICAgICAgICAgICAgICB2YXIgaXRlbSA9IF9hW19pXTtcbiAgICAgICAgICAgICAgICByZXN1bHQgPSByZXN1bHQgfHwgaXRlbS5pbnN0YW5jZS5oYXNDaGFuZ2VzO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgfTtcbiAgICAgICAgQ29tcGxleEJhc2UucHJvdG90eXBlLm5nQWZ0ZXJDb250ZW50Q2hlY2tlZCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHRoaXMuaGFzQ2hhbmdlcyA9IHRoaXMuaXNDaGFuZ2VkKCk7XG4gICAgICAgICAgICB2YXIgdGVtcGxhdGVQcm9wZXJ0aWVzID0gT2JqZWN0LmtleXModGhpcyk7XG4gICAgICAgICAgICB0ZW1wbGF0ZVByb3BlcnRpZXMgPSB0ZW1wbGF0ZVByb3BlcnRpZXMuZmlsdGVyKGZ1bmN0aW9uICh2YWwpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gL1JlZiQvaS50ZXN0KHZhbCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfTtcbiAgICAgICAgQ29tcGxleEJhc2UucHJvdG90eXBlLm5nQWZ0ZXJWaWV3Q2hlY2tlZCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHRoaXMuaGFzQ2hhbmdlcyA9IGZhbHNlO1xuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gQ29tcGxleEJhc2U7XG4gICAgfSgpKTtcbiAgICBleHBvcnRzLkNvbXBsZXhCYXNlID0gQ29tcGxleEJhc2U7XG4gICAgdmFyIEFycmF5QmFzZSA9IChmdW5jdGlvbiAoKSB7XG4gICAgICAgIGZ1bmN0aW9uIEFycmF5QmFzZShwcm9wZXJ0eU5hbWUpIHtcbiAgICAgICAgICAgIHRoaXMubGlzdCA9IFtdO1xuICAgICAgICAgICAgdGhpcy5oYXNDaGFuZ2VzID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLnByb3BlcnR5TmFtZSA9IHByb3BlcnR5TmFtZTtcbiAgICAgICAgfVxuICAgICAgICBBcnJheUJhc2UucHJvdG90eXBlLm5nT25Jbml0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdGhpcy5pc0luaXRDaGFuZ2VzID0gdHJ1ZTtcbiAgICAgICAgfTtcbiAgICAgICAgQXJyYXlCYXNlLnByb3RvdHlwZS5uZ0FmdGVyQ29udGVudEluaXQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICAgICAgdmFyIGluZGV4ID0gMDtcbiAgICAgICAgICAgIHRoaXMubGlzdCA9IHRoaXMuY2hpbGRyZW4ubWFwKGZ1bmN0aW9uIChjaGlsZCkge1xuICAgICAgICAgICAgICAgIGNoaWxkLmluZGV4ID0gaW5kZXgrKztcbiAgICAgICAgICAgICAgICBjaGlsZC5wcm9wZXJ0eSA9IF90aGlzLnByb3BlcnR5TmFtZTtcbiAgICAgICAgICAgICAgICByZXR1cm4gY2hpbGQ7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHRoaXMuaGFzQ2hhbmdlcyA9IHRydWU7XG4gICAgICAgIH07XG4gICAgICAgIEFycmF5QmFzZS5wcm90b3R5cGUuZ2V0UHJvcGVydGllcyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBvbmx5UHJvcCA9IFtdO1xuICAgICAgICAgICAgZm9yICh2YXIgX2kgPSAwLCBfYSA9IHRoaXMubGlzdDsgX2kgPCBfYS5sZW5ndGg7IF9pKyspIHtcbiAgICAgICAgICAgICAgICB2YXIgaXRlbSA9IF9hW19pXTtcbiAgICAgICAgICAgICAgICBvbmx5UHJvcC5wdXNoKGl0ZW0uZ2V0UHJvcGVydGllcygpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBvbmx5UHJvcDtcbiAgICAgICAgfTtcbiAgICAgICAgQXJyYXlCYXNlLnByb3RvdHlwZS5pc0NoYW5nZWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgcmVzdWx0ID0gZmFsc2U7XG4gICAgICAgICAgICBmb3IgKHZhciBfaSA9IDAsIF9hID0gdGhpcy5saXN0OyBfaSA8IF9hLmxlbmd0aDsgX2krKykge1xuICAgICAgICAgICAgICAgIHZhciBpdGVtID0gX2FbX2ldO1xuICAgICAgICAgICAgICAgIHJlc3VsdCA9IHJlc3VsdCB8fCBpdGVtLmhhc0NoYW5nZXM7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gISF0aGlzLmxpc3QubGVuZ3RoICYmIHJlc3VsdDtcbiAgICAgICAgfTtcbiAgICAgICAgQXJyYXlCYXNlLnByb3RvdHlwZS5jbGVhclRlbXBsYXRlID0gZnVuY3Rpb24gKHRlbXBsYXRlTmFtZXMpIHtcbiAgICAgICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgICAgICBmb3IgKHZhciBfaSA9IDAsIF9hID0gdGhpcy5saXN0OyBfaSA8IF9hLmxlbmd0aDsgX2krKykge1xuICAgICAgICAgICAgICAgIHZhciBpdGVtID0gX2FbX2ldO1xuICAgICAgICAgICAgICAgIGl0ZW0uY2xlYXJUZW1wbGF0ZSh0ZW1wbGF0ZU5hbWVzICYmIHRlbXBsYXRlTmFtZXMubWFwKGZ1bmN0aW9uICh2YWwpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBSZWdFeHAoX3RoaXMucHJvcGVydHlOYW1lKS50ZXN0KHZhbCkgPyB2YWwucmVwbGFjZShfdGhpcy5wcm9wZXJ0eU5hbWUgKyAnLicsICcnKSA6IHZhbDtcbiAgICAgICAgICAgICAgICB9KSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIEFycmF5QmFzZS5wcm90b3R5cGUubmdBZnRlckNvbnRlbnRDaGVja2VkID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdGhpcy5oYXNDaGFuZ2VzID0gdGhpcy5pc0NoYW5nZWQoKTtcbiAgICAgICAgfTtcbiAgICAgICAgQXJyYXlCYXNlLnByb3RvdHlwZS5uZ0FmdGVyVmlld0luaXQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB0aGlzLmlzSW5pdENoYW5nZXMgPSBmYWxzZTtcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIEFycmF5QmFzZTtcbiAgICB9KCkpO1xuICAgIGV4cG9ydHMuQXJyYXlCYXNlID0gQXJyYXlCYXNlO1xufSk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9jb21wbGV4LWFycmF5LWJhc2UuanNcbi8vIG1vZHVsZSBpZCA9IDFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzJfXztcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcIkBzeW5jZnVzaW9uL2VqMi1iYXNlXCJcbi8vIG1vZHVsZSBpZCA9IDJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiZGVmaW5lKFtcInJlcXVpcmVcIiwgXCJleHBvcnRzXCJdLCBmdW5jdGlvbiAocmVxdWlyZSwgZXhwb3J0cykge1xuICAgIFwidXNlIHN0cmljdFwiO1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbiAgICBmdW5jdGlvbiBhcHBseU1peGlucyhkZXJpdmVkQ2xhc3MsIGJhc2VDbGFzcykge1xuICAgICAgICBiYXNlQ2xhc3MuZm9yRWFjaChmdW5jdGlvbiAoYmFzZUNsYXNzKSB7XG4gICAgICAgICAgICBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhiYXNlQ2xhc3MucHJvdG90eXBlKS5mb3JFYWNoKGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgICAgICAgICAgICAgZGVyaXZlZENsYXNzLnByb3RvdHlwZVtuYW1lXSA9IGJhc2VDbGFzcy5wcm90b3R5cGVbbmFtZV07XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGV4cG9ydHMuYXBwbHlNaXhpbnMgPSBhcHBseU1peGlucztcbiAgICBmdW5jdGlvbiBjbGVhclRlbXBsYXRlKF90aGlzLCB0ZW1wbGF0ZU5hbWVzKSB7XG4gICAgICAgIHZhciByZWdUZW1wbGF0ZXMgPSBPYmplY3Qua2V5cyhfdGhpcy5yZWdpc3RlcmVkVGVtcGxhdGUpO1xuICAgICAgICBpZiAocmVnVGVtcGxhdGVzLmxlbmd0aCkge1xuICAgICAgICAgICAgdmFyIHJlZ1Byb3BlcnRpZXMgPSB0ZW1wbGF0ZU5hbWVzICYmIHRlbXBsYXRlTmFtZXMuZmlsdGVyKGZ1bmN0aW9uICh2YWwpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gKC9cXC4vZy50ZXN0KHZhbCkgPyBmYWxzZSA6IHRydWUpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBmb3IgKHZhciBfaSA9IDAsIF9hID0gKHJlZ1Byb3BlcnRpZXMgJiYgcmVnUHJvcGVydGllcyB8fCByZWdUZW1wbGF0ZXMpOyBfaSA8IF9hLmxlbmd0aDsgX2krKykge1xuICAgICAgICAgICAgICAgIHZhciByZWdpc3RlcmVkVGVtcGxhdGUgPSBfYVtfaV07XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgX2IgPSAwLCBfYyA9IF90aGlzLnJlZ2lzdGVyZWRUZW1wbGF0ZVtyZWdpc3RlcmVkVGVtcGxhdGVdOyBfYiA8IF9jLmxlbmd0aDsgX2IrKykge1xuICAgICAgICAgICAgICAgICAgICB2YXIgcnQgPSBfY1tfYl07XG4gICAgICAgICAgICAgICAgICAgIGlmICghcnQuZGVzdHJveWVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBydC5kZXN0cm95KCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZGVsZXRlIF90aGlzLnJlZ2lzdGVyZWRUZW1wbGF0ZVtyZWdpc3RlcmVkVGVtcGxhdGVdO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHZhciBfbG9vcF8xID0gZnVuY3Rpb24gKHRhZ09iamVjdCkge1xuICAgICAgICAgICAgaWYgKHRhZ09iamVjdC5pbnN0YW5jZSkge1xuICAgICAgICAgICAgICAgIHRhZ09iamVjdC5pbnN0YW5jZS5jbGVhclRlbXBsYXRlKCh0ZW1wbGF0ZU5hbWVzICYmIHRlbXBsYXRlTmFtZXMuZmlsdGVyKGZ1bmN0aW9uICh2YWwpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIChuZXcgUmVnRXhwKHRhZ09iamVjdC5uYW1lKS50ZXN0KHZhbCkgPyB0cnVlIDogZmFsc2UpO1xuICAgICAgICAgICAgICAgIH0pKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIGZvciAodmFyIF9kID0gMCwgX2UgPSBfdGhpcy50YWdPYmplY3RzOyBfZCA8IF9lLmxlbmd0aDsgX2QrKykge1xuICAgICAgICAgICAgdmFyIHRhZ09iamVjdCA9IF9lW19kXTtcbiAgICAgICAgICAgIF9sb29wXzEodGFnT2JqZWN0KTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBleHBvcnRzLmNsZWFyVGVtcGxhdGUgPSBjbGVhclRlbXBsYXRlO1xuICAgIGZ1bmN0aW9uIHNldFZhbHVlKG5hbWVTcGFjZSwgdmFsdWUsIG9iamVjdCkge1xuICAgICAgICB2YXIga2V5cyA9IG5hbWVTcGFjZS5zcGxpdCgnLicpO1xuICAgICAgICB2YXIgZnJvbU9iaiA9IG9iamVjdCB8fCB7fTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBrZXlzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB2YXIga2V5ID0ga2V5c1tpXTtcbiAgICAgICAgICAgIGlmIChpICsgMSA9PT0ga2V5cy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICBmcm9tT2JqW2tleV0gPSB2YWx1ZSA9PT0gdW5kZWZpbmVkID8ge30gOiB2YWx1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGZyb21PYmpba2V5XSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgZnJvbU9ialtrZXldID0ge307XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmcm9tT2JqID0gZnJvbU9ialtrZXldO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmcm9tT2JqO1xuICAgIH1cbiAgICBleHBvcnRzLnNldFZhbHVlID0gc2V0VmFsdWU7XG59KTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL3V0aWwuanNcbi8vIG1vZHVsZSBpZCA9IDNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiZGVmaW5lKFtcInJlcXVpcmVcIiwgXCJleHBvcnRzXCIsIFwiQHN5bmNmdXNpb24vZWoyLWJhc2VcIiwgXCJAYW5ndWxhci9jb3JlXCIsIFwiLi91dGlsXCJdLCBmdW5jdGlvbiAocmVxdWlyZSwgZXhwb3J0cywgZWoyX2Jhc2VfMSwgY29yZV8xLCB1dGlsXzEpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG4gICAgdmFyIENvbXBvbmVudEJhc2UgPSAoZnVuY3Rpb24gKCkge1xuICAgICAgICBmdW5jdGlvbiBDb21wb25lbnRCYXNlKCkge1xuICAgICAgICB9XG4gICAgICAgIENvbXBvbmVudEJhc2UucHJvdG90eXBlLm5nT25Jbml0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdGhpcy5yZWdpc3RlcmVkVGVtcGxhdGUgPSB7fTtcbiAgICAgICAgICAgIHRoaXMudGFncyA9IHRoaXMudGFncyB8fCBbXTtcbiAgICAgICAgICAgIHRoaXMuY29tcGxleFRlbXBsYXRlID0gdGhpcy5jb21wbGV4VGVtcGxhdGUgfHwgW107XG4gICAgICAgICAgICB0aGlzLnRhZ09iamVjdHMgPSBbXTtcbiAgICAgICAgICAgIGZvciAodmFyIF9pID0gMCwgX2EgPSB0aGlzLnRhZ3M7IF9pIDwgX2EubGVuZ3RoOyBfaSsrKSB7XG4gICAgICAgICAgICAgICAgdmFyIHRhZyA9IF9hW19pXTtcbiAgICAgICAgICAgICAgICB2YXIgdGFnT2JqZWN0ID0ge1xuICAgICAgICAgICAgICAgICAgICBpbnN0YW5jZTogZWoyX2Jhc2VfMS5nZXRWYWx1ZSgnY2hpbGQnICsgdGFnLnN1YnN0cmluZygwLCAxKS50b1VwcGVyQ2FzZSgpICsgdGFnLnN1YnN0cmluZygxKSwgdGhpcyksXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IHRhZ1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgdGhpcy50YWdPYmplY3RzLnB1c2godGFnT2JqZWN0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZhciBjb21wbGV4VGVtcGxhdGVzID0gT2JqZWN0LmtleXModGhpcyk7XG4gICAgICAgICAgICBjb21wbGV4VGVtcGxhdGVzID0gY29tcGxleFRlbXBsYXRlcy5maWx0ZXIoZnVuY3Rpb24gKHZhbCkge1xuICAgICAgICAgICAgICAgIHJldHVybiAvUmVmJC9pLnRlc3QodmFsKSAmJiAvXFxfL2kudGVzdCh2YWwpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBmb3IgKHZhciBfYiA9IDAsIGNvbXBsZXhUZW1wbGF0ZXNfMSA9IGNvbXBsZXhUZW1wbGF0ZXM7IF9iIDwgY29tcGxleFRlbXBsYXRlc18xLmxlbmd0aDsgX2IrKykge1xuICAgICAgICAgICAgICAgIHZhciB0ZW1wTmFtZSA9IGNvbXBsZXhUZW1wbGF0ZXNfMVtfYl07XG4gICAgICAgICAgICAgICAgdmFyIHByb3BOYW1lID0gdGVtcE5hbWUucmVwbGFjZSgnUmVmJywgJycpO1xuICAgICAgICAgICAgICAgIHZhciB2YWwgPSB7fTtcbiAgICAgICAgICAgICAgICBlajJfYmFzZV8xLnNldFZhbHVlKHByb3BOYW1lLnJlcGxhY2UoJ18nLCAnLicpLCBlajJfYmFzZV8xLmdldFZhbHVlKHByb3BOYW1lLCB0aGlzKSwgdmFsKTtcbiAgICAgICAgICAgICAgICB0aGlzLnNldFByb3BlcnRpZXModmFsLCB0cnVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgQ29tcG9uZW50QmFzZS5wcm90b3R5cGUubmdBZnRlclZpZXdJbml0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIF90aGlzLmFwcGVuZFRvKF90aGlzLmVsZW1lbnQpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH07XG4gICAgICAgIENvbXBvbmVudEJhc2UucHJvdG90eXBlLm5nT25EZXN0cm95ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdGhpcy5kZXN0cm95KCk7XG4gICAgICAgICAgICB0aGlzLmNsZWFyVGVtcGxhdGUobnVsbCk7XG4gICAgICAgIH07XG4gICAgICAgIENvbXBvbmVudEJhc2UucHJvdG90eXBlLmNsZWFyVGVtcGxhdGUgPSBmdW5jdGlvbiAodGVtcGxhdGVOYW1lcykge1xuICAgICAgICAgICAgdXRpbF8xLmNsZWFyVGVtcGxhdGUodGhpcywgdGVtcGxhdGVOYW1lcyk7XG4gICAgICAgIH07XG4gICAgICAgIDtcbiAgICAgICAgQ29tcG9uZW50QmFzZS5wcm90b3R5cGUubmdBZnRlckNvbnRlbnRDaGVja2VkID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgZm9yICh2YXIgX2kgPSAwLCBfYSA9IHRoaXMudGFnT2JqZWN0czsgX2kgPCBfYS5sZW5ndGg7IF9pKyspIHtcbiAgICAgICAgICAgICAgICB2YXIgdGFnT2JqZWN0ID0gX2FbX2ldO1xuICAgICAgICAgICAgICAgIGlmICghZWoyX2Jhc2VfMS5pc1VuZGVmaW5lZCh0YWdPYmplY3QuaW5zdGFuY2UpICYmIHRhZ09iamVjdC5pbnN0YW5jZS5oYXNDaGFuZ2VzKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0YWdPYmplY3QuaW5zdGFuY2UuaXNJbml0Q2hhbmdlcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHByb3BPYmogPSB7fTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHByb3BPYmpbdGFnT2JqZWN0Lm5hbWVdID0gdGFnT2JqZWN0Lmluc3RhbmNlLmdldFByb3BlcnRpZXMoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0UHJvcGVydGllcyhwcm9wT2JqLCB0YWdPYmplY3QuaW5zdGFuY2UuaXNJbml0Q2hhbmdlcyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBfYiA9IDAsIF9jID0gdGFnT2JqZWN0Lmluc3RhbmNlLmxpc3Q7IF9iIDwgX2MubGVuZ3RoOyBfYisrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGxpc3QgPSBfY1tfYl07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGxpc3QuaGFzQ2hhbmdlcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgY3VySW5kZXggPSB0YWdPYmplY3QuaW5zdGFuY2UubGlzdC5pbmRleE9mKGxpc3QpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlajJfYmFzZV8xLmdldFZhbHVlKHRhZ09iamVjdC5uYW1lLCB0aGlzKVtjdXJJbmRleF0uc2V0UHJvcGVydGllcyhsaXN0LmdldFByb3BlcnRpZXMoKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICBDb21wb25lbnRCYXNlLnByb3RvdHlwZS5yZWdpc3RlckV2ZW50cyA9IGZ1bmN0aW9uIChldmVudExpc3QpIHtcbiAgICAgICAgICAgIHZhciBuZ0V2ZW50c0VtaXR0ZXIgPSB7fTtcbiAgICAgICAgICAgIGlmIChldmVudExpc3QgJiYgZXZlbnRMaXN0Lmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIGZvciAodmFyIF9pID0gMCwgZXZlbnRMaXN0XzEgPSBldmVudExpc3Q7IF9pIDwgZXZlbnRMaXN0XzEubGVuZ3RoOyBfaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBldmVudF8xID0gZXZlbnRMaXN0XzFbX2ldO1xuICAgICAgICAgICAgICAgICAgICBuZ0V2ZW50c0VtaXR0ZXJbZXZlbnRfMV0gPSBuZXcgY29yZV8xLkV2ZW50RW1pdHRlcihmYWxzZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMuc2V0UHJvcGVydGllcyhuZ0V2ZW50c0VtaXR0ZXIsIHRydWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICBDb21wb25lbnRCYXNlLnByb3RvdHlwZS5hZGRUd29XYXkgPSBmdW5jdGlvbiAocHJvcExpc3QpIHtcbiAgICAgICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgICAgICB2YXIgX2xvb3BfMSA9IGZ1bmN0aW9uIChwcm9wKSB7XG4gICAgICAgICAgICAgICAgZWoyX2Jhc2VfMS5nZXRWYWx1ZShwcm9wLCB0aGlzXzEpO1xuICAgICAgICAgICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzXzEsIHByb3AsIHtcbiAgICAgICAgICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZWoyX2Jhc2VfMS5nZXRWYWx1ZShwcm9wLCBfdGhpcy5wcm9wZXJ0aWVzKTtcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgc2V0OiBmdW5jdGlvbiAobmV3VmFsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgb2xkVmFsID0gZWoyX2Jhc2VfMS5nZXRWYWx1ZShwcm9wLCBfdGhpcy5wcm9wZXJ0aWVzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvbGRWYWwgPT09IG5ld1ZhbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLnNhdmVDaGFuZ2VzKHByb3AsIG5ld1ZhbCwgb2xkVmFsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVqMl9iYXNlXzEuc2V0VmFsdWUocHJvcCwgKGVqMl9iYXNlXzEuaXNOdWxsT3JVbmRlZmluZWQobmV3VmFsKSA/IG51bGwgOiBuZXdWYWwpLCBfdGhpcy5wcm9wZXJ0aWVzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVqMl9iYXNlXzEuZ2V0VmFsdWUocHJvcCArICdDaGFuZ2UnLCBfdGhpcykuZW1pdChuZXdWYWwpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgZWoyX2Jhc2VfMS5zZXRWYWx1ZShwcm9wICsgJ0NoYW5nZScsIG5ldyBjb3JlXzEuRXZlbnRFbWl0dGVyKCksIHRoaXNfMSk7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgdmFyIHRoaXNfMSA9IHRoaXM7XG4gICAgICAgICAgICBmb3IgKHZhciBfaSA9IDAsIHByb3BMaXN0XzEgPSBwcm9wTGlzdDsgX2kgPCBwcm9wTGlzdF8xLmxlbmd0aDsgX2krKykge1xuICAgICAgICAgICAgICAgIHZhciBwcm9wID0gcHJvcExpc3RfMVtfaV07XG4gICAgICAgICAgICAgICAgX2xvb3BfMShwcm9wKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgQ29tcG9uZW50QmFzZS5wcm90b3R5cGUudHJpZ2dlciA9IGZ1bmN0aW9uIChldmVudE5hbWUsIGV2ZW50QXJncykge1xuICAgICAgICAgICAgdmFyIGV2ZW50T2JqID0gZWoyX2Jhc2VfMS5nZXRWYWx1ZShldmVudE5hbWUsIHRoaXMpO1xuICAgICAgICAgICAgaWYgKCFlajJfYmFzZV8xLmlzVW5kZWZpbmVkKGV2ZW50T2JqKSkge1xuICAgICAgICAgICAgICAgIGV2ZW50T2JqLm5leHQoZXZlbnRBcmdzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZhciBsb2NhbEV2ZW50T2JqID0gZWoyX2Jhc2VfMS5nZXRWYWx1ZSgnbG9jYWwnICsgZXZlbnROYW1lLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgZXZlbnROYW1lLnNsaWNlKDEpLCB0aGlzKTtcbiAgICAgICAgICAgIGlmICghZWoyX2Jhc2VfMS5pc1VuZGVmaW5lZChsb2NhbEV2ZW50T2JqKSkge1xuICAgICAgICAgICAgICAgIGxvY2FsRXZlbnRPYmouY2FsbCh0aGlzLCBldmVudEFyZ3MpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gQ29tcG9uZW50QmFzZTtcbiAgICB9KCkpO1xuICAgIGV4cG9ydHMuQ29tcG9uZW50QmFzZSA9IENvbXBvbmVudEJhc2U7XG59KTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL2NvbXBvbmVudC1iYXNlLmpzXG4vLyBtb2R1bGUgaWQgPSA0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV81X187XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJAYW5ndWxhci9jb3JlXCJcbi8vIG1vZHVsZSBpZCA9IDVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiZGVmaW5lKFtcInJlcXVpcmVcIiwgXCJleHBvcnRzXCJdLCBmdW5jdGlvbiAocmVxdWlyZSwgZXhwb3J0cykge1xuICAgIFwidXNlIHN0cmljdFwiO1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbiAgICB2YXIgRm9ybUJhc2UgPSAoZnVuY3Rpb24gKCkge1xuICAgICAgICBmdW5jdGlvbiBGb3JtQmFzZSgpIHtcbiAgICAgICAgfVxuICAgICAgICBGb3JtQmFzZS5wcm90b3R5cGUubG9jYWxDaGFuZ2UgPSBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgaWYgKHRoaXMucHJvcGFnYXRlQ2hhbmdlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnByb3BhZ2F0ZUNoYW5nZSgoZS5jaGVja2VkID09PSB1bmRlZmluZWQgPyBlLnZhbHVlIDogZS5jaGVja2VkKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIEZvcm1CYXNlLnByb3RvdHlwZS5yZWdpc3Rlck9uQ2hhbmdlID0gZnVuY3Rpb24gKHJlZ2lzdGVyRnVuY3Rpb24pIHtcbiAgICAgICAgICAgIHRoaXMucHJvcGFnYXRlQ2hhbmdlID0gcmVnaXN0ZXJGdW5jdGlvbjtcbiAgICAgICAgfTtcbiAgICAgICAgRm9ybUJhc2UucHJvdG90eXBlLnJlZ2lzdGVyT25Ub3VjaGVkID0gZnVuY3Rpb24gKHJlZ2lzdGVyRnVuY3Rpb24pIHtcbiAgICAgICAgICAgIHRoaXMucHJvcGFnYXRlVG91Y2ggPSByZWdpc3RlckZ1bmN0aW9uO1xuICAgICAgICB9O1xuICAgICAgICBGb3JtQmFzZS5wcm90b3R5cGUubmdBZnRlclZpZXdJbml0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdGhpcy5hcHBlbmRUbyh0aGlzLmVsZW1lbnQpO1xuICAgICAgICAgICAgaWYgKHRoaXMubmdFbGUubmF0aXZlRWxlbWVudC5ub2RlTmFtZS50b0xvd2VyQ2FzZSgpICE9PSAnaW5wdXQnKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5lbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2ZvY3VzJywgdGhpcy5uZ09uRm9jdXMuYmluZCh0aGlzKSk7XG4gICAgICAgICAgICAgICAgdGhpcy5lbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2JsdXInLCB0aGlzLm5nT25CbHVyLmJpbmQodGhpcykpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICBGb3JtQmFzZS5wcm90b3R5cGUud3JpdGVWYWx1ZSA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xuICAgICAgICB9O1xuICAgICAgICBGb3JtQmFzZS5wcm90b3R5cGUubmdPbkZvY3VzID0gZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgIHRoaXMuZm9jdXMuZW1pdChlKTtcbiAgICAgICAgfTtcbiAgICAgICAgRm9ybUJhc2UucHJvdG90eXBlLm5nT25CbHVyID0gZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgIHRoaXMuYmx1ci5lbWl0KGUpO1xuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gRm9ybUJhc2U7XG4gICAgfSgpKTtcbiAgICBleHBvcnRzLkZvcm1CYXNlID0gRm9ybUJhc2U7XG59KTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL2Zvcm0tYmFzZS5qc1xuLy8gbW9kdWxlIGlkID0gNlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJkZWZpbmUoW1wicmVxdWlyZVwiLCBcImV4cG9ydHNcIiwgXCJAc3luY2Z1c2lvbi9lajItYmFzZVwiLCBcIkBzeW5jZnVzaW9uL2VqMi1iYXNlXCJdLCBmdW5jdGlvbiAocmVxdWlyZSwgZXhwb3J0cywgZWoyX2Jhc2VfMSwgZWoyX2Jhc2VfMikge1xuICAgIFwidXNlIHN0cmljdFwiO1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbiAgICB2YXIgc3RyaW5nQ29tcGlsZXIgPSBlajJfYmFzZV8xLmdldFRlbXBsYXRlRW5naW5lKCk7XG4gICAgZnVuY3Rpb24gY29tcGlsZSh0ZW1wbGF0ZUVsZSwgaGVscGVyKSB7XG4gICAgICAgIGlmICh0eXBlb2YgdGVtcGxhdGVFbGUgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICByZXR1cm4gc3RyaW5nQ29tcGlsZXIodGVtcGxhdGVFbGUsIGhlbHBlcik7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB2YXIgY29udFJlZl8xID0gdGVtcGxhdGVFbGUuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50Ll92aWV3Q29udGFpbmVyUmVmO1xuICAgICAgICAgICAgdmFyIHBOYW1lXzEgPSB0ZW1wbGF0ZUVsZS5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQucHJvcE5hbWU7XG4gICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24gKGRhdGEsIGNvbXBvbmVudCwgcHJvcE5hbWUpIHtcbiAgICAgICAgICAgICAgICB2YXIgY29udGV4dCA9IHsgJGltcGxpY2l0OiBkYXRhIH07XG4gICAgICAgICAgICAgICAgdmFyIGNvblJlZiA9IGNvbnRSZWZfMSA/IGNvbnRSZWZfMSA6IGNvbXBvbmVudC52aWV3Q29udGFpbmVyUmVmO1xuICAgICAgICAgICAgICAgIHZhciB2aWV3UmVmID0gY29uUmVmLmNyZWF0ZUVtYmVkZGVkVmlldyh0ZW1wbGF0ZUVsZSwgY29udGV4dCk7XG4gICAgICAgICAgICAgICAgdmFyIHZpZXdDb2xsZWN0aW9uID0gY29tcG9uZW50ID9cbiAgICAgICAgICAgICAgICAgICAgY29tcG9uZW50LnJlZ2lzdGVyZWRUZW1wbGF0ZSA6IGVqMl9iYXNlXzIuZ2V0VmFsdWUoJ2N1cnJlbnRJbnN0YW5jZS5yZWdpc3RlcmVkVGVtcGxhdGUnLCBjb25SZWYpO1xuICAgICAgICAgICAgICAgIHByb3BOYW1lID0gcHJvcE5hbWUgPyBwcm9wTmFtZSA6IHBOYW1lXzE7XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiB2aWV3Q29sbGVjdGlvbltwcm9wTmFtZV0gPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgICAgIHZpZXdDb2xsZWN0aW9uW3Byb3BOYW1lXSA9IFtdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB2aWV3Q29sbGVjdGlvbltwcm9wTmFtZV0ucHVzaCh2aWV3UmVmKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdmlld1JlZi5yb290Tm9kZXM7XG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgfVxuICAgIGV4cG9ydHMuY29tcGlsZSA9IGNvbXBpbGU7XG4gICAgZnVuY3Rpb24gVGVtcGxhdGUoZGVmYXVsdFZhbHVlKSB7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAodGFyZ2V0LCBrZXkpIHtcbiAgICAgICAgICAgIHZhciBwcm9wZXJ0eURlc2NyaXB0b3IgPSB7XG4gICAgICAgICAgICAgICAgc2V0OiBzZXR0ZXIoa2V5KSxcbiAgICAgICAgICAgICAgICBnZXQ6IGdldHRlcihrZXksIGRlZmF1bHRWYWx1ZSksXG4gICAgICAgICAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIHByb3BlcnR5RGVzY3JpcHRvcik7XG4gICAgICAgIH07XG4gICAgfVxuICAgIGV4cG9ydHMuVGVtcGxhdGUgPSBUZW1wbGF0ZTtcbiAgICBmdW5jdGlvbiBzZXR0ZXIoa2V5KSB7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAodmFsKSB7XG4gICAgICAgICAgICBpZiAodmFsID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlajJfYmFzZV8yLnNldFZhbHVlKGtleSArICdSZWYnLCB2YWwsIHRoaXMpO1xuICAgICAgICAgICAgaWYgKHR5cGVvZiB2YWwgIT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgICAgdmFsLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5fdmlld0NvbnRhaW5lclJlZiA9IHRoaXMudmlld0NvbnRhaW5lclJlZjtcbiAgICAgICAgICAgICAgICB2YWwuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LnByb3BOYW1lID0ga2V5O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuc2F2ZUNoYW5nZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zYXZlQ2hhbmdlcyhrZXksIHZhbCwgdW5kZWZpbmVkKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kYXRhQmluZCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICB9XG4gICAgZnVuY3Rpb24gZ2V0dGVyKGtleSwgZGVmYXVsdFZhbHVlKSB7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gZWoyX2Jhc2VfMi5nZXRWYWx1ZShrZXkgKyAnUmVmJywgdGhpcykgfHwgZGVmYXVsdFZhbHVlO1xuICAgICAgICB9O1xuICAgIH1cbiAgICBlajJfYmFzZV8xLnNldFRlbXBsYXRlRW5naW5lKHsgY29tcGlsZTogY29tcGlsZSB9KTtcbn0pO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvdGVtcGxhdGUuanNcbi8vIG1vZHVsZSBpZCA9IDdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIl0sInNvdXJjZVJvb3QiOiIifQ==