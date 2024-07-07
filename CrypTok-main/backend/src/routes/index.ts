import express from 'express';
import users from './users';
import transactions from './transactions';
import wallets from './wallets';
import auth from './auth';

const router = express.Router();

export default (): express.Router => {
    users(router);
    auth(router);
    transactions(router);
    wallets(router);
    return router;
}
