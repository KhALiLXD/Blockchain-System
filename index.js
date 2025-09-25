const Blockchain = require('./assets/chain.js')


// Create a new blockchain instance
const myBlockchain = new Blockchain();



// Create the genesis block
t0 = performance.now();
console.log('Mining started...');
myBlockchain.setBlock({ amount: 100 })
t1 = performance.now();
console.log("New block Generated\n", myBlockchain.getLastBlock());
console.log(`Mining took ${(t1 - t0).toFixed(1)} ms`);




// console.log(myBlockchain.blocksExplorer());

/* ==============[ Testing ]================*/
// console.log('tying to change block data')
// const b1 = myBlockchain.getBlock(0); 
// const originalHash = b1.hash;
// b1.data = { amount: 10000 };
// const recalculated = b1.calculateHash();
// console.log("original:", originalHash);
// console.log("recalc  :", recalculated);
// console.log("changed :", originalHash !== recalculated); // لازم true