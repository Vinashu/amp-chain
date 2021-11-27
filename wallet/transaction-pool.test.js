const TransactinPool = require('./transaction-pool');
const Transaction = require("./transaction");
const Wallet = require("./index");
const Blockchain = require("../blockchain");

describe('TransactionPool', () => {
    let tp, wallet, transaction;
    
    beforeEach(() => {
        tp = new TransactinPool();
        wallet = new Wallet();
        bc = new Blockchain();
        // transaction = Transaction.newTransaction(wallet, 'Recipient', 30);
        // tp.updateOrAddTransaction(transaction);
        transaction = wallet.createTransaction('Recipient', 30, bc, tp);
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

    it('clears transactions', () => {
        tp.clear();
        expect(tp.transactions).toEqual([]);
    });

    describe('mixing valid and corupt transactions', () => {
        let validTransactions;

        beforeEach(() => {
            validTransactions = [... tp.transactions];
            for(let i=0; i<6; i++) {
                wallet = new Wallet();
                transaction = wallet.createTransaction('Recipient Address', 30, bc, tp);
                if(i % 2 == 0) {
                    transaction.input.amount = 99999;
                } else {
                    validTransactions.push(transaction);
                }
            }
        });

        it('shows a diffence between valid and corrupt transactions', () => {
            console.log("valid",validTransactions.length);
            console.log("valid",tp.validTransactions().length);
            expect(JSON.stringify(tp.transactions)).not.toEqual(JSON.stringify(validTransactions));
        });

        it('grabs valid transactions', () => {
            expect(tp.validTransactions()).toEqual(validTransactions);
        });
    });
})