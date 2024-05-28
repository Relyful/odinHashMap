class HashMap {
  currentCapacity = 16;
  currentLoad = 0;  
  maxLoadFactor = this.currentCapacity * 0.75;
  map = [].fill(null, 0, 15);

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

  // set(key, value) {

  // }
}

let test = new HashMap;
test.hash('Marko');
console.log(test);