class MyHashMap {
    private _store: [number,number][] = [];
    constructor() {}

    put(key: number, value: number): void {
        const index = this._store.findIndex(([k,]) => key === k);
        if (index === -1) {
            this._store.push([key, value]);
            return;
        }
        this._store[index] = [key, value];
    }

    get(key: number): number {
        const [, value] = this._store.find(([k,]) => key === k) ?? [];
        return value ?? -1;
    }

    remove(key: number): void {
        const index = this._store.findIndex(([k,]) => key === k);
        if (index !== -1) {
            this._store[index] = [-1, -1];
        }
    }
}

/**
 * Your MyHashMap object will be instantiated and called as such:
 * var obj = new MyHashMap()
 * obj.put(key,value)
 * var param_2 = obj.get(key)
 * obj.remove(key)
 */