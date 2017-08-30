import { Component } from '@angular/core';

/**
 * App Module
 */
@Component({
    selector: 'temp-component',
    template: `<ej2-list [dataSource]='data'>
               <ng-template #template let-data>
                    <div class='text-template'> {{ data.name }}</div>
               </ng-template>
               <ng-template #tooltipTemplate let-data>
                    <div class='text-template'> {{ data.name }}</div>
               </ng-template>
               <e-items>
                    <e-item [dataSource]='item1Data'>
                        <ng-template #template let-data>
                            <div class='item-template'> {{ data.name }}</div>
                        </ng-template>
                    </e-item>
                    <e-item text='Item2'>
                    <e-subitems>
                    <e-subitem [dataSource]='item1Data'>
                        <ng-template #template let-data>
                            <div class='subitem-template'> {{ data.name }}</div>
                        </ng-template>
                    </e-subitem>
                    </e-subitems>
                    </e-item>
                    <e-item text='Item3'>
                    </e-item>
               </e-items>
    </ej2-list>
     <ej2-list id="ndList" [dataSource]='data'></ej2-list>
    `
})
export class TemplateApp {
    public item1Data: Object = { text: 'name' };
    public data: Object = [{ name: 'template1' }, { name: 'template2' }];

}
