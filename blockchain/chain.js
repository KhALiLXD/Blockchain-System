const Block = require('./block.js')
class Blockchain {
    constructor() {
        this.chain = [this.createGenesisBlock()];
        this.difficulty = 4;
    }
    createGenesisBlock() {
        return new Block(0, Date.now(), { amount: 0 }, "0");
    }
    getLastBlock(){
        return this.chain.at(-1);
    }

    setBlock(data){
        const prev = this.getLastBlock();
        const newBlock = new Block(prev.height + 1, Date.now(), data, prev.hash);
        console.log('Mining started...');
        const t0 = performance.now();
        newBlock.mineBlock(this.difficulty);
        if (this.checkChainValidity()) {
            this.chain.push(newBlock);
            const t1 = performance.now();
            console.log("\x1b[32m%s\x1b[0m","[System] New block Generated\n", this.getLastBlock());
            console.log(`Mining took ${(t1 - t0).toFixed(1)} ms`);
            return {
                success: true,
                message: "Block added successfully",
                timetaken: (t1 - t0).toFixed(1),
                newBlock
            };
         
        }else{
            console.log("\x1b[31m%s\x1b[0m","[error] Chain compromised, block not added");
            return {
                success: false,
                message: "Chain compromised, block not added"
            }
        }

    }
    
    getBlock(height){
        return this.chain.find(block => block.height === height);
    }
  blocksExplorer() {
  
    return this.chain;
}
    checkChainValidity(limit = 6){
        const chain = this.chain.slice(limit * -1);
        for (let index = 0; index < chain.length; index++) {
            const block = chain[index];
            const prevBlock = chain[index - 1];
            if (block.hash !== block.calculateHash()) {
                return false;
            }
            if (index > 0 && block.previousHash !== prevBlock.hash) {
                return false;
            }
            if (index > 0 && !block.hash.startsWith("0".repeat(this.difficulty))) {
                return false;
            }
        }
        return true;
    }

}

module.exports = Blockchain;