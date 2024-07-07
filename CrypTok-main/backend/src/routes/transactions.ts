import express from 'express';
import * as transactionController from '../controllers/transactionController';

export default (router: express.Router) => {
    router.post('/transaction', transactionController.authenticate, transactionController.storeTransaction);
    router.get('/transaction/:userId', transactionController.authenticate, transactionController.getTransactions);
};
