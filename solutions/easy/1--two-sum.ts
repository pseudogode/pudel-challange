function twoSum(nums: number[], target: number): number[] {
    const indexMap = nums.reduce((acc, curr, index) => {
        acc[`${target - curr}`] = index;
        return acc;
    }, {});
    const firstIndex = nums.findIndex((num, index) => Boolean(indexMap[num]) && indexMap[num] !== index);
    return [firstIndex, indexMap[nums[s]]];
};