import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { getAuth } from 'firebase-admin/auth';
import env from './env.js';

const initFirebase = () => {
  if (!env.FIREBASE_PROJECT_ID || !env.FIREBASE_PRIVATE_KEY || !env.FIREBASE_CLIENT_EMAIL) {
    console.warn('⚠️ Firebase Admin credentials missing. Firebase features will not work.');
    return null;
  }

  try {
    const formattedPrivateKey = env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n');
    
    const app = initializeApp({
      credential: cert({
        projectId: env.FIREBASE_PROJECT_ID,
        clientEmail: env.FIREBASE_CLIENT_EMAIL,
        privateKey: formattedPrivateKey,
      }),
    });
    console.log('✅ Firebase Admin initialized successfully.');
    return app;
  } catch (error) {
    console.error('❌ Error initializing Firebase Admin:', error.message);
    return null;
  }
};

const firebaseApp = initFirebase();

export const db = firebaseApp ? getFirestore(firebaseApp) : null;
if (db) {
  db.settings({ ignoreUndefinedProperties: true });
}
export const adminAuth = firebaseApp ? getAuth(firebaseApp) : null;
export const admin = { auth: () => adminAuth }; // polyfill for auth.js middleware
