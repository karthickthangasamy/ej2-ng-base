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
define(["require", "exports", "@angular/core", "@angular/forms", "../src/component-base", "../src/form-base", "../src/util", "./sample.core"], function (require, exports, core_1, forms_1, component_base_1, form_base_1, util_1, sample_core_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var DemoFormComponent = DemoFormComponent_1 = (function (_super) {
        __extends(DemoFormComponent, _super);
        function DemoFormComponent(ngEle) {
            var _this = _super.call(this) || this;
            _this.ngEle = ngEle;
            _this.element = _this.ngEle.nativeElement;
            _this.registerEvents(['click']);
            _this.addTwoWay(['text']);
            return _this;
        }
        return DemoFormComponent;
    }(sample_core_1.DemoBase));
    DemoFormComponent = DemoFormComponent_1 = __decorate([
        core_1.Component({
            selector: 'ej2-button',
            inputs: ['text', 'height', 'width', 'value'],
            outputs: ['click'],
            template: '',
            providers: [
                {
                    provide: forms_1.NG_VALUE_ACCESSOR,
                    useExisting: core_1.forwardRef(function () { return DemoFormComponent_1; }),
                    multi: true
                }
            ],
        }),
        __param(0, core_1.Inject(core_1.ElementRef))
    ], DemoFormComponent);
    exports.DemoFormComponent = DemoFormComponent;
    util_1.applyMixins(DemoFormComponent, [form_base_1.FormBase, component_base_1.ComponentBase]);
    var formCmpt = new form_base_1.FormBase();
    formCmpt.localChange({ value: 'new' });
    ;
    var DemoFormComponent_1;
});
