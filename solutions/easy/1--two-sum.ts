function twoSum(nums: number[], target: number): number[] {
    const indexMap = nums.reduce((acc, curr, index) => {
            acc[`${target - curr}`] = index;
            return acc;
        }, {});
    const s = nums.findIndex((num, index) => Boolean(indexMap[num]) && indexMap[num] !== index);
    return [s, indexMap[nums[s]]];
};