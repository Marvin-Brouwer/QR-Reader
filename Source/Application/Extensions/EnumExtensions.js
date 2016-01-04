'use-strict';
class EnumExtensions {
    // I want to infer the enum from the type but I guess TypeScript doesn't support that,
    // it's shame I cant typecast the enumeration property tho.
    static toArray(enumeration, removeNulls = false) {
        let i = 0;
        return Object.keys(enumeration)
            .filter(_ => { var match = i % 2 === 0; i++; return match; });
    }
    static first(enumerable, expression) {
        return enumerable
            .find(expression)[0] || null;
    }
    static getDefault(enumerable) {
        return (!!enumerable[0]) ? enumerable[0] : null;
    }
    static firstOrDefault(enumerable, expression) {
        return enumerable.first(expression) || enumerable.getDefault();
    }
    // For performance
    static filter(callbackfn, thisArg) {
        // http://www.jedi.be/blog/2008/10/10/is-your-jquery-or-javascript-getting-slow-or-bad-performance/
        let results = new Array();
        if (!thisArg)
            return results;
        for (let i = 0, length = thisArg.length; i < length; i++) {
            if (!callbackfn(thisArg[i], i, thisArg))
                continue;
            results.push(thisArg[i]);
        }
        return results;
    }
    static find(callbackfn, thisArg) {
        // http://www.jedi.be/blog/2008/10/10/is-your-jquery-or-javascript-getting-slow-or-bad-performance/
        let results = new Array();
        if (!thisArg)
            return results;
        for (let i = 0, length = thisArg.length; i < length; i++) {
            if (!callbackfn(thisArg[i], i, thisArg))
                continue;
            results.push(thisArg[i]);
            return results;
        }
        return results;
    }
    static map(callbackfn, thisArg) {
        let results = new Array();
        if (!thisArg)
            return results;
        let count = thisArg.length;
        let i = 0;
        while (i < count) {
            results.push(callbackfn(thisArg[i], i, thisArg));
            i++;
        }
        return results;
    }
}
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