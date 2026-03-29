function groupAnagrams(strs: string[]): string[][] {
    return Object.values(_.groupBy(strs, str => str.split('').sort().join('')));
};