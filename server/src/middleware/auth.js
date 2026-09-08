import { admin, db } from '../config/firebase.js';

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

/**
 * Middleware to restrict access based on verified Firestore user roles.
 * Never trusts frontend-supplied roles.
 * @param {string[]} allowedRoles - Array of roles e.g. ['admin', 'lead']
 */
export const requireRole = (allowedRoles = []) => {
  return async (req, res, next) => {
    try {
      if (!req.user || !req.user.uid) {
        return res.status(401).json({
          success: false,
          message: 'Unauthorized: Authentication required'
        });
      }

      const userDoc = await db.collection('users').doc(req.user.uid).get();
      if (!userDoc.exists) {
        return res.status(403).json({
          success: false,
          message: 'Forbidden: User profile does not exist'
        });
      }

      const userData = userDoc.data();
      let userRole = (userData.role || 'student').toLowerCase();

      // Check if user email is a recognized administrator
      const knownAdminEmails = [
        'admin@stc.edu',
        'gorkalsreenu10@gmail.com',
        'gorkalsreenu1919@gmail.com',
        'jrohith210@gmail.com',
        'mantralayamroomsbooking@gmail.com'
      ];
      if (req.user.email && knownAdminEmails.includes(req.user.email.toLowerCase())) {
        userRole = 'admin';
        if (userData.role !== 'admin') {
          await db.collection('users').doc(req.user.uid).set({ role: 'admin' }, { merge: true });
        }
      }

      const normalizedAllowed = allowedRoles.map(r => r.toLowerCase());

      if (!normalizedAllowed.includes(userRole)) {
        return res.status(403).json({
          success: false,
          message: `Forbidden: Requires one of [${allowedRoles.join(', ')}] role(s)`
        });
      }

      // Attach user profile to request
      req.userProfile = { ...userData, role: userRole };
      next();
    } catch (error) {
      console.error('Error in requireRole middleware:', error);
      return res.status(500).json({
        success: false,
        message: 'Internal server error verifying permissions'
      });
    }
  };
};
