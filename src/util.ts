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
/* tslint:enable */


export function getPropArray(obj: PropertyDetails[], prefixKey: string = ''): string[] {
    let properties: string[] = [];
    for (let prop of obj) {
        let typeObj: PropertyCollectionInfo = (prop.type as
            { prototype: { propList: PropertyCollectionInfo } }).prototype.propList;
        let resObj: string[] = getPropArray(typeObj.complexProps, '');
        properties.push(prop.propertyName);
    }
    return properties;
}

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

