/**
 * Angular Component Base Module
 */
import { getValue, isUndefined, setValue, isNullOrUndefined } from '@syncfusion/ej2-base/util';
import { EventEmitter } from '@angular/core';

export interface IComponentBase {
    registerEvents: (eventList: string[]) => void;
    addTwoWay: (propList: string[]) => void;
}

interface Tag {
    hasChanges: boolean;
    getProperties?: Function;
    isInitChanges: boolean;
    list: TagList[];
}

interface TagList {
    getProperties: Function;
    hasChanges: boolean;
}

export class ComponentBase<T> {
    public element: HTMLElement;
    public tags: string[];
    private tagObjects: { name: string, instance: Tag }[];
    public onPropertyChanged: (newProp: Object, oldProp: Object) => void;
    public appendTo: (ele: string | HTMLElement) => void;
    public setProperties: (obj: Object, muteOnChange: boolean) => void;
    public properties: Object;
    public saveChanges: Function;
    public destroy: Function;

    public ngOnInit(): void {
        this.tags = this.tags || [];
        this.tagObjects = [];
        for (let tag of this.tags) {
            let tagObject: { name: string, instance: Tag } = {
                instance: getValue('child' + tag.substring(0, 1).toUpperCase() + tag.substring(1), this),
                name: tag
            };
            this.tagObjects.push(tagObject);
        }
    }

    public ngAfterViewInit(): void {
        this.appendTo(this.element);
    }

    public ngOnDestroy(): void {
        this.destroy();
    }

    public ngAfterContentChecked(): void {
        for (let tagObject of this.tagObjects) {
            if (!isUndefined(tagObject.instance) && tagObject.instance.hasChanges) {
                if (tagObject.instance.isInitChanges) {
                    let propObj: { [key: string]: Object } = {};
                    propObj[tagObject.name] = tagObject.instance.getProperties();
                    this.setProperties(propObj, tagObject.instance.isInitChanges);
                } else {
                    for (let list of tagObject.instance.list) {
                        if (list.hasChanges) {
                            let curIndex: number = tagObject.instance.list.indexOf(list);
                            getValue(tagObject.name, this)[curIndex].setProperties(list.getProperties());
                        }
                    }
                }
            }

        }
    }

    protected registerEvents(eventList: string[]): void {
        let ngEventsEmitter: { [key: string]: Object } = {};
        if (eventList && eventList.length) {
            for (let event of eventList) {
                ngEventsEmitter[event] = new EventEmitter(false);
            }
            this.setProperties(ngEventsEmitter, true);
        }
    }

    protected addTwoWay(propList: string[]): void {
        for (let prop of propList) {
            getValue(prop, this);
            Object.defineProperty(this, prop, {
                get: () => {
                    return getValue(prop, this.properties);
                },
                set: (newVal: Object) => {
                    let oldVal: Object = getValue(prop, this.properties);
                    if (oldVal === newVal) {
                        return;
                    }
                    this.saveChanges(prop, newVal, oldVal);
                    setValue(prop, (isNullOrUndefined(newVal) ? null : newVal), this.properties);
                    getValue(prop + 'Change', this).emit(newVal);
                }
            });
            setValue(prop + 'Change', new EventEmitter(), this);
        }
    }

    public trigger(eventName: string, eventArgs: Object): void {
        let eventObj: { next: Function } = getValue(eventName, this);
        if (!isUndefined(eventObj)) {
            eventObj.next(eventArgs);
        }
        let localEventObj: Function = getValue('local' + eventName.charAt(0).toUpperCase() + eventName.slice(1), this);
        if (!isUndefined(localEventObj)) {
            localEventObj.call(this, eventArgs);
        }
    }

}
