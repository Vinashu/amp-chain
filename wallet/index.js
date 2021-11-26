const ChainUtil = require('../chain-util');
const { INITIAL_BALANCE } = require('../config');

class Wallet {
    constructor() {
        this.balance = INITIAL_BALANCE;
        this.keyPair = ChainUtil.genKeyPair();
        this.publicKey = this.keyPair.getPublic().encode('hex');
    }

    toString() {
        return `Wallet -
            publicKey: ${this.publicKey.toString().substring(0,16)}...${this.publicKey.toString().substring(this.publicKey.toString().length-4)}
            balance  : ${this.balance}`;
    }

    sign(dataHash) {
        return this.keyPair.sign(dataHash);
    }
}

module.exports = Wallet;