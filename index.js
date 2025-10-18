const Blockchain = require('./blockchain/chain.js')
const express =require('express')
require('dotenv').config();

const app = express()
app.use(express.json());     
const port = process.env.HTTP_PORT || 3000;
const { startP2P, connectToPeers } = require('./p2p/p2p.js');

const P2P_PORT = Number(process.env.P2P_PORT || 6001);
const PEERS = (process.env.PEERS || '').split(',').map(s => s.trim()).filter(Boolean);

startP2P(P2P_PORT);
connectToPeers(PEERS);

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