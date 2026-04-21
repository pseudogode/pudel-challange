const mergeSorted = (arr: number[], buffer: number[], lo: number, hi: number, mid: number) => {
    let i = lo;
    let j = mid + 1;
    let k = lo;
    while (i <= mid && j <= hi) {
        if (arr[i] < arr[j]) {
            buffer[k++] = arr[i++];
        }
        else {
            buffer[k++] = arr[j++];
        }
    }
    while (i <= mid) {
        buffer[k++] = arr[i++];
    }
    while (j <= hi) {
        buffer[k++] = arr[j++];
    }
    for (i = lo; i <= hi; ++i) {
        arr[i] = buffer[i];
    }
}

const mergeSort = (arr: number[]) => 
{
    const buffer = new Array(arr.length);
    const mergeSortHelper = (a: number[], lo: number, hi: number) => {
        if (lo >= hi) return;
        const mid = Math.floor((lo + hi) / 2);
        mergeSortHelper(arr, lo, mid);
        mergeSortHelper(arr, mid + 1, hi);
        mergeSorted(arr, buffer, lo, hi, mid);
    }
    mergeSortHelper(arr, 0, arr.length - 1);
}

function sortArray(nums: number[]): number[] {
    mergeSort(nums);
    return nums;
};