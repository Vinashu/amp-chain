const TransactinPool = require('./transaction-pool');
const Transaction = require("./transaction");
const Wallet = require("./index");

describe('TransactionPool', () => {
    let tp, wallet, transaction;
    
    beforeEach(() => {
        tp = new TransactinPool();
        wallet = new Wallet();
        // transaction = Transaction.newTransaction(wallet, 'Recipient', 30);
        // tp.updateOrAddTransaction(transaction);
        transaction = wallet.createTransaction('Recipient', 30, tp);
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

    describe('mixing valid and corupt transactions', () => {
        let validTransactions;

        beforeEach(() => {
            validTransactions = [... tp.transactions];
            for(let i=0; i<6; i++) {
                wallet = new Wallet();
                transaction = wallet.createTransaction('Recipient Address', 30, tp);
                if(i % 2 == 0) {
                    transaction.input.amount = 99999;
                } else {
                    validTransactions.push(transaction);
                }
            }
        });

        it('shows a diffence between valid and corrupt transactions', () => {
            expect(JSON.stringify(tp.transaction)).not.toEqual(JSON.stringify(validTransactions));
        });

        it('grabs valid transactions', () => {
            expect(tp.validTransactions()).toEqual(validTransactions);
        });
    });
})