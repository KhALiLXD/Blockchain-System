const Blockchain = require('../blockchain/chain.js');
const myBlockchain = new Blockchain();
exports.getBlocks = (req, res) => {
    const blocks = myBlockchain.blocksExplorer();
    res.send(blocks);
}

exports.mineblock = (req, res) => {
    const data = req.body;
    const result = myBlockchain.setBlock(data);
    if (result.success) {
        res.status(201).send(result);
    }
    else {
        res.status(500).send(result);
    }
}

exports.getblock = (req, res) => {
    const height = parseInt(req.params.height);
    const block = myBlockchain.getBlock(height);
    if (block) {
        res.send(block);
    } else {
        res.status(404).send({ message: "Block not found" });
    }
}

exports.checkChainValidity = (req, res) => {
    const isValid = myBlockchain.checkChainValidity();
    if (isValid) {
        res.send({ message: "Blockchain is valid" });
    }
    else {
        res.status(500).send({ message: "Blockchain is compromised" });
    }
}