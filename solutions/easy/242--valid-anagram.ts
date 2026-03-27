function isAnagram(s: string, t: string): boolean {
    const tArray = t.split('').sort();
    const tLength = t.length;
    return s.length === tLength && s.split('').sort().every((el, index) => tArray[index] === el);
};