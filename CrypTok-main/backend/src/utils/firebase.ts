import * as admin from 'firebase-admin';

const serviceAccount = require('../../firebase_credentials.json');

// Initialize Firebase admin SDK
// if (!admin.apps.length) {
//   admin.initializeApp({
//     credential: admin.credential.cert({
//       projectId: serviceAccount.project_id,
//       clientEmail: serviceAccount.client_email,
//       privateKey: serviceAccount.private_key
//     }),
//     databaseURL: `https://${serviceAccount.project_id}.firebaseio.com`
//   });
// }

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

export const db = admin.firestore();
export const auth = admin.auth();

