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

## To run the test suite
There are a test file for each class. Run the tests after any change to make sure the app is still working as it should be.
```
npm run test
```

## Server API endpoints
Each node will listen on two ports. The first is intended to respond to requests made through the HTTP protocol; the second is for communication between blockchain nodes. The valid endpoints are:

### (GET)/public-key
Returns the node's public-key
```
{
    "publicKey": "04c83911221d27b11d3c14874f67cec0773315f0500d4ff34de3bb55172ec21d6278a58828df036af6d9009d00976d67d38df5825542fee3aea077e87a27627057"
}
```

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
```
[
    {
        "id": "843a1df0-673d-11ec-a847-f9af80da3a3a",
        "input": {
            "timestamp": 1640627445071,
            "amount": 500,
            "address": "04c83911221d27b11d3c14874f67cec0773315f0500d4ff34de3bb55172ec21d6278a58828df036af6d9009d00976d67d38df5825542fee3aea077e87a27627057",
            "signature": {
                "r": "6715b7cc2c3c9dcd4432b2848d8306593cafa4de1ab27ec2a1cd8fd46cb0d63b",
                "s": "b72c6fdd186a5e91585003ff7b809115b391b2d875fccc2ef6e3144115dd6f85",
                "recoveryParam": 0
            }
        },
        "outputs": [
            {
                "amount": 450,
                "address": "04c83911221d27b11d3c14874f67cec0773315f0500d4ff34de3bb55172ec21d6278a58828df036af6d9009d00976d67d38df5825542fee3aea077e87a27627057"
            },
            {
                "amount": 50,
                "address": "Recipient address"
            }
        ]
    }
]
```

### (GET)/blocks 
Returns the blockchain
```
[
    {
        "timestamp": 0,
        "lastHash": "000000000000",
        "hash": "000000000000",
        "data": [],
        "nonce": "000000000000",
        "difficulty": 3
    },
    {
        "timestamp": 1640627578292,
        "lastHash": "000000000000",
        "hash": "00bdfd41118375ae3d6a1b73261052157c545ac49a9e850eb2dd8c0f21de61d0",
        "data": [
            {
                "id": "843a1df0-673d-11ec-a847-f9af80da3a3a",
                "input": {
                    "timestamp": 1640627445071,
                    "amount": 500,
                    "address": "04c83911221d27b11d3c14874f67cec0773315f0500d4ff34de3bb55172ec21d6278a58828df036af6d9009d00976d67d38df5825542fee3aea077e87a27627057",
                    "signature": {
                        "r": "6715b7cc2c3c9dcd4432b2848d8306593cafa4de1ab27ec2a1cd8fd46cb0d63b",
                        "s": "b72c6fdd186a5e91585003ff7b809115b391b2d875fccc2ef6e3144115dd6f85",
                        "recoveryParam": 0
                    }
                },
                "outputs": [
                    {
                        "amount": 450,
                        "address": "04c83911221d27b11d3c14874f67cec0773315f0500d4ff34de3bb55172ec21d6278a58828df036af6d9009d00976d67d38df5825542fee3aea077e87a27627057"
                    },
                    {
                        "amount": 50,
                        "address": "Recipient address"
                    }
                ]
            },
            {
                "id": "d3a03280-673d-11ec-a847-f9af80da3a3a",
                "input": {
                    "timestamp": 1640627578280,
                    "amount": 500,
                    "address": "04e46326b86315cec81aeb18ad5ea4752e60a1466543cbd34e9535582b0becbda0c0a410a1ec15b08bdcc3460b80c9f9bdfcd26f13b316db9a7b44c61174508d9c",
                    "signature": {
                        "r": "ea3131897111ffafbe4fa437d365f4e260d86575e296ee92074d54c81f81785f",
                        "s": "6b763e3d72da3f0565788945678e9ed4d3a550b858172a7d96c51c7b2cd9ae6c",
                        "recoveryParam": 1
                    }
                },
                "outputs": [
                    {
                        "amount": 50,
                        "address": "04c83911221d27b11d3c14874f67cec0773315f0500d4ff34de3bb55172ec21d6278a58828df036af6d9009d00976d67d38df5825542fee3aea077e87a27627057"
                    }
                ]
            }
        ],
        "nonce": 379,
        "difficulty": 2
    }
]
```

### (GET)/mine-transactions
Mine the available transactions int he memory pool and add the block into the blockchain.
