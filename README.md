# AMP Blockchain

Welcome to AMP BlockChain. I created this chain to be my playground where I can test different technologies and ideas for blockchains. 

AMP stands for Astronauta Marcos Pontes, the first Brazilian astronaut and the first person from the southern hemisphere to travel to space.

The idea is not to have a super optimized and performance code, but something simple to be read and understood, expanded and modified.

## Structure
```
.
├── app
│   ├── index.js
│   ├── miner.js
│   └── p2p-server.js
├── blockchain
│   ├── block.js
│   ├── block.test.js
│   ├── index.js
│   └── index.test.js
├── chain-util.js
├── config.js
├── dev-test-000.js
├── dev-test.js
├── package-lock.json
├── package.json
└── wallet
    ├── index.js
    ├── index.test.js
    ├── transaction-pool.js
    ├── transaction-pool.test.js
    ├── transaction.js
    └── transaction.test.js
```

## How to use it
First you need to install the dependencies.
```
npm install
```
To run the **master node**:
```
npm run dev
```
The **master node** will run using as default port **3001** for http and **5001** for sockets. To run aditional nodes you need to choose the default doors for each node:
```
HTTP_PORT=3002 P2P_PORT=5002 PEERS=ws://localhost:5001 npm run dev
HTTP_PORT=3003 P2P_PORT=5003 PEERS=ws://localhost:5001,ws//localhost:5002 npm run dev
```
Note that we are passing the **peers** addresses each time we start a new **node**. That is not a very good solution and I will think about how to do that automatically.

## Server API endpoints
Each node will listen on two ports. The first is intended to respond to requests made through the HTTP protocol; the second is for communication between blockchain nodes. The valid endpoints are:

### (GET)/public-key
Returns the node's public-key

### (GET)/blocks 
Returns the blockchain

### (POST)/transact
Submit a transaction to the blockchain. I expects a JSON object with a recipient and an amount.
```
{
    "recipient": "Recipient address",
    "amount": 50
}
```

### (GET)/transactions
Return the list of transactions in the memory pool.

### (GET)/mine-transactions
Mide the available transactions int he memory pool and add the block into the blockchain.

