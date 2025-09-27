# Simple Decentralized Blockchain with P2P (Node.js)
> Important Note: this project fully made by me, only boring documentation part was assisted by ChatGPT.

## 📌 Overview

This project is a **minimal blockchain system** built with Node.js.
It supports:

* Mining blocks with Proof of Work (adjustable difficulty).
* Running multiple nodes on different ports.
* P2P synchronization between nodes using WebSockets.
* REST API for interacting with the blockchain.
* Process management and testing via **PM2**.

---

## ⚙️ Features

* **Blockchain Core**
  Each node maintains its own chain and validates new blocks.

* **P2P Network**
  Nodes connect to each other using WebSockets.
  Messages include:

  * `HELLO / WELCOME` → handshake
  * `REQ_CHAIN / RES_CHAIN` → syncing the full chain
  * `NEW_BLOCK` → broadcasting mined blocks to all peers

* **Consensus**

  * On startup, a node requests the chain from its peers.
  * If a longer valid chain is found → it replaces its own.
  * When a new block is mined, it’s broadcast to the network and appended if valid.

* **REST API**

  * `GET /blocks` → view the chain
  * `POST /mine` → mine a new block with data payload

---

## 🚀 Run Locally

### 1. Install dependencies

```bash
npm install
```

### 2. Run one node
> This will run a test of three nodes on ports 3001, 3002, and 3003.
```bash
pm2 start ecosystem.config.js
```
### 3. Test mining

- Same as Assiment 2 endpoints.

The new block will be broadcasted to **all connected peers** and added to their chains if valid.

---

## 🔄 Sync Logic

* When a node connects, it sends `REQ_CHAIN`.
* Peers reply with `RES_CHAIN` (their chain).
* The new node compares lengths:

  * If the peer chain is longer and valid → it replaces its own.
* When a block is mined, it’s broadcast as `NEW_BLOCK`.
* Peers verify:

  * `previousHash` matches their last block
  * `height` is correct
  * `hash` is valid Proof of Work
* If valid → they append it.

---

## 📝 Notes

* Genesis block is the same for all nodes (same timestamp/data).
* Chain validity checks ensure no invalid blocks are added.
* This is a **learning project** → simplified (no Merkle Trees, no transactions pool).


# Made with ❤️ by Khalil Alyacoubi - 120210461