define(["require", "exports", "@angular/core/testing", "./sample.component", "./app.module"], function (require, exports, testing_1, sample_component_1, app_module_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
    describe('=> Simple Component => ', function () {
        var comp;
        var fixture;
        var de;
        var el;
        beforeEach(function (done) {
            testing_1.TestBed.configureTestingModule({
                declarations: [app_module_1.AppComponent, sample_component_1.DemoBaseComponent],
            });
            fixture = testing_1.TestBed.createComponent(app_module_1.AppComponent);
            comp = fixture.componentInstance;
            de = fixture.debugElement;
            el = de.nativeElement;
            fixture.detectChanges();
            setTimeout(function () { done(); }, 10);
        });
        it('directive initialize', function () {
            expect(el.firstElementChild.classList.contains('e-control')).toBe(true);
            expect(el.firstElementChild.ej2_instances[0].text).toBe(comp.text);
        });
        it('input change', function (done) {
            comp.text = 'Test Title';
            fixture.detectChanges();
            setTimeout(function () {
                expect(el.firstElementChild.textContent).toBe('Test Title');
                done();
            }, 10);
        });
        it('twoway binding from customer component', function (done) {
            comp.text = 'Content';
            var sypFunction = spyOn(el.firstElementChild.ej2_instances[0], 'onPropertyChanged');
            fixture.detectChanges();
            setTimeout(function () {
                expect(sypFunction).toHaveBeenCalledWith({ text: 'Content' }, { text: 'EJButton' });
                done();
            }, 10);
        });
        it('twoway binding setter not called when old and newvalue same', function (done) {
            var sypFunction = spyOn(el.firstElementChild.ej2_instances[0], 'onPropertyChanged');
            el.firstElementChild.ej2_instances[0].text = 'EJButton';
            fixture.detectChanges();
            setTimeout(function () {
                expect(sypFunction).not.toHaveBeenCalled();
                done();
            }, 10);
        });
        it('twoway binding set undefined value', function (done) {
            var sypFunction = spyOn(el.firstElementChild.ej2_instances[0], 'onPropertyChanged');
            el.firstElementChild.ej2_instances[0].text = undefined;
            fixture.detectChanges();
            setTimeout(function () {
                expect(sypFunction).toHaveBeenCalled();
                done();
            }, 10);
        });
        it('twoway binding changes control component', function (done) {
            comp.val = 'EJ Change';
            fixture.detectChanges();
            setTimeout(function () {
                expect(comp.text).toBe('EJ Change');
                done();
            }, 10);
        });
        afterAll(function () {
            el.remove();
        });
    });
    describe('=> Simple Component => ', function () {
        var comp;
        var fixture;
        var de;
        var el;
        var sypFunction;
        var destroySpy;
        beforeEach(function (done) {
            testing_1.TestBed.configureTestingModule({
                declarations: [app_module_1.AppComponent, sample_component_1.DemoBaseComponent],
            });
            fixture = testing_1.TestBed.createComponent(app_module_1.AppComponent);
            comp = fixture.componentInstance;
            de = fixture.debugElement;
            el = de.nativeElement;
            sypFunction = spyOn(comp, 'onButtonClick');
            comp.val = 'Content';
            fixture.detectChanges();
            destroySpy = spyOn(el.firstElementChild.ej2_instances[0], 'destroy');
            setTimeout(function () {
                done();
            }, 50);
        });
        it('output callback', function (done) {
            comp.val = 'Test';
            fixture.detectChanges();
            setTimeout(function () {
                expect(sypFunction).toHaveBeenCalled();
                done();
            }, 50);
        });
        it('destroy testcase', function (done) {
            comp.val = 'Test';
            fixture.destroy();
            setTimeout(function () {
                expect(destroySpy).toHaveBeenCalled();
                done();
            }, 50);
        });
        afterAll(function () {
            el.remove();
        });
    });
});
