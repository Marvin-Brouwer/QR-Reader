'use-strict';

class PatternHelper {
    public static matchBetweenKeyAndSemicolon(key: string, data: string): string {
        let filterRegEx = (key) => new RegExp(`(${key}:\\s*)([^;]+)+`, 'mi');
        let match = data.match(filterRegEx(key));
        return !filterRegEx(key).test(data) ? String()
            : match.length !== 3 ? String()
                : match[2];
    }
}