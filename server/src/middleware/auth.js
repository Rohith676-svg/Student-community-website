import { admin } from '../config/firebase.js';

export const requireAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized: Missing or invalid Authorization header'
      });
    }

    const idToken = authHeader.split('Bearer ')[1];
    
    // Verify token using Firebase Admin SDK
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    
    // Attach verified token details to req.user
    req.user = decodedToken;
    
    next();
  } catch (error) {
    console.error('Error in requireAuth middleware:', error);
    
    // Check specific Firebase Auth error codes if necessary
    if (error.code === 'auth/id-token-expired') {
      return res.status(401).json({ success: false, message: 'Unauthorized: Token expired' });
    }
    
    return res.status(401).json({
      success: false,
      message: 'Unauthorized: Invalid token'
    });
  }
};
