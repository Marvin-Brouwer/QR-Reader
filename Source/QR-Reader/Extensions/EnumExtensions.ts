class EnumExtensions {
    // I want to infer the enum from the type but I guess TypeScript doesn't support that,
    // it's shame I cant typecast the enumeration property tho.
    public static toArray<T>(enumeration: any, removeNulls = false): IEnumerable<T> {
        let i = 0;
        return <IEnumerable<T>>(<any>Object.keys(enumeration))
            .filter(_ => { var match = i % 2 === 0; i++; return match; });

    }
    public static first<T>(enumerable: IEnumerable<T>, expression?: (member: T) => boolean): T {
        if (!expression) return enumerable[0] || null;
        return enumerable
            .find(expression)[0] || null;
    }
    public static getDefault<T>(enumerable: IEnumerable<T>): T {
        return (!!enumerable[0]) ? enumerable[0] : null;
    }

    public static firstOrDefault<T>(enumerable: IEnumerable<T>, expression?: (member: T) => boolean): T {
        return enumerable.first(expression) || enumerable.getDefault();
    }

    // For performance
    public static $filter(callbackfn: (value: any, index: number, array: IEnumerable<any> | any[]) => boolean, thisArg?: IEnumerable<any>): any[]{
        return <any>(this.filter<any>(callbackfn, thisArg));
    }
    public static filter<T>(callbackfn: (value: T, index: number, array: IEnumerable<T>) => boolean, thisArg?: IEnumerable<T>): IEnumerable<T>{
        // http://www.jedi.be/blog/2008/10/10/is-your-jquery-or-javascript-getting-slow-or-bad-performance/
        let results = <IEnumerable<T>><any>new Array();
        if (!thisArg) return results;
        for (let i = 0, length = thisArg.length; i < length; i++) {
            if (!callbackfn(thisArg[i], i, thisArg)) continue;
            results.push(thisArg[i]);
        }
        return results;
    }

    public static $find(callbackfn: (value: any, index: number, array: IEnumerable<any> | any[]) => boolean, thisArg?: IEnumerable<any>): any[]{
        return <any>(this.find<any>(callbackfn, thisArg));
    }
    public static find<T>(callbackfn: (value: T, index: number, array: IEnumerable<T>) => boolean, thisArg?: IEnumerable<T>): IEnumerable<T> {
        // http://www.jedi.be/blog/2008/10/10/is-your-jquery-or-javascript-getting-slow-or-bad-performance/
        let results = <IEnumerable<T>><any>new Array();
        if (!thisArg) return results;
        for (let i = 0, length = thisArg.length; i < length; i++) {
            if (!callbackfn(thisArg[i], i, thisArg)) continue;
            results.push(thisArg[i]);
            return results;
        }
        return results;
    }

    public static $map(callbackfn: (value: any, index: number, array: IEnumerable<any> | any[]) => any, thisArg?: IEnumerable<any>): any[]{
        return <any>(this.map<any, any>(callbackfn, thisArg));
    }
    public static map<T, TOut>(callbackfn: (value: T, index: number, array: IEnumerable<T>) => TOut, thisArg?: IEnumerable<T>): IEnumerable<TOut> {
        let results = <IEnumerable<TOut>><any>new Array();
        if (!thisArg) return results;
        let count = thisArg.length;
        let i = 0;
        while (i < count) {
            results.push(callbackfn(thisArg[i], i, thisArg));
            i++;
        }
        return results;
    }

}

interface IEnumerable<T> extends ArrayConstructor {
    first: (expression: (x: T) => boolean) => T;
    firstOrDefault: (expression?: (x: T) => boolean) => T;
    getDefault: () => T;
    
    filter(callbackfn: (value: T, index: number, array: IEnumerable<T>) => boolean, thisArg?: IEnumerable<T>): IEnumerable<Boolean>;
    find(callbackfn: (value: T, index: number, array: IEnumerable<T>) => boolean, thisArg?: IEnumerable<T>): IEnumerable<T>;
    map<TOut>(callbackfn: (value: T, index: number, array: IEnumerable<T>) => TOut, thisArg?: IEnumerable<T>): IEnumerable<TOut>;

    /**
      * Gets or sets the length of the array. This is a number one higher than the highest element defined in an array.
      */
    length: number;
    /**
      * Returns a string representation of an array.
      */
    toString(): string;
    toLocaleString(): string;
    /**
      * Appends new elements to an array, and returns the new length of the array.
      * @param items New elements of the Array.
      */
    push(...items: T[]): number;
    /**
      * Removes the last element from an array and returns it.
      */
    pop(): T;
    /**
      * Combines two or more arrays.
      * @param items Additional items to add to the end of array1.
      */
    concat<U extends T[]>(...items: U[]): T[];
    /**
      * Combines two or more arrays.
      * @param items Additional items to add to the end of array1.
      */
    concat(...items: T[]): T[];
    /**
      * Adds all the elements of an array separated by the specified separator string.
      * @param separator A string used to separate one element of an array from the next in the resulting String. If omitted, the array elements are separated with a comma.
      */
    join(separator?: string): string;
    /**
      * Reverses the elements in an Array. 
      */
    reverse(): T[];
    /**
      * Removes the first element from an array and returns it.
      */
    shift(): T;
    /** 
      * Returns a section of an array.
      * @param start The beginning of the specified portion of the array.
      * @param end The end of the specified portion of the array.
      */
    slice(start?: number, end?: number): T[];

    /**
      * Sorts an array.
      * @param compareFn The name of the function used to determine the order of the elements. If omitted, the elements are sorted in ascending, ASCII character order.
      */
    sort(compareFn?: (a: T, b: T) => number): T[];

    /**
      * Removes elements from an array and, if necessary, inserts new elements in their place, returning the deleted elements.
      * @param start The zero-based location in the array from which to start removing elements.
      */
    splice(start: number): T[];

    /**
      * Removes elements from an array and, if necessary, inserts new elements in their place, returning the deleted elements.
      * @param start The zero-based location in the array from which to start removing elements.
      * @param deleteCount The number of elements to remove.
      * @param items Elements to insert into the array in place of the deleted elements.
      */
    splice(start: number, deleteCount: number, ...items: T[]): T[];

    /**
      * Inserts new elements at the start of an array.
      * @param items  Elements to insert at the start of the Array.
      */
    unshift(...items: T[]): number;

    /**
      * Returns the index of the first occurrence of a value in an array.
      * @param searchElement The value to locate in the array.
      * @param fromIndex The array index at which to begin the search. If fromIndex is omitted, the search starts at index 0.
      */
    indexOf(searchElement: T, fromIndex?: number): number;

    /**
      * Returns the index of the last occurrence of a specified value in an array.
      * @param searchElement The value to locate in the array.
      * @param fromIndex The array index at which to begin the search. If fromIndex is omitted, the search starts at the last index in the array.
      */
    lastIndexOf(searchElement: T, fromIndex?: number): number;

    /**
      * Determines whether all the members of an array satisfy the specified test.
      * @param callbackfn A function that accepts up to three arguments. The every method calls the callbackfn function for each element in array1 until the callbackfn returns false, or until the end of the array.
      * @param thisArg An object to which the this keyword can refer in the callbackfn function. If thisArg is omitted, undefined is used as the this value.
      */
    every(callbackfn: (value: T, index: number, array: T[]) => boolean, thisArg?: any): boolean;

    /**
      * Determines whether the specified callback function returns true for any element of an array.
      * @param callbackfn A function that accepts up to three arguments. The some method calls the callbackfn function for each element in array1 until the callbackfn returns true, or until the end of the array.
      * @param thisArg An object to which the this keyword can refer in the callbackfn function. If thisArg is omitted, undefined is used as the this value.
      */
    some(callbackfn: (value: T, index: number, array: T[]) => boolean, thisArg?: any): boolean;

    /**
      * Performs the specified action for each element in an array.
      * @param callbackfn  A function that accepts up to three arguments. forEach calls the callbackfn function one time for each element in the array. 
      * @param thisArg  An object to which the this keyword can refer in the callbackfn function. If thisArg is omitted, undefined is used as the this value.
      */
    forEach(callbackfn: (value: T, index: number, array: T[]) => void, thisArg?: any): void;

    /**
      * Calls the specified callback function for all the elements in an array. The return value of the callback function is the accumulated result, and is provided as an argument in the next call to the callback function.
      * @param callbackfn A function that accepts up to four arguments. The reduce method calls the callbackfn function one time for each element in the array.
      * @param initialValue If initialValue is specified, it is used as the initial value to start the accumulation. The first call to the callbackfn function provides this value as an argument instead of an array value.
      */
    reduce(callbackfn: (previousValue: T, currentValue: T, currentIndex: number, array: T[]) => T, initialValue?: T): T;
    /**
      * Calls the specified callback function for all the elements in an array. The return value of the callback function is the accumulated result, and is provided as an argument in the next call to the callback function.
      * @param callbackfn A function that accepts up to four arguments. The reduce method calls the callbackfn function one time for each element in the array.
      * @param initialValue If initialValue is specified, it is used as the initial value to start the accumulation. The first call to the callbackfn function provides this value as an argument instead of an array value.
      */
    reduce<U>(callbackfn: (previousValue: U, currentValue: T, currentIndex: number, array: T[]) => U, initialValue: U): U;

    /** 
      * Calls the specified callback function for all the elements in an array, in descending order. The return value of the callback function is the accumulated result, and is provided as an argument in the next call to the callback function.
      * @param callbackfn A function that accepts up to four arguments. The reduceRight method calls the callbackfn function one time for each element in the array. 
      * @param initialValue If initialValue is specified, it is used as the initial value to start the accumulation. The first call to the callbackfn function provides this value as an argument instead of an array value.
      */
    reduceRight(callbackfn: (previousValue: T, currentValue: T, currentIndex: number, array: T[]) => T, initialValue?: T): T;
    /** 
      * Calls the specified callback function for all the elements in an array, in descending order. The return value of the callback function is the accumulated result, and is provided as an argument in the next call to the callback function.
      * @param callbackfn A function that accepts up to four arguments. The reduceRight method calls the callbackfn function one time for each element in the array. 
      * @param initialValue If initialValue is specified, it is used as the initial value to start the accumulation. The first call to the callbackfn function provides this value as an argument instead of an array value.
      */
    reduceRight<U>(callbackfn: (previousValue: U, currentValue: T, currentIndex: number, array: T[]) => U, initialValue: U): U;

    [n: number]: T;
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

Array.prototype['filter'] = function (callbackfn) { return EnumExtensions.$filter(callbackfn, this); };
Array.prototype['find'] = function (callbackfn) { return EnumExtensions.$find(<any>callbackfn, this); };
Array.prototype['map'] = function (callbackfn) { return EnumExtensions.$map(<any>callbackfn, this); };
// ReSharper restore CallerCalleeUsing