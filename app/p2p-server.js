const Websocket = require('ws');

const P2P_PORT = process.env.P2P_PORT || 5001;
const peers = process.env.PEERS ? process.env.PEERS.split(',') : [];
const MESSAGES_TYPE = {
    chain: 'CHAIN',
    transaction: 'TRANSACTION'
};

class P2pServer {
    constructor(blockchain, transactionPool) {
        this.blockchain = blockchain;
        this.transactionPool = transactionPool;
        this.sockets = [];
    }

    listen() {
        const server = new Websocket.Server({
            port: P2P_PORT,
        });
        server.on(
            'connection',
            socket => this.connectSocket(socket)
        );
        this.connectToPeers();
        console.log(`Listening for peer-to-peer connectons on ${P2P_PORT}`);        
    }

    connectToPeers(){
        peers.forEach(peer => {
            //ws://localhost:5001
            const socket = new Websocket(peer);
            socket.on('open', () => this.connectSocket(socket));
        });
    }

    connectSocket(socket) {
        this.sockets.push(socket);
        console.log('Socket connected');

        this.messageHandker(socket);

        this.sendChain(socket);
    }

    messageHandker(socket) {
        socket.on(
            'message',
            message => {
                const data = JSON.parse(message);
                switch(data.type) {
                    case MESSAGES_TYPE.chain:
                        this.blockchain.replaceChain(data.chain);
                    break;
                    case MESSAGES_TYPE.transaction:
                        this.transactionPool.updateOrAddTransaction(data.transaction);
                    break;
                }
            }
        );
    }

    sendChain(socket) {
        socket.send(JSON.stringify({
            type: MESSAGES_TYPE.chain,
            chain: this.blockchain.chain
        }));
    }

    sendTransaction(socket, transaction) {
        socket.send(JSON.stringify({
            type: MESSAGES_TYPE.transaction,
            transaction
        }));
    }

    syncChains() {
        this.sockets.forEach(socket => {
            this.sendChain(socket);
        });
    }

    broadcastTransaction(transaction) {
        this.sockets.forEach(socket => {
            this.sendTransaction(socket, transaction);
        });
    }
}

module.exports = P2pServer;