class HashMap {
  currentCapacity = 16;
  currentLoad = 0;  
  maxLoadFactor = this.currentCapacity * 0.75;
  map = new Array(this.currentCapacity).fill(null);

  hash(key) {
    let hashCode = 0;

    const primeNumber = 37;
    for (let i= 0; i < key.length; i++) {
      let hashValue = primeNumber * hashCode + key.charCodeAt(i);
      hashCode = hashValue % this.currentCapacity;
    }
    return hashCode;
  
  }

  set(key, value) {
    const keyHash = this.hash(key);
    let bucket = this.map[keyHash];
    if (bucket === null) {
      this.map[keyHash] = new node(key, value);
      this.currentLoad += 1;
    } else if (bucket instanceof node) {      
      while (!bucket[key] && bucket.nextNode !== null) {        
        bucket = bucket.nextNode;
      }
      if (bucket.nextNode === null) {
        if (bucket[key]) {
          bucket[key] = value;
        } else {
          bucket.nextNode = new node(key, value);
          this.currentLoad += 1;
          return
        }
      } else {
        bucket[key] = value;
        return
      }
    }
    //Add function that grows ammount of buckets when currentLoad reaches maximum level
  }

  get(key) {
    const keyHash = this.hash(key);
    let bucket = this.map[keyHash];
    if (this.map[keyHash] === null) {
      return null;
    }
    while (!bucket[key] && bucket.nextNode !== null) {
      bucket = bucket.nextNode;
    }
    if (bucket[key]) {
      return bucket[key];
    }
    return null;
  }

  has(key) {
    const keyHash = this.hash(key);
    let bucket = this.map[keyHash];
    if (bucket === null) {
      return false;
    }
    while (bucket.nextNode !== null) {
      if (bucket[key]) {
        return true;
      }
      bucket = bucket.nextNode;
    }
    if (bucket[key]) {
      return true;
  }
  return false;
}

  remove(key) {
    const keyHash = this.hash(key);
    let bucket = this.map[keyHash];
    if (this.map[keyHash] === null) {return false;}
    if (bucket[key]) {
      this.map[keyHash] = bucket.nextNode;
      return true;
    }
    while (bucket.nextNode !== null && !bucket.nextNode[key]) {
      bucket = bucket.nextNode;
    }
    if (bucket.nextNode[key]) {
      if (bucket.nextNode.nextNode === null) {
        bucket.nextNode = null;
        return true;
      } else {
        bucket.nextNode = bucket.nextNode.nextNode;
        return true;
      }
    }
    return false;
  }

  length() {
    let count = 0;
    this.map.forEach(element => {
      if (element !== null) {
        count += 1;
        while (element.nextNode) {
          count += 1;
          element = element.nextNode;
        }
      }
    });
    return count;
  }

  clear() {
    this.map = new Array(this.currentCapacity).fill(null);
    return;
  }
}

class node {
  constructor(key, value, nextNode = null) {
    this[key] = value;
    this.nextNode = nextNode;
  }  
}

let test = new HashMap;
test.set('Marko', 4);
test.set('Marko', 5);
test.set('aMrko', 24);
test.set('Marok', 89);
test.set('Zuzana', 8);
test.set('Denis', 2);
test.get('Marko');
test.has('Amrko');
test.remove('aMrko');
test.length();
test.clear();

console.log(test.map);