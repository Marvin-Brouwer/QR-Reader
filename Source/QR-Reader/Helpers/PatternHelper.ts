class PatternHelper {
    public static matchBetweenKeyAndSemicolon(key: string, data: string): string {
        let filterRegEx = (): RegExp => new RegExp(`(${key}:\\s*)([^;]+)+`, 'mi');
        let match = data.match(filterRegEx());
        return !filterRegEx().test(data) ? String()
            : match.length !== 3 ? String()
                : match[2];
    }
}