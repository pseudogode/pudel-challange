function containsDuplicate(nums: number[]): boolean {
    return nums.sort().some((el, index) => el === nums[index + 1]);
};