const Blockchain = require('./blockchain');

const bc = new Blockchain();

/*
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
*/

for(let i=0; i<10; i++){
    console.log(bc.addBlock(`test ${i}`).toString());
}