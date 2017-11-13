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
export { FormBase };
