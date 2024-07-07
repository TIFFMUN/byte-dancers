import { db } from '../utils/firebase';
import * as admin from 'firebase-admin';
import { Request, Response, NextFunction } from 'express';
import crypto from 'crypto';
import { IGetUserAuthInfoRequest } from "../../custom"

// Middleware to authenticate users
export const authenticate = async (req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).send('Authentication required');
  }

  const token = authHeader.split('Bearer ')[1];

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    req.user = decodedToken;
    next();
  } catch (error) {
    res.status(403).send('Invalid token');
  }
};


// Utility function to compute a SHA-256 hash
const sha256 = (data: string) => {
  return crypto.createHash('sha256').update(data).digest('hex');
};

// Utility function to build a Merkle tree and return the root
const buildMerkleTree = (hashList: string[]): string => {
  if (hashList.length === 1) return hashList[0];

  const newHashList: string[] = [];

  for (let i = 0; i < hashList.length; i += 2) {
    if (i + 1 < hashList.length) {
      newHashList.push(sha256(hashList[i] + hashList[i + 1]));
    } else {
      newHashList.push(hashList[i]);
    }
  }

  return buildMerkleTree(newHashList);
};

export const storeTransaction = async (req: Request, res: Response) => {
  try {
    const { senderId, receiverId, amount, category, type } = req.body;

    const transaction = {
      senderId,
      receiverId,
      amount,
      category,
      type,
      timestamp: admin.firestore.FieldValue.serverTimestamp(),
    };

    // Hash the transaction
    const transactionHash = sha256(JSON.stringify(transaction));

    // Fetch all transaction hashes from the database
    const hashesSnapshot = await db.collection('transactionHashes').get();
    const hashList = hashesSnapshot.docs.map(doc => doc.data().hash);

    // Add the new transaction hash to the list and build the Merkle tree
    hashList.push(transactionHash);
    const merkleRoot = buildMerkleTree(hashList);

    // Store the new transaction hash and update the Merkle root in the database
    await db.collection('transactionHashes').add({ hash: transactionHash });
    await db.collection('merkleRoot').doc('currentRoot').set({ root: merkleRoot });

    // Store the transaction
    const transactionRef = db.collection('transactions');
    const newTransaction = await transactionRef.add(transaction);

    res.status(201).json({ id: newTransaction.id, ...transaction });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};

export const getTransactions = async (req: IGetUserAuthInfoRequest, res: Response) => {
  try {
    const userId = req.user.uid;  // Use the authenticated user's ID
    //const { userId } = req.params;

    // Fetch transactions for the user
    const transactionsSnapshot = await db.collection('transactions').where('userId', '==', userId).get();
    
    const transactions: any[] = [];
    const transactionHashes: string[] = [];
    transactionsSnapshot.forEach(doc => {
        transactions.push({ id: doc.id, ...doc.data() });
        transactionHashes.push(sha256(JSON.stringify(doc.data())));
    });

    // Build the Merkle tree from the transaction hashes
    const merkleRoot = buildMerkleTree(transactionHashes);

    // Fetch the stored Merkle root
    const storedRootDoc = await db.collection('merkleRoot').doc('currentRoot').get();
    const storedRoot = storedRootDoc.data()?.root;

    // Verify the integrity of the transactions
    if (merkleRoot !== storedRoot) {
      return res.status(500).send('Data integrity verification failed');
    }

    return res.status(200).send(transactions);
  } catch (error) {
    console.error(error);
    return res.status(500).send('Server Error');
  }
};

/* Working functions without merkel tree
export const createTransaction = async (req: Request, res: Response) => {
  try {
    const { senderId, receiverId, amount, category, type } = req.body;

    // Basic data validation
    if (typeof amount !== 'number' || amount <= 0) {
      return res.status(400).send('Invalid amount');
    }
    // Add more validations

    const transaction = {
      senderId,
      receiverId,
      amount,
      category,
      type,
      timestamp: admin.firestore.FieldValue.serverTimestamp(),
    };

    const transactionRef = db.collection('transactions');
    const newTransaction = await transactionRef.add(transaction);

    res.status(201).json({ id: newTransaction.id, ...transaction });
  } catch (error) {
    console.error(error); // Log the error server-side
    res.status(500).send('Server Error');
  }
};

export const getTransactions = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const transactionsSnapshot = await db.collection('transactions').where('userId', '==', userId).get();
    
    const transactions: any[] = [];
    transactionsSnapshot.forEach(doc => {
        transactions.push({ id: doc.id, ...doc.data() });
    });

    return res.status(200).send(transactions);
  } catch (error) {
    console.error(error); // Log the error server-side
    return res.status(500).send('Server Error');
  }
};
*/

