function majorityElement(nums: number[]): number {
    let candidate = nums[0];
    let cCount = 1;
    const len = nums.length;
    let n;
    for (let i = 1; i < nums.length; ++i) {
        n = nums[i];
        if (n === candidate) {
            cCount ++;
        }
        else {
            if (cCount === 0) {
                candidate = n;
            }
            else {
                cCount --;
            }
        }
    }
    return candidate;
};