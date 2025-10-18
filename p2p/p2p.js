// p2p.js
const WebSocket = require('ws');
const { Server } = WebSocket; 
const { blockchain } = require('../modules/blockchain.js'); 
const Block = require('../blockchain/block.js');

const sockets = [];

const CONNECTION_EVENTS = {
  REQ_CHAIN: "REQ_CHAIN",
  RES_CHAIN: "RES_CHAIN",
  NEW_BLOCK: "NEW_BLOCK"
};

const send = (ws, obj) => {
  if (ws.readyState === WebSocket.OPEN) ws.send(JSON.stringify(obj));
}

const broadcast = (obj)=> {
  const data = JSON.stringify(obj);
  sockets.forEach(s => s.readyState === WebSocket.OPEN && s.send(data));
}

const initConnection = (ws) => {
  sockets.push(ws);
  console.log('[WS] peer connected. total:', sockets.length);

  send(ws, { type: 'HELLO', from: process.env.NODE_NAME });
  ws.on('message', (message) => {
    const text = typeof message === 'string' ? message : message.toString();
    const msg = JSON.parse(text);

    const { type, from } = msg; 

    switch (type) {
      case 'HELLO':
        send(ws, { type: "WELCOME", from: process.env.NODE_NAME });
        break;
      case 'WELCOME':
        console.log(`[WS] connection established with ${from}`);
        send(ws, { type: "GET_STATUS" });
        break;
      case 'GET_STATUS':
        send(ws, { type: "RES_CHAIN", chain: blockchain.blocksExplorer(), from: process.env.NODE_NAME });
        break;

      case 'RES_CHAIN':
        const fixed = msg.chain.map(b => Object.setPrototypeOf(b, Block.prototype));
        const prev = blockchain.chain; 
        blockchain.chain = fixed;
        if (fixed.length > prev.length && blockchain.checkChainValidity()) {
          console.log(`[WS] chain updated from ${from}`);
        } else {
          blockchain.chain = prev;
        }
        break;
      case 'NEW_BLOCK':
        const newBlock = Object.setPrototypeOf(msg.block, Block.prototype); // نحول ال OBJECT من عادي ل CLASS OBJECT BLOCK (اكشتفت الحل هاد بعد معاناة 🥲😂)
        const lastBlock = blockchain.getLastBlock();
        if (newBlock.previousHash === lastBlock.hash && newBlock.height === lastBlock.height + 1 && newBlock.hash === newBlock.calculateHash()) {
          blockchain.chain.push(newBlock);
          console.log(`[WS] new block added from ${from}`);
        } else {
          send(ws, { type: "REQ_CHAIN" });
        }
        break;
    }
    // console.log(`[WS] got: `,msg);
    
  });

  const close = () => {
    const i = sockets.indexOf(ws);
    if (i !== -1) sockets.splice(i, 1);
    console.log('[WS] peer closed. total:', sockets.length);
  };
  ws.on('close', close);
  ws.on('error', close);
}

const startP2P = (port) => {
  const wss = new Server({ port });
  wss.on('connection', initConnection);
  console.log(`[WS] listening on ws://localhost:${port}`);
}

const connectToPeers = (urls = []) => {
  urls.forEach((url) => {
    const ws = new WebSocket(url);
    ws.on('open', () => {
      console.log('[WS] connected to', url);
      initConnection(ws); 
    });
    ws.on('error', (e) => {
      console.warn('[WS] connect error:', url, e.message);
    });
  });
}

module.exports = { startP2P, connectToPeers, broadcast, send, MSG: CONNECTION_EVENTS };
