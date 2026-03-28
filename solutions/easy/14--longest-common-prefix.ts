function longestCommonPrefix(strs: string[]): string {
    let shortestIndex = 0; 
    let shortestLength = strs[0].length;

    strs.forEach((str, index) => {
        if (str.length < shortestLength) {
            shortestLength = str.length;
            shortestIndex = index;
        }
    });

    let commonPrefixArr = strs[shortestIndex].split('');
    strs.forEach(str => {
        const index = commonPrefixArr.findIndex((c, i) => c !== str.at(i));
        if (index !== -1) {
            commonPrefixArr = commonPrefixArr.slice(0, index);
        }
    });
    return commonPrefixArr.join('');
};