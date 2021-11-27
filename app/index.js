const express = require('express');
const bodyParser = require('body-parser');
const Blockchain = require('../blockchain');
const P2pServer = require('./p2p-server');
const Wallet = require('../wallet/index');
const TransactionPool = require('../wallet/transaction-pool');

const HTTP_PORT = process.env.HTTP_PORT || 3001;

const app = express();
const bc = new Blockchain();
const wallet = new Wallet();
const tp = new TransactionPool();
const p2pServer = new P2pServer(bc, tp);

app.use(bodyParser.json());

app.get('/blocks', (req, res) => {
    console.log("get /blocks");
    res.json(bc.chain);
});

app.post('/mine', (req, res) => {
    console.log("post /mine");    
    const block = bc.addBlock(req.body.data);
    console.log(`New block added: ${block.toString()}`);

    p2pServer.syncChains();

    res.redirect('/blocks');
});

app.get('/transactions', (req, res) => {
    console.log("get /transactions");
    res.json(tp.transactions);
});

app.post('/transact', (req, res) => {
    console.log('post /transact');
    const { recipient, amount } = req.body;
    const transaction = wallet.createTransaction(recipient, amount, tp);
    res.redirect('/transactions');
})

app.listen(HTTP_PORT, () => {
    console.log(`Listening on port ${HTTP_PORT}`);
})
p2pServer.listen();

// HTTP_PORT=3002 P2P_PORT=5002 PEERS=ws://localhost:5001 npm run dev
// HTTP_PORT=3003 P2P_PORT=5003 PEERS=ws://localhost:5001,ws//localhost:5002 npm run dev