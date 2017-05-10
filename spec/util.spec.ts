import { DemoBase } from './sample.core';
import { getPropArray } from '../src/util';

/**
 * Form Spec
 */

describe('=> Utils => ', () => {

    it('get complex properties array', () => {
        let props: any = (DemoBase.prototype as any).propList;
        let propResArray: any = getPropArray(props.colProps);
        expect(propResArray).toEqual(['childs', 'child2s']);
    });

    it('get complex properties array', () => {
        let props: any = [{ type: { prototype: { propList: { propNames: [], complexProps: [] } } }, propertyName: 'onlyOnePorp' }];
        let propResArray: any = getPropArray(props);
        expect(propResArray).toEqual(['onlyOnePorp']);
    });


    it('get properties array', () => {
        let props: any = (DemoBase.prototype as any).propList.propNames;
        expect(props).toEqual(['enablePersistence', 'enableRtl', 'locale', 'text', 'width', 'height', 'size', 'value']);
    });

    it('get events array', () => {
        let events: any = (DemoBase.prototype as any).propList.eventNames;
        expect(events).toEqual(['change', 'updated']);
    });


});