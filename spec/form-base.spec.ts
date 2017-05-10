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
                           </form>`
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

    // To cover coverage;

    afterAll(() => {
        el.remove();
    });

});