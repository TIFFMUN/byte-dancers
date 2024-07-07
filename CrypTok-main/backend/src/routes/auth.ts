import express from 'express';
import * as AuthController from "../controllers/authController";

export default (router: express.Router) => {
    router.post('/auth/signup', AuthController.signupByEmail);
} 
