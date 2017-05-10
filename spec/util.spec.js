define(["require", "exports", "./sample.core", "../src/util"], function (require, exports, sample_core_1, util_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    describe('=> Utils => ', function () {
        it('get complex properties array', function () {
            var props = sample_core_1.DemoBase.prototype.propList;
            var propResArray = util_1.getPropArray(props.colProps);
            expect(propResArray).toEqual(['childs', 'child2s']);
        });
        it('get complex properties array', function () {
            var props = [{ type: { prototype: { propList: { propNames: [], complexProps: [] } } }, propertyName: 'onlyOnePorp' }];
            var propResArray = util_1.getPropArray(props);
            expect(propResArray).toEqual(['onlyOnePorp']);
        });
        it('get properties array', function () {
            var props = sample_core_1.DemoBase.prototype.propList.propNames;
            expect(props).toEqual(['enablePersistence', 'enableRtl', 'locale', 'text', 'width', 'height', 'size', 'value']);
        });
        it('get events array', function () {
            var events = sample_core_1.DemoBase.prototype.propList.eventNames;
            expect(events).toEqual(['change', 'updated']);
        });
    });
});
