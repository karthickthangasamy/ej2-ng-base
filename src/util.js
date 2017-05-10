define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function applyMixins(derivedClass, baseClass) {
        baseClass.forEach(function (baseClass) {
            Object.getOwnPropertyNames(baseClass.prototype).forEach(function (name) {
                derivedClass.prototype[name] = baseClass.prototype[name];
            });
        });
    }
    exports.applyMixins = applyMixins;
    function getPropArray(obj, prefixKey) {
        if (prefixKey === void 0) { prefixKey = ''; }
        var properties = [];
        for (var _i = 0, obj_1 = obj; _i < obj_1.length; _i++) {
            var prop = obj_1[_i];
            var typeObj = prop.type.prototype.propList;
            var resObj = getPropArray(typeObj.complexProps, '');
            properties.push(prop.propertyName);
        }
        return properties;
    }
    exports.getPropArray = getPropArray;
});
