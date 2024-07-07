import { db } from '../utils/firebase';
import { Request, Response } from 'express';

export const createUser = async (req: Request, res: Response) => {
  try {
    const userRef = db.collection('users');
    const newUser = {
      email: req.body.email,
      password: req.body.password,
      debitBalance: 0, // Need hashing here
      creditBalance: 0
    };
    
    const addedUser = await userRef.add(newUser);
    res.status(201).json({ id: addedUser.id, ...newUser });
  } catch (error) {
    console.log(error);
    res.sendStatus(401);
  }
};


export const getUser = async (req: Request, res: Response) => {
  try {
      const { userId } = req.params;
      const userDoc = await db.collection('users').doc(userId).get();

      if (!userDoc.exists) {
          return res.status(404).send('User not found');
      }

      return res.status(200).send({ id: userDoc.id, ...userDoc.data() });
  } catch (error) {
      return res.status(500).send(error);
  }
};