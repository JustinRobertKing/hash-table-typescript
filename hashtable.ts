interface IHashItem<T> {
	[key: string]: T;
}

class HashTable<T> {
	constructor(
		private _size: number,
		private _data: Array<Array<IHashItem<T>>> = []
	){
		for (let i = 0; i < this._size; i++) {
			this._data.push([])
		}
	}

	hashFunction(key: string): number {
	  let hash = 0;
	  if (key.length === 0) {
	      return hash;
	  }
	  for (let i = 0; i < key.length; i++) {
	      let char = key.charCodeAt(i);
	      hash = ((hash << 5) - hash) + char;
	      hash = hash & hash; // Convert to 32bit integer
	  }
	  return hash;
	}

	hashKeyToIndex(key: string): number {
		let hashKey = this.hashFunction(key);
		let index = hashKey % this._size;
		return index;
	}

	insert(key: string, value: T): void {
		let hashIndex = this.hashKeyToIndex(key);
		let item = {} as IHashItem<T>;
		item[key] = value;
		this._data[hashIndex].push(item);
	}

	search(key: string): IHashItem<T> {
		let hashIndex = this.hashKeyToIndex(key);
		for (let i = 0; i < this._data[hashIndex].length; i++) {
			if  (this._data[hashIndex][i].hasOwnProperty(key)) {
				return this._data[hashIndex][i]
			}
		}
		return null as IHashItem<T>;
	}

	delete(key: string): IHashItem<T> {
		let hashIndex = this.hashKeyToIndex(key);
		for (let i = 0; i < this._data[hashIndex].length; i++) {
			if (this._data[hashIndex][i].hasOwnProperty(key)) {
				return this._data[hashIndex].splice(i, 1,)[0];
			}
		}
		return null as IHashItem<T>;
	}
}