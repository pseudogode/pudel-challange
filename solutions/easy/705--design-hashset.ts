    class MyHashSet {
    private _store: number[] = [];
    constructor() {}

    add(key: number): void {
        if (!this.contains(key)) {
            this._store.push(key);
        }
    }

    remove(key: number): void {
        const target = this._store.findIndex(k => k === key);
        if (target !== -1) {
            this._store[target] = -1;
        }
    }

    contains(key: number): boolean {
        return this._store.includes(key);        
    }
}

/**
 * Your MyHashSet object will be instantiated and called as such:
 * var obj = new MyHashSet()
 * obj.add(key)
 * obj.remove(key)
 * var param_3 = obj.contains(key)
 */