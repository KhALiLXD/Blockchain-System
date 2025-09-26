# Centralized Blockchain API (Node.js)
`Important Note: this project fully made by me, only boring documentation part was assisted by ChatGPT.`

This repository contains a **centralized blockchain API** for the second assignment. One process (single authority) creates, mines, validates, and serves the chain. **No peer-to-peer networking** — this is an educational model to demonstrate blockchain mechanics in a central system.

---

## 📂 Project Structure

```
/assets
  ├── block.js    # Block class (structure, hashing, mining)
  └── chain.js    # Blockchain class (genesis, add/get/explore, validation)
/controllers
  └── blockchain.controller.js   # Logic for handling requests
/routes
  └── blockchain.routes.js       # Express routes mapping
index.js       # Express app (API entry point)
package.json   # scripts, dependencies
README.md
```

---

## 🌐 API Documentation

**Base URL:** `http://localhost:3000`

### Endpoints

#### 1. Get All Blocks

**GET** `/blocks`

* Returns the full blockchain.

**Response 200**

```json
[
  {
    "height": 0,
    "timestamp": 1758789014435,
    "data": { "amount": 0 },
    "previousHash": "0",
    "nonce": 0,
    "hash": "949d27..."
  },
  {
    "height": 1,
    "timestamp": 1758789014436,
    "data": { "amount": 100 },
    "previousHash": "949d27...",
    "nonce": 39,
    "hash": "00e61e7..."
  }
]
```

---

#### 2. Get Block by Height

**GET** `/block/:height`

* Path param: `height` → block index.

**Response 200**

```json
{
  "height": 1,
  "timestamp": 1758789014436,
  "data": { "amount": 100 },
  "previousHash": "949d27...",
  "nonce": 39,
  "hash": "00e61e7..."
}
```

**Response 404**

```json
{ "error": "Block not found" }
```

---

#### 3. Mine a New Block

**POST** `/mine`

* Body JSON:

```json
{
  "data": { "amount": 150, "note": "invoice#123" }
}
```

**Response 201**

```json
{
    "success": true,
    "message": "Block added successfully",
    "timetaken": "440.4",
    "newBlock": {
        "height": 5,
        "timestamp": 1758877636832,
        "previousHash": "00008f53728276..",
        "nonce": 225474,
        "hash": "00008c50ea3fbc.."
    }
}
```

**Response 500**

```json
{
  "success": false,
  "message": "Chain compromised, block not added"
}
```

---

#### 4. Validate Blockchain

**GET** `/validate`

* Checks chain linkage, integrity, and Proof of Work.

**Response 200**

```json
{ "message": "Blockchain is valid"}
```

**Response 500**

```json
{ "message": "Blockchain is compromised" }
```

---

## 🚀 Running the API

```bash
npm install
npm start
```

Server starts at `http://localhost:3000`.

---

## 🧪 Notes

* Difficulty is set in `chain.js` (default = 4).
* Mining time increases exponentially with difficulty.
* Centralized design: all requests are handled by **one server**.

---

## ✨ Assignment Checklist

* ✅ Full blockchain structure (Block + Blockchain)
* ✅ Functions exposed via API: `setBlock`, `getBlock`, `blocksExplorer`, `mineBlock`, `validateChain`
* ✅ Central system (single authority API)
* ✅ Uploaded to GitHub with README

---

# Made with 💖 by Khalil Alyacoubi – 120210461
