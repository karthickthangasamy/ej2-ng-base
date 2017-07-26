import { QueryList, SimpleChanges, SimpleChange, EmbeddedViewRef } from '@angular/core';
import { getValue } from '@syncfusion/ej2-base/util';
import { clearTemplate } from './util';

/**
 * Complex Array Base module
 */

export interface IChildChange {
    index: number;
    change: Object;
}

interface Tag {
    hasChanges: boolean;
    getProperties: Function;
    isInitChanges: boolean;
    clearTemplate?: (args: string[]) => void;
}

export class ComplexBase<T> {
    public hasChanges?: boolean = false;
    public index?: number;
    public propCollection?: { [key: string]: Object } = {};
    public property?: string;
    public tags?: string[] = [];
    private tagObjects?: { name: string, instance: Tag }[] = [];
    private registeredTemplate: { [key: string]: EmbeddedViewRef<Object>[] };
    public ngOnInit(): void {
        this.registeredTemplate = {};
        for (let tag of this.tags) {
            let objInstance: Tag = getValue('child' + tag.substring(0, 1).toUpperCase() + tag.substring(1), this);
            if (objInstance) {
                this.tagObjects.push({ instance: objInstance, name: tag });
            }
        }
        let templateProperties: string[] = Object.keys(this);
        templateProperties = templateProperties.filter((val: string): boolean => {
            return /Ref$/i.test(val);
        });
        for (let tempName of templateProperties) {
            let propName: string = tempName.replace('Ref', '');
            this.propCollection[propName] = getValue(propName, this);
        }
    }

    public ngOnChanges(changes: SimpleChanges): void {
        for (let propName of Object.keys(changes)) {
            let changedVal: SimpleChange = changes[propName];
            this.propCollection[propName] = changedVal.currentValue;
        }
        this.hasChanges = true;
    }
    public clearTemplate(templateNames: string[]): void {
        clearTemplate(this, templateNames);
    };
    public getProperties(): { [key: string]: Object } {
        for (let tagObject of this.tagObjects) {
            this.propCollection[tagObject.name] = tagObject.instance.getProperties();
        }
        return this.propCollection;
    }

    public isChanged(): boolean {
        let result: boolean = this.hasChanges;
        for (let item of this.tagObjects) {
            result = result || item.instance.hasChanges;
        }
        return result;
    }

    public ngAfterContentChecked(): void {
        this.hasChanges = this.isChanged();
        let templateProperties: string[] = Object.keys(this);
        templateProperties = templateProperties.filter((val: string) => {
            return /Ref$/i.test(val);
        });
    }

    public ngAfterViewChecked(): void {
        this.hasChanges = false;
    }


}

export class ArrayBase<T> {
    public isInitChanges: boolean;
    public list: T[] & ComplexBase<T>[] = [];
    public children: QueryList<T>;
    public hasChanges: boolean = false;
    private propertyName: string;

    constructor(propertyName: string) {
        this.propertyName = propertyName;
    }

    public ngOnInit(): void {
        this.isInitChanges = true;
    }

    public ngAfterContentInit(): void {
        let index: number = 0;
        this.list = this.children.map((child: T & ComplexBase<T>) => {
            child.index = index++;
            child.property = this.propertyName;
            return child;
        });
        this.hasChanges = true;
    }

    public getProperties(): Object[] {
        let onlyProp: Object[] = [];
        for (let item of this.list) {
            onlyProp.push(item.getProperties());
        }
        return onlyProp;
    }

    public isChanged(): boolean {
        let result: boolean = false;
        for (let item of this.list) {
            result = result || item.hasChanges;
        }
        return !!this.list.length && result;
    }

    public clearTemplate(templateNames: string[]): void {
        for (let item of this.list) {
            item.clearTemplate(templateNames && templateNames.map((val: string): string => {
                return new RegExp(this.propertyName).test(val) ? val.replace(this.propertyName + '.', '') : val;
            }));
        }
    }

    public ngAfterContentChecked(): void {
        this.hasChanges = this.isChanged();
    }

    public ngAfterViewInit(): void {
        this.isInitChanges = false;
    }

}