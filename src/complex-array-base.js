define(["require", "exports", "@syncfusion/ej2-base/util"], function (require, exports, util_1) {
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
            for (var _i = 0, _a = this.tags; _i < _a.length; _i++) {
                var tag = _a[_i];
                var objInstance = util_1.getValue('child' + tag.substring(0, 1).toUpperCase() + tag.substring(1), this);
                if (objInstance) {
                    this.tagObjects.push({ instance: objInstance, name: tag });
                }
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
        ComplexBase.prototype.getProperties = function () {
            for (var _i = 0, _a = this.tagObjects; _i < _a.length; _i++) {
                var tagObject = _a[_i];
                this.propCollection[tagObject.name] = tagObject.instance.getProperties();
            }
            return this.propCollection;
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
        ArrayBase.prototype.ngAfterContentChecked = function () {
            this.hasChanges = this.isChanged();
        };
        ArrayBase.prototype.ngAfterViewInit = function () {
            this.isInitChanges = false;
        };
        return ArrayBase;
    }());
    exports.ArrayBase = ArrayBase;
});
