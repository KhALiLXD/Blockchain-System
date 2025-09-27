const { broadcast } = require('../p2p/p2p.js');
const { blockchain } = require('../modules/blockchain.js'); 

exports.getBlocks = (req, res) => {
    const blocks = blockchain.blocksExplorer();
    res.send(blocks);
}

exports.mineblock = (req, res) => {
    const data = req.body;
    const result = blockchain.setBlock(data);
    if (result.success) {
        broadcast({ type: "NEW_BLOCK", block: blockchain.getLastBlock(), from: process.env.NODE_NAME });
        res.status(201).send(result);
    }
    else {
        res.status(500).send(result);
    }
}

exports.getblock = (req, res) => {
    const height = parseInt(req.params.height);
    const block = blockchain.getBlock(height);
    if (block) {
        res.send(block);
    } else {
        res.status(404).send({ message: "Block not found" });
    }
}

exports.checkChainValidity = (req, res) => {
    const isValid = blockchain.checkChainValidity();
    if (isValid) {
        res.send({ message: "Blockchain is valid" });
    }
    else {
        res.status(500).send({ message: "Blockchain is compromised" });
    }
}