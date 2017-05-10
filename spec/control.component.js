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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
define(["require", "exports", "@angular/core", "../src/component-base", "../src/complex-array-base", "../src/util", "./sample.core"], function (require, exports, core_1, component_base_1, complex_array_base_1, util_1, sample_core_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var SubChildDirective = (function (_super) {
        __extends(SubChildDirective, _super);
        function SubChildDirective() {
            return _super.call(this) || this;
        }
        return SubChildDirective;
    }(complex_array_base_1.ComplexBase));
    SubChildDirective = __decorate([
        core_1.Directive({
            selector: 'e-sub-childs>e-sub-child',
            inputs: ['header', 'text']
        })
    ], SubChildDirective);
    exports.SubChildDirective = SubChildDirective;
    var SubChildsDirective = (function (_super) {
        __extends(SubChildsDirective, _super);
        function SubChildsDirective() {
            return _super.call(this, 'subChild') || this;
        }
        return SubChildsDirective;
    }(complex_array_base_1.ArrayBase));
    SubChildsDirective = __decorate([
        core_1.Directive({
            selector: 'e-childs>e-sub-childs',
            queries: {
                children: new core_1.ContentChildren(SubChildDirective)
            },
        })
    ], SubChildsDirective);
    exports.SubChildsDirective = SubChildsDirective;
    var Child2Directive = (function (_super) {
        __extends(Child2Directive, _super);
        function Child2Directive() {
            return _super.call(this) || this;
        }
        return Child2Directive;
    }(complex_array_base_1.ComplexBase));
    Child2Directive = __decorate([
        core_1.Directive({
            selector: 'e-child2s>e-child2',
            inputs: ['header', 'text'],
        })
    ], Child2Directive);
    exports.Child2Directive = Child2Directive;
    var Child2sDirective = (function (_super) {
        __extends(Child2sDirective, _super);
        function Child2sDirective() {
            return _super.call(this, 'child2') || this;
        }
        return Child2sDirective;
    }(complex_array_base_1.ArrayBase));
    Child2sDirective = __decorate([
        core_1.Directive({
            selector: 'ej2-control>e-child2s',
            queries: {
                children: new core_1.ContentChildren(Child2Directive)
            },
        })
    ], Child2sDirective);
    exports.Child2sDirective = Child2sDirective;
    var ChildDirective = (function (_super) {
        __extends(ChildDirective, _super);
        function ChildDirective() {
            var _this = _super.call(this) || this;
            _this.tags = ['subChilds'];
            return _this;
        }
        return ChildDirective;
    }(complex_array_base_1.ComplexBase));
    ChildDirective = __decorate([
        core_1.Directive({
            selector: 'e-childs>e-child',
            inputs: ['header', 'text', 'subChilds'],
            queries: {
                childSubChilds: new core_1.ContentChild(SubChildsDirective)
            }
        })
    ], ChildDirective);
    exports.ChildDirective = ChildDirective;
    var ChildsDirective = (function (_super) {
        __extends(ChildsDirective, _super);
        function ChildsDirective() {
            return _super.call(this, 'child') || this;
        }
        return ChildsDirective;
    }(complex_array_base_1.ArrayBase));
    ChildsDirective = __decorate([
        core_1.Directive({
            selector: 'ej2-control>e-childs',
            queries: {
                children: new core_1.ContentChildren(ChildDirective)
            },
        })
    ], ChildsDirective);
    exports.ChildsDirective = ChildsDirective;
    var ControlComponent = (function (_super) {
        __extends(ControlComponent, _super);
        function ControlComponent(ngEle) {
            var _this = _super.call(this) || this;
            _this.ngEle = ngEle;
            _this.tags = ['childs', 'child2s'];
            _this.element = _this.ngEle.nativeElement;
            _this.registerEvents(['click']);
            _this.addTwoWay.call(_this, ['text']);
            return _this;
        }
        return ControlComponent;
    }(sample_core_1.DemoBase));
    ControlComponent = __decorate([
        core_1.Component({
            selector: 'ej2-control',
            inputs: ['text', 'childs', 'width', 'value'],
            outputs: ['textChange'],
            template: '',
            queries: {
                childChilds: new core_1.ContentChild(ChildsDirective),
                childChild2s: new core_1.ContentChild(Child2sDirective)
            }
        }),
        __param(0, core_1.Inject(core_1.ElementRef))
    ], ControlComponent);
    exports.ControlComponent = ControlComponent;
    util_1.applyMixins(ControlComponent, [component_base_1.ComponentBase]);
    exports.ControlComponents = [ControlComponent, ChildDirective, ChildsDirective, SubChildDirective, SubChildsDirective];
});
