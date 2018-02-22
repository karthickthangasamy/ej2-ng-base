/**
 * Angular Utility Module
 */

/* tslint:disable */
export function applyMixins(derivedClass: any, baseClass: any[]): void {
    baseClass.forEach(baseClass => {
        Object.getOwnPropertyNames(baseClass.prototype).forEach(name => {
            derivedClass.prototype[name] = baseClass.prototype[name];
        });
    });
}

/**
 * @private 
 */
export function clearTemplate(_this: any, templateNames?: string[]): void {
    let regTemplates: string[] = Object.keys(_this.registeredTemplate);
    if (regTemplates.length) {
        let regProperties: string[] = templateNames && templateNames.filter(
            (val: string) => {
                return (/\./g.test(val) ? false : true);
            });
        for (let registeredTemplate of (regProperties && regProperties || regTemplates)) {
            for (let rt of _this.registeredTemplate[registeredTemplate]) {
                if (!rt.destroyed) {
                    let pNode: any = rt._view.renderer.parentNode(rt.rootNodes[0]);
                    for (let m: number; m < rt.rootNodes.length; m++) {
                        pNode.appendChild(rt.rootNodes[m]);
                    }
                    rt.destroy();
                }
            }
            delete _this.registeredTemplate[registeredTemplate];
        }
    }
    for (let tagObject of _this.tagObjects) {
        if (tagObject.instance) {
            tagObject.instance.clearTemplate((templateNames && templateNames.filter(
                (val: string) => {
                    return (new RegExp(tagObject.name).test(val) ? true : false);
                })));
        }
    }
}

/**
 * To set value for the nameSpace in desired object.
 * @param {string} nameSpace - String value to the get the inner object
 * @param {any} value - Value that you need to set.
 * @param {any} obj - Object to get the inner object value.
 * @return {void}
 * @private
 */
export function setValue(nameSpace: string, value: any, object: any): any {
    let keys: string[] = nameSpace.split('.');
    let fromObj: any = object || {};
    for (let i: number = 0; i < keys.length; i++) {
        let key: string = keys[i];
        if (i + 1 === keys.length) {
            fromObj[key] = value === undefined ? {} : value;
        } else if (fromObj[key] === undefined) {
            fromObj[key] = {};
        }
        fromObj = fromObj[key];
    }
    return fromObj;
}

/* tslint:enable */




export interface PropertyCollectionInfo {
    props: PropertyDetails[];
    complexProps: PropertyDetails[];
    colProps: PropertyDetails[];
    events: PropertyDetails[];
    propNames: string[];
    complexPropNames: string[];
    colPropNames: string[];
    eventNames: string[];
}

export interface PropertyDetails {
    propertyName: string;
    type: FunctionConstructor | Object;
    defaultValue: Object;
}

