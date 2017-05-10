define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var FormBase = (function () {
        function FormBase() {
        }
        FormBase.prototype.localChange = function (e) {
            if (this.propagateChange !== undefined) {
                this.propagateChange(e.value);
            }
        };
        FormBase.prototype.registerOnChange = function (registerFunction) {
            this.propagateChange = registerFunction;
        };
        FormBase.prototype.registerOnTouched = function (registerFunction) {
            this.propagateTouch = registerFunction;
        };
        FormBase.prototype.writeValue = function (value) {
            this.value = value;
        };
        return FormBase;
    }());
    exports.FormBase = FormBase;
});
