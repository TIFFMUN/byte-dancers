import express from 'express';
import * as userController from '../controllers/userController';

export default (router: express.Router) => {
    router.post('/user', userController.createUser);
    router.get('/user/:userId', userController.getUser);
}


// ... other user-related routes ...