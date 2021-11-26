const { exportAllDeclaration } = require('@babel/types');
const Block = require('./block');

describe('Block', () => {
    let data, lastBlock, block;

    beforeEach(() => {
        data = 'test string';
        lastBlock = Block.genesis();
        block = Block.mineBlock(lastBlock, data);
    });

    it('sets the `data` to match the input', () => {
        expect(block.data).toEqual(data);
    });

    it('sets the `lastHash` to match the hsah of the last block', () => {
        expect(block.lastHash).toEqual(lastBlock.hash);
    });
});