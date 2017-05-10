import { QueryList, SimpleChanges, SimpleChange } from '@angular/core';
import { getValue } from '@syncfusion/ej2-base/util';

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
}

export class ComplexBase<T> {
    public hasChanges?: boolean = false;
    public index?: number;
    public propCollection?: { [key: string]: Object } = {};
    public property?: string;
    public tags?: string[] = [];
    private tagObjects?: { name: string, instance: Tag }[] = [];

    public ngOnInit(): void {
        for (let tag of this.tags) {
            let objInstance: Tag = getValue('child' + tag.substring(0, 1).toUpperCase() + tag.substring(1), this);
            if (objInstance) {
                this.tagObjects.push({ instance: objInstance, name: tag });
            }
        }
    }

    public ngOnChanges(changes: SimpleChanges): void {
        for (let propName of Object.keys(changes)) {
            let changedVal: SimpleChange = changes[propName];
            this.propCollection[propName] = changedVal.currentValue;
        }
        this.hasChanges = true;
    }

    public getProperties(): { [key: string]: Object } {
        for (let tagObject of this.tagObjects) {
            this.propCollection[tagObject.name] = tagObject.instance.getProperties();
        }
        return this.propCollection;
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

    public ngAfterContentChecked(): void {
        this.hasChanges = this.isChanged();
    }

    public ngAfterViewInit(): void {
        this.isInitChanges = false;
    }

}