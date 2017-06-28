import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DemoFormComponent } from './form.component';
import { AppComponent } from './app.module';

/**
 * Form Spec
 */

describe('=> Form Component => ', () => {
    let comp: AppComponent;
    let fixture: ComponentFixture<AppComponent>;
    let de: DebugElement;
    let el: HTMLElement;

    jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
    beforeEach((done: Function) => {
        TestBed.configureTestingModule({
            declarations: [AppComponent, DemoFormComponent],
            imports: [FormsModule]
        });

        TestBed.overrideComponent(AppComponent, {
            set: {
                template: `<form #heroForm='ngForm' (ngSubmit)='onFormSubmit(heroForm.value)' >
                            <div class='form-group'>
                                <label for='name'>Name</label>
                                <input type='text' class='form-control' id='name' value='Smith' [ngModel]='uName'  name='fname' required />
                            </div>
                            <div class='form-group'>
                                <label for='alterEgo'>Destination</label>
                                <input type='text' class='form-control' 
                                id='alterEgo' [ngModel]='dest'  name='developer' value='Developer' />
                            </div>
                            <ej2-button [value]='text' name='button' [ngModel]='text'> </ej2-button>
                            <input type='submit' value='Submit' id='butsubmit'>
                             <pre id='formData'>{{ heroForm.value | json }}</pre>
                           </form>
                           <input ej2-button />`
            }
        });
        TestBed.compileComponents().then(() => {
            fixture = TestBed.createComponent(AppComponent);
            comp = fixture.componentInstance;
            de = fixture.debugElement;
            el = de.nativeElement;
            comp.dest = 'Developer';
            comp.uName = 'Sam';
            comp.text = 'Employee';
            fixture.detectChanges();
            setTimeout(() => { done(); }, 1000);
        });
    });

    it('template from initialize', () => {
        fixture.detectChanges();
        let dataJson: string = document.getElementById('formData').innerText;
        expect(JSON.parse(dataJson)).toEqual({ 'fname': 'Sam', 'developer': 'Developer', 'button': 'Employee' });
    });

    it('onFocus and onBlur event call', () => {
        let fixr = TestBed.createComponent(AppComponent);
        let instance = de.nativeElement.querySelector('.e-control').ej2_instances[0];
        let spyFun = jasmine.createSpy('focus');
        instance.focus = { emit: spyFun };
        instance.ngOnFocus();
        expect(spyFun).toHaveBeenCalled();
        let spyFun1 = jasmine.createSpy('blur');
        instance.blur = { emit: spyFun1 };
        instance.ngOnBlur();
        expect(spyFun1).toHaveBeenCalled();
    });




    // To cover coverage;

    afterAll(() => {
        el.remove();
    });

});