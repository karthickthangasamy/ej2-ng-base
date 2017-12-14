/**
 * Angular Form Base Module
 */
var FormBase = /** @class */ (function () {
    function FormBase() {
    }
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
        this.appendTo(this.element);
        var ele = this.inputElement || this.element;
        ele.addEventListener('focus', this.ngOnFocus.bind(this));
        ele.addEventListener('blur', this.ngOnBlur.bind(this));
    };
    FormBase.prototype.writeValue = function (value) {
        if (value === null) {
            return;
        }
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
export { FormBase };
