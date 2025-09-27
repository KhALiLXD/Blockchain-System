module.exports = {
  apps: [
    {
      name: "node-A",
      script: "index.js",
      watch: true,
      env: {
        NODE_NAME: "node-A",
        HTTP_PORT: 3001,
        P2P_PORT: 6001,
        PEERS: "ws://localhost:6002,ws://localhost:6003"
      }
    },
    {
      name: "node-B",
      script: "index.js",
      watch: true,

      env: {
        NODE_NAME: "node-B",
        HTTP_PORT: 3002,
        P2P_PORT: 6002,
        PEERS: "ws://localhost:6001,ws://localhost:6003"
      }
    },
    {
      name: "node-C",
      script: "index.js",
      watch: true,

      env: {
        NODE_NAME: "node-C",
        HTTP_PORT: 3003,
        P2P_PORT: 6003,
        PEERS: "ws://localhost:6001,ws://localhost:6002"
      }
    }
  ]
};
