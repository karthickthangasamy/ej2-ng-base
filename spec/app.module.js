var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
define(["require", "exports", "@angular/core"], function (require, exports, core_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var AppComponent = (function () {
        function AppComponent() {
            this.uName = '';
            this.dest = '';
            this.text = 'EJButton';
            this.val = '';
            this.child1 = { text: 'Child1', header: true };
            this.child2 = { text: 'Child2', header: false };
            this.child3 = { text: 'Child3', header: true };
        }
        AppComponent.prototype.onButtonClick = function () {
        };
        AppComponent.prototype.onFormSubmit = function (data) {
        };
        return AppComponent;
    }());
    AppComponent = __decorate([
        core_1.Component({
            selector: 'app-component',
            template: "\n    <ej2-button [(value)]='val' [(text)]='text' (updated)='onButtonClick()' ></ej2-button>\n    <p>{{text}}</p>\n    "
        })
    ], AppComponent);
    exports.AppComponent = AppComponent;
});
