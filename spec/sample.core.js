var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
define(["require", "exports", "@syncfusion/ej2-base"], function (require, exports, ej2_base_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var SubChildProp = (function (_super) {
        __extends(SubChildProp, _super);
        function SubChildProp() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return SubChildProp;
    }(ej2_base_1.ChildProperty));
    __decorate([
        ej2_base_1.Property('Child')
    ], SubChildProp.prototype, "text", void 0);
    __decorate([
        ej2_base_1.Property(true)
    ], SubChildProp.prototype, "header", void 0);
    exports.SubChildProp = SubChildProp;
    var ChildProp = (function (_super) {
        __extends(ChildProp, _super);
        function ChildProp() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return ChildProp;
    }(ej2_base_1.ChildProperty));
    __decorate([
        ej2_base_1.Property('Child')
    ], ChildProp.prototype, "text", void 0);
    __decorate([
        ej2_base_1.Property(true)
    ], ChildProp.prototype, "header", void 0);
    __decorate([
        ej2_base_1.Collection([], SubChildProp)
    ], ChildProp.prototype, "subChilds", void 0);
    __decorate([
        ej2_base_1.Complex({}, SubChildProp)
    ], ChildProp.prototype, "subComplexChilds", void 0);
    exports.ChildProp = ChildProp;
    var DemoBase = (function (_super) {
        __extends(DemoBase, _super);
        function DemoBase(ele, properties) {
            return _super.call(this, properties, ele) || this;
        }
        DemoBase.prototype.onPropertyChanged = function (newProp, oldProp) {
            for (var _i = 0, _a = Object.keys(newProp); _i < _a.length; _i++) {
                var prop = _a[_i];
                switch (prop) {
                    case 'text':
                        this.setProperties({ value: this.text }, true);
                        this.element.innerHTML = '<span>' + this.text + '</span>';
                        this.trigger('change', { value: this.value });
                        break;
                    case 'value':
                        this.setProperties({ text: this.value }, true);
                        this.element.innerHTML = '<span>' + this.text + '</span>';
                        this.trigger('change', { value: this.value });
                        this.trigger('updated', { value: this.value });
                        break;
                    case 'childs':
                        this.controlRender();
                        break;
                }
            }
        };
        DemoBase.prototype.preRender = function () {
        };
        DemoBase.prototype.render = function () {
            this.controlRender();
        };
        DemoBase.prototype.controlRender = function () {
            var content = '<span>' + this.text + '</span>';
            if (this.childs) {
                for (var _i = 0, _a = this.childs; _i < _a.length; _i++) {
                    var child = _a[_i];
                    content = content + '<div>' + child.text + (child.header ? 'Header' : '');
                    if (child.subChilds) {
                        for (var _b = 0, _c = child.subChilds; _b < _c.length; _b++) {
                            var subChild = _c[_b];
                            content = content + '<span>' + subChild.text + '</span>';
                        }
                    }
                    content = content + '</div>';
                }
            }
            this.element.innerHTML = content;
        };
        DemoBase.prototype.getModuleName = function () {
            return 'sample';
        };
        DemoBase.prototype.getPersistData = function () {
            return '';
        };
        return DemoBase;
    }(ej2_base_1.Component));
    __decorate([
        ej2_base_1.Property('Text')
    ], DemoBase.prototype, "text", void 0);
    __decorate([
        ej2_base_1.Property('10px')
    ], DemoBase.prototype, "width", void 0);
    __decorate([
        ej2_base_1.Property('10px')
    ], DemoBase.prototype, "height", void 0);
    __decorate([
        ej2_base_1.Property('10px')
    ], DemoBase.prototype, "size", void 0);
    __decorate([
        ej2_base_1.Property('Button')
    ], DemoBase.prototype, "value", void 0);
    __decorate([
        ej2_base_1.Collection([], ChildProp)
    ], DemoBase.prototype, "childs", void 0);
    __decorate([
        ej2_base_1.Collection([], ChildProp)
    ], DemoBase.prototype, "child2s", void 0);
    __decorate([
        ej2_base_1.Event()
    ], DemoBase.prototype, "change", void 0);
    __decorate([
        ej2_base_1.Event()
    ], DemoBase.prototype, "updated", void 0);
    DemoBase = __decorate([
        ej2_base_1.NotifyPropertyChanges
    ], DemoBase);
    exports.DemoBase = DemoBase;
});
