const Block = require('./block');

const block = new Block(
    'timestamp test',
    'last hash test',
    'hash test',
    'data test'
);

console.log(block.toString());
console.log(Block.genesis().toString());