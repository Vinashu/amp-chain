const Block = require('./block');

const block = new Block(
    'timestamp test',
    'last hash test',
    'hash test',
    'data test'
);

console.log(block.toString());
console.log(Block.genesis().toString());

const testBlock = Block.mineBlock(
    Block.genesis(),
    'test string'
);

console.log(testBlock.toString());