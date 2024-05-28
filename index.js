class HashMap {
  currentCapacity = 16;
  currentLoad = 0;  
  maxLoadFactor = this.currentCapacity * 0.75;
  map = new Array(16).fill(null);

  hash(key) {
    let hashCode = 0;

    const primeNumber = 37;
    for (let i= 0; i < key.length; i++) {
      let hashValue = primeNumber * hashCode + key.charCodeAt(i);
      hashCode = hashValue % this.currentCapacity;
    }
    console.log(hashCode);
    return hashCode;
  
  }

  set(key, value) {
    const keyHash = this.hash(key);
    let bucket = this.map[keyHash];
    if (bucket === null) {
      this.map[keyHash] = new node(value);
      this.currentLoad += 1;
    } else if (bucket instanceof node) {      
      while (bucket.nextNode !== null) {
        if (bucket.value === value) {
          return
        }
        bucket = bucket.nextNode;
      }
      if (bucket.value === value) {
        return;
      }
      bucket.nextNode = new node(value);
      this.currentLoad += 1;
    }
  }
}

class node {
  constructor(value, nextNode = null) {
    this.value = value;
    this.nextNode = nextNode;
  }  
}

let test = new HashMap;
test.set('Marko', 4);
test.set('Marko', 5);
console.log(test);