function removeElement(nums: number[], val: number): number {
    const filtered = nums.filter(k => k !== val);
    filtered.forEach((n, i) => nums[i] = n);
    return filtered.length;
};