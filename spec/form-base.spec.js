define(["require", "exports", "@angular/core/testing", "@angular/forms", "./form.component", "./app.module"], function (require, exports, testing_1, forms_1, form_component_1, app_module_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    describe('=> Form Component => ', function () {
        var comp;
        var fixture;
        var de;
        var el;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
        beforeEach(function (done) {
            testing_1.TestBed.configureTestingModule({
                declarations: [app_module_1.AppComponent, form_component_1.DemoFormComponent],
                imports: [forms_1.FormsModule]
            });
            testing_1.TestBed.overrideComponent(app_module_1.AppComponent, {
                set: {
                    template: "<form #heroForm='ngForm' (ngSubmit)='onFormSubmit(heroForm.value)' >\n                            <div class='form-group'>\n                                <label for='name'>Name</label>\n                                <input type='text' class='form-control' id='name' value='Smith' [ngModel]='uName'  name='fname' required />\n                            </div>\n                            <div class='form-group'>\n                                <label for='alterEgo'>Destination</label>\n                                <input type='text' class='form-control' \n                                id='alterEgo' [ngModel]='dest'  name='developer' value='Developer' />\n                            </div>\n                            <ej2-button [value]='text' name='button' [ngModel]='text'> </ej2-button>\n                            <input type='submit' value='Submit' id='butsubmit'>\n                             <pre id='formData'>{{ heroForm.value | json }}</pre>\n                           </form>"
                }
            });
            testing_1.TestBed.compileComponents().then(function () {
                fixture = testing_1.TestBed.createComponent(app_module_1.AppComponent);
                comp = fixture.componentInstance;
                de = fixture.debugElement;
                el = de.nativeElement;
                comp.dest = 'Developer';
                comp.uName = 'Sam';
                comp.text = 'Employee';
                fixture.detectChanges();
                setTimeout(function () { done(); }, 1000);
            });
        });
        it('template from initialize', function () {
            fixture.detectChanges();
            var dataJson = document.getElementById('formData').innerText;
            expect(JSON.parse(dataJson)).toEqual({ 'fname': 'Sam', 'developer': 'Developer', 'button': 'Employee' });
        });
        afterAll(function () {
            el.remove();
        });
    });
});
