define(["require", "exports", "@angular/core/testing", "../src/component-base", "./control.component", "./app.module"], function (require, exports, testing_1, component_base_1, control_component_1, app_module_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
    describe('=> Complex Component => ', function () {
        var comp;
        var fixture;
        var de;
        var el;
        var directives = control_component_1.ControlComponents;
        directives.push(app_module_1.AppComponent);
        beforeEach(function (done) {
            testing_1.TestBed.configureTestingModule({
                declarations: directives,
                providers: [component_base_1.ComponentBase]
            });
            testing_1.TestBed.overrideComponent(app_module_1.AppComponent, {
                set: {
                    template: "<ej2-control>\n                <e-childs>\n                <e-child  [text]='child1.text' [header]='child1.header' ></e-child>\n                <e-child  [text]='child2.text' [header]='child2.header' ></e-child>\n                <e-child  [text]='child3.text' [header]='child3.header' ></e-child>\n                </e-childs>\n                </ej2-control>"
                }
            });
            testing_1.TestBed.compileComponents().then(function () {
                fixture = testing_1.TestBed.createComponent(app_module_1.AppComponent);
                comp = fixture.componentInstance;
                de = fixture.debugElement;
                el = de.nativeElement;
                fixture.detectChanges();
                setTimeout(function () { done(); }, 100);
            });
        });
        it('complex data processing', function () {
            var instance = el.querySelector('.e-control').ej2_instances[0];
            expect(JSON.stringify(instance.childs[0].properties)).toEqual('{"header":true,"text":"Child1","subChilds":[]}');
            expect(JSON.stringify(instance.childs[1].properties)).toEqual('{"header":false,"text":"Child2","subChilds":[]}');
        });
        it('complex data binding', function (done) {
            comp.child2 = { text: 'ChangedChild', header: true };
            fixture.detectChanges();
            setTimeout(function () {
                var instance = el.querySelector('.e-control').ej2_instances[0];
                expect(JSON.stringify(instance.childs[0].properties)).toEqual('{"header":true,"text":"Child1","subChilds":[]}');
                expect(JSON.stringify(instance.childs[1].properties)).toEqual('{"header":true,"text":"ChangedChild","subChilds":[]}');
                done();
            }, 100);
        });
        afterAll(function () {
            el.remove();
        });
    });
    describe('=> Complex Component => ', function () {
        var comp;
        var fixture;
        var de;
        var el;
        var directives = control_component_1.ControlComponents;
        directives.push(app_module_1.AppComponent);
        beforeEach(function (done) {
            testing_1.TestBed.configureTestingModule({
                declarations: directives,
                providers: [component_base_1.ComponentBase]
            });
            testing_1.TestBed.overrideComponent(app_module_1.AppComponent, {
                set: {
                    template: "<ej2-control>\n                <e-childs>\n                <e-child  [text]='child1.text' [header]=true >\n                    <e-sub-childs>\n                        <e-sub-child text='SubChild1' [header]=true ></e-sub-child>\n                        <e-sub-child text='SubChild2' [header]=true ></e-sub-child>\n                        <e-sub-child text='SubChild3' [header]=true ></e-sub-child>\n                    </e-sub-childs>\n                    \n                </e-child>\n                <e-child  [text]='child2.text' [header]=false ></e-child>\n                <e-child  [text]='child3.text' [header]=true ></e-child>\n                </e-childs>\n                </ej2-control>"
                }
            });
            testing_1.TestBed.compileComponents().then(function () {
                fixture = testing_1.TestBed.createComponent(app_module_1.AppComponent);
                comp = fixture.componentInstance;
                de = fixture.debugElement;
                el = de.nativeElement;
                fixture.detectChanges();
                setTimeout(function () { done(); }, 1000);
            });
        });
        it('complex data 2 level processing', function () {
            var instance = el.querySelector('.e-control').ej2_instances[0];
            expect(JSON.stringify(instance.childs[0], function (key, value) {
                return instance.getActualProperties(value);
            })).toEqual('{"header":true,"text":"Child1","subChilds":[{"header":true,"text":"SubChild1"},' +
                '{"header":true,"text":"SubChild2"},{"header":true,"text":"SubChild3"}]}');
        });
        afterAll(function () {
            el.remove();
        });
    });
});
