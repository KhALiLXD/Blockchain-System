const Blockchain = require('./blockchain/chain.js')
const express =require('express')

const app = express()
const port = 2525;



app.use('/', require('./routes/blockchain.routes.js'));


app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
// Create a new blockchain instance



// Create the genesis block
// t0 = performance.now();
// console.log('Mining started...');
// myBlockchain.setBlock({ amount: 100 })
// t1 = performance.now();
// console.log(`Mining took ${(t1 - t0).toFixed(1)} ms`);
// myBlockchain.checkChainValidity(2);




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