/**
 * Angular Utility Module
 */
/* tslint:disable */
export function applyMixins(derivedClass, baseClass) {
    baseClass.forEach(function (baseClass) {
        Object.getOwnPropertyNames(baseClass.prototype).forEach(function (name) {
            derivedClass.prototype[name] = baseClass.prototype[name];
        });
    });
}
/**
 * @private
 */
export function clearTemplate(_this, templateNames) {
    var regTemplates = Object.keys(_this.registeredTemplate);
    if (regTemplates.length) {
        var regProperties = templateNames && templateNames.filter(function (val) {
            return (/\./g.test(val) ? false : true);
        });
        for (var _i = 0, _a = (regProperties && regProperties || regTemplates); _i < _a.length; _i++) {
            var registeredTemplate = _a[_i];
            for (var _b = 0, _c = _this.registeredTemplate[registeredTemplate]; _b < _c.length; _b++) {
                var rt = _c[_b];
                if (!rt.destroyed) {
                    rt.destroy();
                }
            }
            delete _this.registeredTemplate[registeredTemplate];
        }
    }
    var _loop_1 = function (tagObject) {
        if (tagObject.instance) {
            tagObject.instance.clearTemplate((templateNames && templateNames.filter(function (val) {
                return (new RegExp(tagObject.name).test(val) ? true : false);
            })));
        }
    };
    for (var _d = 0, _e = _this.tagObjects; _d < _e.length; _d++) {
        var tagObject = _e[_d];
        _loop_1(tagObject);
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
export function setValue(nameSpace, value, object) {
    var keys = nameSpace.split('.');
    var fromObj = object || {};
    for (var i = 0; i < keys.length; i++) {
        var key = keys[i];
        if (i + 1 === keys.length) {
            fromObj[key] = value === undefined ? {} : value;
        }
        else if (fromObj[key] === undefined) {
            fromObj[key] = {};
        }
        fromObj = fromObj[key];
    }
    return fromObj;
}
