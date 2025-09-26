# Simple Blockchain (Node.js)
`Important Note: this project fully made by me, only boring documentation part was assisted by ChatGPT.`
 - This is the 1st Assignment of Blockchain development.
## 📂 Project Structure

```
/assets
  ├── block.js   # Block class (structure, hashing, mining)
  └── chain.js   # Blockchain class (genesis, add block, explorer,get block)
index.js         # Entry point, demo usage
```

---

## 🧱 Features

* **Block class**:

  * `height`, `timestamp`, `data`, `previousHash`, `nonce`, `hash`
  * `calculateHash()` → computes SHA-256 hash of the block
  * `mineBlock(difficulty)` → Proof-of-Work: finds a nonce such that the hash starts with N zeros

* **Blockchain class**:

  * Creates a **genesis block**
  * `setBlock(data)` → mines and adds a new block
  * `getBlock(height)` → retrieves block by height
  * `getLastBlock()` → returns latest block
  * `blocksExplorer()` → prints full chain

* **Centralized system**:
  All data is managed in a single process — there is no peer-to-peer network.

---

## 🚀 Usage

### Run

```bash
node index.js
```

### 3. Example Output

```
Mining started...
New block Generated
 Block {
   height: 1,
   timestamp: '1758789014436',
   data: { amount: 100 },
   previousHash: '949d27...',
   nonce: 39,
   hash: '00e61e7...93bf5'
 }
Mining took 2.8 ms
```

---

## 🧪 Testing

* **Add new blocks**:

  ```js
  myBlockchain.setBlock({ amount: 150 });
  ```
* **Explore chain**:

  ```js
  myBlockchain.blocksExplorer();
  ```
* **Tamper test** (commented in `index.js`):

  * Change a block’s data
  * Compare `block.hash` vs `block.calculateHash()`
  * Result: mismatch proves the chain is broken without re-mining

---

## 📖 Notes

* Difficulty is currently set to `4` (see `chain.js`).
* Mining time grows exponentially with difficulty.
* This is a **teaching demo**, not production-ready.

---

## ✨ Assignment Requirement

* ✅ Full blockchain structure (Block + Blockchain classes)
* ✅ Functions: setBlock, getBlock, blocksExplorer, mineBlock
* ✅ Central system (no networking, one chain instance)
* ✅ Uploaded to GitHub with README

---
# Made with 💖 By Khalil Alyacoubi - 120210461