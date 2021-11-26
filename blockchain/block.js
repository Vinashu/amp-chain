const SHA256 = require('crypto-js/sha256');
const { DIFFICULTY, MINE_RATE } = require('../config');

class Block {
    constructor(timestamp, lastHash, hash, data, nonce, difficulty) {
        this.timestamp = timestamp;
        this.lastHash = lastHash;
        this.hash = hash;
        this.data = data;
        this.nonce = nonce;
        this.difficulty = difficulty || DIFFICULTY;
    }

    toString() {
        return `Block -
            Timestamp : ${this.timestamp}
            Last Hash : ${this.lastHash.substring(0, 10)}...${this.lastHash.substring(this.lastHash.length-3, this.lastHash.length)}
            Hash      : ${this.hash.substring(0, 10)}...${this.hash.substring(this.hash.length-3, this.hash.length)}
            Nonce     : ${this.nonce}
            Difficulty: ${this.difficulty}
            Data      : ${this.data}`;
    }

    static genesis() {
        return new this(
            0,
            '000000000000',
            '000000000000',
            [],
            '000000000000',
            DIFFICULTY
        );
    }

    static mineBlock(lastBlock, data) {      
        const lastHash = lastBlock.hash;
        let timestamp = Date.now();        
        let nonce = 0;
        let { difficulty } = lastBlock;
        let hash;
        
        do {
            nonce++;
            timestamp = Date.now();
            difficulty = Block.ajustDifficulty(lastBlock, timestamp);
            hash = Block.hash(timestamp, lastHash, data, nonce, difficulty);
        } while(hash.substring(0, difficulty) !== '0'.repeat(difficulty));

        return new this(
            timestamp,
            lastHash,
            hash,
            data,
            nonce,
            difficulty
        );
    }

    static hash(timestamp, lastHash, data, nonce, difficulty) {
        return SHA256(`${timestamp}${lastHash}${data}${nonce}${difficulty}`).toString();
    }

    static blockHash(block) {
        const { timestamp, lastHash, data, nonce, difficulty} = block;
        return Block.hash(timestamp, lastHash, data, nonce, difficulty);
    }

    static ajustDifficulty(lastBlock, currentTime) {
        let { difficulty, timestamp } = lastBlock;
        difficulty = timestamp + MINE_RATE > currentTime ? difficulty + 1 : difficulty - 1;
        return difficulty;
    }
}

module.exports = Block;