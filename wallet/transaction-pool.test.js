const TransactinPool = require('./transaction-pool');
const Transaction = require("./transaction");
const Wallet = require("./index");

describe('TransactionPool', () => {
    let tp, wallet, transaction;
    
    beforeEach(() => {
        tp = new TransactinPool();
        wallet = new Wallet();
        transaction = Transaction.newTransaction(wallet, 'Recipient', 30);
        tp.updateOrAddTransaction(transaction);
    });

    it('add a transaction to the pool', () => {
        expect(tp.transactions.find(t => t.id === transaction.id)).toEqual(transaction);
    });

    it('updates a transaction in the pool', () => {
        const oldTransaction = JSON.stringify(transaction);
        const newTransaction = transaction.update(wallet, "Other recipient", 40);
        tp.updateOrAddTransaction(newTransaction);
        expect(tp.transactions.find(t => t.id === newTransaction.id))
        .not.toEqual(oldTransaction);
    });
})