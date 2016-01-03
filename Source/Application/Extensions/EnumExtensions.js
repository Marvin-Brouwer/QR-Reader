'use-strict';
var EnumExtensions = (function () {
    function EnumExtensions() {
    }
    // I want to infer the enum from the type but I guess TypeScript doesn't support that,
    // it's shame I cant typecast the enumeration property tho.
    EnumExtensions.toArray = function (enumeration, removeNulls) {
        if (removeNulls === void 0) { removeNulls = false; }
        var i = 0;
        return Object.keys(enumeration)
            .filter(function (_) { var match = i % 2 === 0; i++; return match; });
    };
    EnumExtensions.first = function (enumerable, expression) {
        return enumerable
            .find(expression)[0] || null;
    };
    EnumExtensions.getDefault = function (enumerable) {
        return (!!enumerable[0]) ? enumerable[0] : null;
    };
    EnumExtensions.firstOrDefault = function (enumerable, expression) {
        return enumerable.first(expression) || enumerable.getDefault();
    };
    // For performance
    EnumExtensions.filter = function (callbackfn, thisArg) {
        // http://www.jedi.be/blog/2008/10/10/is-your-jquery-or-javascript-getting-slow-or-bad-performance/
        var results = new Array();
        if (!thisArg)
            return results;
        for (var i = 0, length_1 = thisArg.length; i < length_1; i++) {
            if (!callbackfn(thisArg[i], i, thisArg))
                continue;
            results.push(thisArg[i]);
        }
        return results;
    };
    EnumExtensions.find = function (callbackfn, thisArg) {
        // http://www.jedi.be/blog/2008/10/10/is-your-jquery-or-javascript-getting-slow-or-bad-performance/
        var results = new Array();
        if (!thisArg)
            return results;
        for (var i = 0, length_2 = thisArg.length; i < length_2; i++) {
            if (!callbackfn(thisArg[i], i, thisArg))
                continue;
            results.push(thisArg[i]);
            return results;
        }
        return results;
    };
    EnumExtensions.map = function (callbackfn, thisArg) {
        var results = new Array();
        if (!thisArg)
            return results;
        var count = thisArg.length;
        var i = 0;
        while (i < count) {
            results.push(callbackfn(thisArg[i], i, thisArg));
            i++;
        }
        return results;
    };
    return EnumExtensions;
})();
// ReSharper disable CallerCalleeUsing
// So why doesn't enum inherit Enumerator<number>?
// ReSharper disable once Lambda => arrow functions can't resolve argumenst.callee aparently
// So apparently Enumerator isn't a javscript library object, Array doesn't even have moveNext();
// I wonder why this is part of lib.ts
//Enumerator.prototype.first = function(filter: (member) => boolean) {
//    return EnumExtensions.first(arguments.callee(), filter);
//};
Array.prototype['first'] = function (expression) { return EnumExtensions.first(this, expression); };
Array.prototype['firstOrDefault'] = function (expression) { return EnumExtensions.firstOrDefault(this, expression); };
Array.prototype['getDefault'] = function () { return EnumExtensions.getDefault(this); };
Array.prototype['filter'] = function (callbackfn) { return EnumExtensions.filter(callbackfn, this); };
Array.prototype['find'] = function (callbackfn) { return EnumExtensions.find(callbackfn, this); };
Array.prototype['map'] = function (callbackfn) { return EnumExtensions.map(callbackfn, this); };
// ReSharper restore CallerCalleeUsing 
//# sourceMappingURL=EnumExtensions.js.map