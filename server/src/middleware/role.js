import { db } from '../config/firebase.js';

export const requireRole = (requiredRole) => {
  return async (req, res, next) => {
    try {
      if (!req.user || !req.user.uid) {
        return res.status(401).json({
          success: false,
          message: 'Unauthorized: User not authenticated'
        });
      }

      // Fetch user profile from Firestore to determine trusted role
      const userDoc = await db.collection('users').doc(req.user.uid).get();

      if (!userDoc.exists) {
        return res.status(403).json({
          success: false,
          message: 'Forbidden: User profile not found'
        });
      }

      const userData = userDoc.data();

      // Check if user has the required role
      if (userData.role !== requiredRole) {
        return res.status(403).json({
          success: false,
          message: 'Forbidden: Insufficient privileges'
        });
      }

      next();
    } catch (error) {
      console.error(`Error in requireRole(${requiredRole}) middleware:`, error);
      return res.status(500).json({
        success: false,
        message: 'Internal server error during role validation'
      });
    }
  };
};
