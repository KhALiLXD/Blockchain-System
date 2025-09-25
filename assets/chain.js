const Block = require('./block.js')
class Blockchain {
    constructor() {
        this.chain = [this.createGenesisBlock()];
        this.difficulty = 4;
    }
    createGenesisBlock() {
        return new Block(0, Date.now().toString(), { amount: 0 }, "0");
    }
    getLastBlock(){
        return this.chain.at(-1);
    }
    setBlock(data){
        const prev = this.getLastBlock();
        const newBlock = new Block(prev.height + 1, Date.now().toString(), data, prev.hash);
        newBlock.mineBlock(this.difficulty);
        this.chain.push(newBlock);
        return newBlock;
    }
    
    getBlock(height){
        return this.chain.find(block => block.height === height);
    }
  blocksExplorer() {
    const out = JSON.stringify(this.chain, null, 2);
    console.log(out);
    return out;
}

}

module.exports = Blockchain;