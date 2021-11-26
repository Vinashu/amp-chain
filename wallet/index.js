const ChainUtil = require('../chain.util');
const { INITIAL_BALANCE } = require('../config');

class Wallet {
    constructor() {
        this.balance = INITIAL_BALANCE;
        this.keyPar = ChainUtil.genKeyPair();
        this.publicKey = this.keyPar.getPublic().encode('hex');
    }

    toString() {
        return `Wallet -
            publicKey: ${this.publicKey.toString().substring(0,16)}...${this.publicKey.toString().substring(this.publicKey.toString().length-4)}
            balance  : ${this.balance}`;
    }
}

module.exports = Wallet;