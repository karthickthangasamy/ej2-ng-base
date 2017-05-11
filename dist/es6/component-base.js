import { getValue, isUndefined, setValue, isNullOrUndefined } from '@syncfusion/ej2-base/util';
import { EventEmitter } from '@angular/core';
var ComponentBase = (function () {
    function ComponentBase() {
    }
    ComponentBase.prototype.ngOnInit = function () {
        this.tags = this.tags || [];
        this.tagObjects = [];
        for (var _i = 0, _a = this.tags; _i < _a.length; _i++) {
            var tag = _a[_i];
            var tagObject = {
                instance: getValue('child' + tag.substring(0, 1).toUpperCase() + tag.substring(1), this),
                name: tag
            };
            this.tagObjects.push(tagObject);
        }
    };
    ComponentBase.prototype.ngAfterViewInit = function () {
        this.appendTo(this.element);
    };
    ComponentBase.prototype.ngOnDestroy = function () {
        this.destroy();
    };
    ComponentBase.prototype.ngAfterContentChecked = function () {
        for (var _i = 0, _a = this.tagObjects; _i < _a.length; _i++) {
            var tagObject = _a[_i];
            if (!isUndefined(tagObject.instance) && tagObject.instance.hasChanges) {
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
export { ComponentBase };
