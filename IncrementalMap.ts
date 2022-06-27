class IncrementalMap<K = any, V = any> {
  private _currentSnapshot: number = 0;
  private _snapshots: Map<K, V>[] = [];

  snapshot(snapshotNumber: number) {
    if (snapshotNumber < 0) throw new Error('Snapshot must be greater then 0');
    this._currentSnapshot = snapshotNumber;
  }

  set(key: K, value: V) {
    this._snapshots[this._currentSnapshot] = this._snapshots[this._currentSnapshot]
      ? this._snapshots[this._currentSnapshot].set(key, value)
      : new Map().set(key, value);
  }

  get(key: K): V {
    for (
      let snapshotNumber = this._currentSnapshot;
      snapshotNumber >= 0;
      snapshotNumber -= 1
    ) {
      const value = this._snapshots[snapshotNumber]?.get(key);
      if (value !== undefined) return value;
    }
    return undefined;
  }
}
