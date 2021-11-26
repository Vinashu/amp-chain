const Blockchain = require('.');
const Block = require('./block');

describe('Blockchain', () => {
    let bc, bc2;

    beforeEach(() => {
        bc = new Blockchain();
        bc2 = new Blockchain();
    });

    it('starts with genesis block', () => {
        expect(bc.chain[0]).toEqual(Block.genesis());
    });

    it('adds a new block', () => {
        const data = 'test string';
        bc.addBlock(data);

        expect(bc.chain[bc.chain.length-1].data).toEqual(data);
    })

    it('validates a valid chain', () => {
        const data = 'test string';        
        bc2.addBlock(data);

        expect(bc.isValidChain(bc2.chain)).toBe(true);
    });

    it('invalidates a chain with a corrupt genesis block', () => {
        const data = 'corrupted test string';
        bc2.chain[0].data = data;

        expect(bc.isValidChain(bc2.chain)).toBe(false);
    });

    it('invalidates a corrupt chain', () => {
        const data = 'test string';        
        const dataCorrupted = 'corrupted test string';

        bc2.addBlock(data);
        bc2.chain[1].data = dataCorrupted;

        expect(bc.isValidChain(bc2.chain)).toBe(false);
    });

    it('replaces the chain with a valid chain', () => {
        const data = 'test string';                
        bc2.addBlock(data);
        bc.replaceChain(bc2.chain);

        expect(bc.chain).toEqual(bc2.chain);
    });

    it('does not replace the chain with one of less than or equal to length', () => {
        const data = 'test string';
        bc.addBlock(data);
        bc.replaceChain(bc2.chain);

        expect(bc.chain).not.toEqual(bc2.chain);
    });    
});