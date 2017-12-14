/**
 * Angular Component Base Module
 */
import { getValue, isUndefined, setValue, isNullOrUndefined } from '@syncfusion/ej2-base';
import { EventEmitter, EmbeddedViewRef } from '@angular/core';
import { clearTemplate } from './util';

export interface IComponentBase {
    registerEvents: (eventList: string[]) => void;
    addTwoWay: (propList: string[]) => void;
}

interface Tag {
    hasChanges: boolean;
    getProperties?: Function;
    isInitChanges: boolean;
    list: TagList[];
    clearTemplate?: (arg: string[]) => void;
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
    private registeredTemplate: { [key: string]: EmbeddedViewRef<Object>[] };
    private complexTemplate: string[];

    private ngBoundedEvents: { [key: string]: Map<object, object> };

    public ngOnInit(): void {
        this.registeredTemplate = {};
        this.ngBoundedEvents = {};
        this.tags = this.tags || [];
        this.complexTemplate = this.complexTemplate || [];
        this.tagObjects = [];
        for (let tag of this.tags) {
            let tagObject: { name: string, instance: Tag } = {
                instance: getValue('child' + tag.substring(0, 1).toUpperCase() + tag.substring(1), this),
                name: tag
            };
            this.tagObjects.push(tagObject);
        }

        let complexTemplates: string[] = Object.keys(this);
        complexTemplates = complexTemplates.filter((val: string): boolean => {
            return /Ref$/i.test(val) && /\_/i.test(val);
        });
        for (let tempName of complexTemplates) {
            let propName: string = tempName.replace('Ref', '');
            let val: Object = {};
            setValue(propName.replace('_', '.'), getValue(propName, this), val);
            this.setProperties(val, true);
        }
    }

    public ngAfterViewInit(): void {
        // Used setTimeout for template binding
        // Refer Link: https://github.com/angular/angular/issues/6005
        setTimeout(() => {
            this.appendTo(this.element);
        });
    }

    public ngOnDestroy(): void {
        this.destroy();
        this.clearTemplate(null);
    }

    public clearTemplate(templateNames?: string[]): void {
        clearTemplate(this, templateNames);
    };

    public ngAfterContentChecked(): void {
        for (let tagObject of this.tagObjects) {
            if (!isUndefined(tagObject.instance) && (tagObject.instance.isInitChanges || tagObject.instance.hasChanges)) {
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

    public addEventListener(eventName: string, handler: Function): void {
        let eventObj: EventEmitter<Object> = getValue(eventName, this);
        if (!isUndefined(eventObj)) {
            if (!this.ngBoundedEvents[eventName]) {
                this.ngBoundedEvents[eventName] = new Map();
            }
            this.ngBoundedEvents[eventName].set(handler, eventObj.subscribe(handler));
        }
    }

    public removeEventListener(eventName: string, handler: Function): void {
        let eventObj: EventEmitter<Object> = getValue(eventName, this);
        if (!isUndefined(eventObj)) {
            (<EventEmitter<object>>this.ngBoundedEvents[eventName].get(handler)).unsubscribe();
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
