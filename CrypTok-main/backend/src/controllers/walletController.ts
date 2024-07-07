import { Request, Response } from 'express';
import * as admin from 'firebase-admin';
import { db } from '../utils/firebase';
import { Stripe } from 'stripe';  
import nodemailer from 'nodemailer'; // npm i --save-dev @types/nodemailer

const stripe = new Stripe('sk_test_51NoJ9OLdCXzE0KvEeqQtuTSGbGS0h3CGUR3htCExSz6Xsl6nBF5I0hshkD4jB2iKfGrG7R1x7dNXyFOwaCXlNIQp00GhQweKrE', {
    apiVersion: '2023-08-16',
  });

export const getDebitWalletBalance = async (req: Request, res: Response) => {
  const { userId } = req.params;
  const userRef = db.collection('users').doc(userId);
  
  try {
      const doc = await userRef.get();
      if (!doc.exists) {
          return res.status(404).json({ message: 'User not found' });
      } else {
          const userData = doc.data();
          //console.log(userData);
          return res.json({ debitBalance: userData?.debitBalance || 0 });
      }
  } catch (error) {
      return res.status(500).json({ error: error.message });
  }
};

export const getCreditWalletBalance = async (req: Request, res: Response) => {
  const { userId } = req.params;
  const userRef = db.collection('users').doc(userId);

  try {
      const doc = await userRef.get();
      if (!doc.exists) {
          return res.status(404).json({ message: 'User not found' });
      } else {
          const userData = doc.data();
          return res.json({ creditBalance: userData?.creditBalance || 0 });
      }
  } catch (error) {
      return res.status(500).json({ error: error.message });
  }
};

export const topUpDebitWallet = async (req: Request, res: Response) => {
    const userId = req.params.userId;
    const { amount, paymentMethod } = req.body;
  
    if (typeof amount !== 'number' || amount <= 0) {
      return res.status(400).json({ message: 'Invalid amount' });
    }
  
    if (paymentMethod === 'stripe') {
      try {
        // Use PaymentIntents instead of direct charges for better SCA support
        const paymentIntent = await stripe.paymentIntents.create({
          amount: amount * 100,
          currency: 'sgd',
          description: `Top up for user ${userId}`,
          payment_method: req.body.paymentMethodId, // Assuming you send a PaymentMethod ID from the frontend
          confirm: true
        });
  
        if (paymentIntent.status === 'succeeded') {
          const userRef = db.collection('users').doc(userId);
          await db.runTransaction(async (transaction) => {
            const user = await transaction.get(userRef);
            if (user.exists) {
              transaction.update(userRef, {
                debitBalance: admin.firestore.FieldValue.increment(amount)
              });
            }
          });
          return res.status(200).json({ message: 'Top up successful' });
        } else {
          return res.status(400).json({ message: 'Charge unsuccessful' });
        }
      } catch (error) {
        return res.status(500).json({ error: 'Internal server error' });
      }
    }
  
    // Implement logic for PayPal and other payment methods
  };

  export const payOffCreditWalletBalance = async (req: Request, res: Response) => {
    const userId = req.params.userId;
    const { amount, paymentMethod } = req.body;
  
    if (typeof amount !== 'number' || amount <= 0) {
      return res.status(400).json({ message: 'Invalid amount' });
    }
  
    try {
      const userRef = db.collection('users').doc(userId);
      const user = await userRef.get();
  
      if (!user.exists) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      if (paymentMethod === 'debit') {
        if (user.data()?.debitBalance < amount) {
          return res.status(400).json({ message: 'Insufficient debit balance' });
        }
        await db.runTransaction(async (transaction) => {
          transaction.update(userRef, {
            creditBalance: admin.firestore.FieldValue.increment(-amount),
            debitBalance: admin.firestore.FieldValue.increment(-amount)
          });
        });
      } else if (paymentMethod === 'stripe') {
        try {
          // Use PaymentIntents instead of direct charges for better SCA support
          const paymentIntent = await stripe.paymentIntents.create({
            amount: amount * 100,
            currency: 'sgd',
            description: `Pay off credit balance for user ${userId}`,
            payment_method: req.body.paymentMethodId, // Assuming you send a PaymentMethod ID from the frontend
            confirm: true
          });
  
          if (paymentIntent.status !== 'succeeded') {
            return res.status(400).json({ message: 'Charge unsuccessful' });
          }
        } catch (error) {
          return res.status(500).json({ error: 'Internal server error' });
        }
  
        // After successful payment:
        await userRef.update({
          creditBalance: admin.firestore.FieldValue.increment(-amount)
        });
      }
      return res.status(200).json({ message: 'Credit balance paid successfully' });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  };
  

export const internalTransfer = async (req: Request, res: Response) => {
  const { senderId, receiverId, amount } = req.body;

  const db = admin.firestore();
  const senderRef = db.collection('users').doc(senderId);
  const receiverRef = db.collection('users').doc(receiverId);

  try {
      const sender = await senderRef.get();
      const receiver = await receiverRef.get();

      if (!sender.exists || !receiver.exists) {
          return res.status(404).json({ message: 'User(s) not found' });
      }

      if (sender.data()?.debitBalance < amount) {
          return res.status(400).json({ message: 'Insufficient funds in sender account' });
      }

      // Update balances
      await db.runTransaction(async (t) => {
          t.update(senderRef, { debitBalance: admin.firestore.FieldValue.increment(-amount) });
          t.update(receiverRef, { debitBalance: admin.firestore.FieldValue.increment(amount) });
      });

      return res.status(200).json({ message: 'Transfer successful' });

  } catch (error) {
      return res.status(500).json({ error: error.message });
  }
};

export const setupConnectedAccount = async (req: Request, res: Response) => {
    const userId = req.params.userId;
    const { country, email } = req.body; // Can collect more details as needed
  
    try {
      // Create a connected account
      const account = await stripe.accounts.create({
        type: 'standard',
        country: country,
        email: email,
        // Add other necessary details
      });
  
      // Store the connected account ID in your database
      const userRef = db.collection('users').doc(userId);
      await userRef.update({
        connectedStripeAccountId: account.id
      });
  
      // Return the account object or any other relevant information
      return res.status(200).json({ accountId: account.id });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  };

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'project gmail',
      pass: 'password'
    }
  });
  
  export const handleStripeWebhook = async (req: Request, res: Response) => {
    const sig = req.headers['stripe-signature'];
  
    let event: Stripe.Event;
  
    try {
      event = stripe.webhooks.constructEvent(req.body, sig, 'YOUR_ENDPOINT_SECRET') as Stripe.Event;
    } catch (err) {
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }
  
    if (event.type === 'account.updated') {
      const account = event.data.object as Stripe.Account;

    let fields_needed: string[] = [];

    if (account.individual) {
        fields_needed = (account.individual.verification as any).fields_needed || [];
    } else if (account.company) {
        fields_needed = (account.company.verification as any).fields_needed || [];
    }
  
      if (fields_needed.length > 0) {
        // Fetch the user's email from your database using the account ID
        const userRef = db.collection('users').where('connectedStripeAccountId', '==', account.id).limit(1);
        const userSnapshot = await userRef.get();
        const userEmail = userSnapshot.docs[0]?.data()?.email;
  
        if (userEmail) {
          // Send email notification
          const mailOptions = {
            from: 'YOUR_EMAIL@gmail.com',
            to: userEmail,
            subject: 'Additional Information Required for Stripe Account Verification',
            text: 'Dear user, additional information is required to verify your Stripe account. Please log in to your account and provide the necessary details. Thank you.'
          };
  
          transporter.sendMail(mailOptions, (error: any, info: any) => {
            if (error) {
              console.log('Error sending email:', error);
            } else {
              console.log('Email sent:', info.response);
            }
          });
        }
      }
    }
  
    // Return a response to acknowledge receipt of the event
    res.json({ received: true });
  };


export const externalTransfer = async (req: Request, res: Response) => {
    const userId = req.params.userId;
    const { amount } = req.body;
  
    if (typeof amount !== 'number' || amount <= 0) {
      return res.status(400).json({ message: 'Invalid amount' });
    }
  
    try {
      const userRef = db.collection('users').doc(userId);
      const user = await userRef.get();
  
      if (!user.exists) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      if (user.data()?.debitBalance < amount) {
        return res.status(400).json({ message: 'Insufficient funds' });
      }
  
      // User need to have a connected and verified Stripe account to receive the payout
      const connectedStripeAccountId = user.data()?.connectedStripeAccountId;
      if (!connectedStripeAccountId) {
        return res.status(400).json({ message: 'User does not have a connected Stripe account' });
      }
  
      const payout = await stripe.payouts.create({
        amount: amount * 100,
        currency: 'sgd',
        destination: connectedStripeAccountId // Assuming the user's connected Stripe account ID is stored in the database
      });
  
      if (payout.status === 'succeeded') {
        await db.runTransaction(async (transaction) => {
          transaction.update(userRef, {
            debitBalance: admin.firestore.FieldValue.increment(-amount)
          });
        });
        return res.status(200).json({ message: 'External transfer successful' });
      } else {
        return res.status(400).json({ message: 'Transfer failed' });
      }
    } catch (error) {
      return res.status(500).json({ error: 'Internal server error' });
    }
  };


  

// debitpayment for external purchase, using visa/mastercard/paynow

// creditpayment for external purchase, using visa/mastercard/paynow