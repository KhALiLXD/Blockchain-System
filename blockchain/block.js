const crypto = require('crypto');

class Block {
  constructor(height, timestamp, data, previousHash = '') {
    this.height = height;
    this.timestamp = timestamp;
    this.merkle_root = 0; 
    this.data = data;
    this.previousHash = previousHash;
    this.nonce = 0; 
    this.hash = this.calculateHash(); 
  }

  calculateHash() {
    const data = this.height + this.timestamp + this.merkle_root + JSON.stringify(this.data) + this.previousHash + this.nonce;
    return crypto.createHash('sha256').update(data).digest('hex');
  }

  mineBlock(difficulty) {
    const target = "0".repeat(difficulty);
    while (this.hash.startsWith(target) === false) {
      this.nonce++;
      this.hash = this.calculateHash();
    }
  }
}

module.exports = Block;