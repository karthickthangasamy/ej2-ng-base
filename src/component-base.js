define(["require", "exports", "@syncfusion/ej2-base/util", "@angular/core"], function (require, exports, util_1, core_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ComponentBase = (function () {
        function ComponentBase() {
        }
        ComponentBase.prototype.ngOnInit = function () {
            this.tags = this.tags || [];
            this.tagObjects = [];
            for (var _i = 0, _a = this.tags; _i < _a.length; _i++) {
                var tag = _a[_i];
                var tagObject = {
                    instance: util_1.getValue('child' + tag.substring(0, 1).toUpperCase() + tag.substring(1), this),
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
                if (!util_1.isUndefined(tagObject.instance) && tagObject.instance.hasChanges) {
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
                                util_1.getValue(tagObject.name, this)[curIndex].setProperties(list.getProperties());
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
                util_1.getValue(prop, this_1);
                Object.defineProperty(this_1, prop, {
                    get: function () {
                        return util_1.getValue(prop, _this.properties);
                    },
                    set: function (newVal) {
                        var oldVal = util_1.getValue(prop, _this.properties);
                        if (oldVal === newVal) {
                            return;
                        }
                        _this.saveChanges(prop, newVal, oldVal);
                        util_1.setValue(prop, (util_1.isNullOrUndefined(newVal) ? null : newVal), _this.properties);
                        util_1.getValue(prop + 'Change', _this).emit(newVal);
                    }
                });
                util_1.setValue(prop + 'Change', new core_1.EventEmitter(), this_1);
            };
            var this_1 = this;
            for (var _i = 0, propList_1 = propList; _i < propList_1.length; _i++) {
                var prop = propList_1[_i];
                _loop_1(prop);
            }
        };
        ComponentBase.prototype.trigger = function (eventName, eventArgs) {
            var eventObj = util_1.getValue(eventName, this);
            if (!util_1.isUndefined(eventObj)) {
                eventObj.next(eventArgs);
            }
            var localEventObj = util_1.getValue('local' + eventName.charAt(0).toUpperCase() + eventName.slice(1), this);
            if (!util_1.isUndefined(localEventObj)) {
                localEventObj.call(this, eventArgs);
            }
        };
        return ComponentBase;
    }());
    exports.ComponentBase = ComponentBase;
});
