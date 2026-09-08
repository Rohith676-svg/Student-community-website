import express from 'express';
import { db } from '../config/firebase.js';
import { requireAuth } from '../middleware/auth.js';

const router = express.Router();

// @route   GET /api/auth/me
// @desc    Get current user profile (or initialize Google user)
// @access  Private
router.get('/me', requireAuth, async (req, res) => {
  try {
    const { uid, email, name, picture } = req.user;
    const userRef = db.collection('users').doc(uid);
    const userDoc = await userRef.get();

    if (userDoc.exists) {
      // Profile exists, return it
      return res.status(200).json({
        success: true,
        user: userDoc.data()
      });
    }

    // If profile doesn't exist, it's a first-time Google login (or an orphaned email auth).
    // Automatically initialize a student profile.
    const newProfile = {
      uid,
      email: email || '',
      displayName: name || '',
      photoURL: picture || null,
      role: 'student', // ALWAYS student
      profileCompleted: false, // Because they haven't filled out rollNumber, department, year
      rollNumber: null,
      department: null,
      year: null,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    await userRef.set(newProfile);

    return res.status(200).json({
      success: true,
      user: newProfile,
      message: 'Profile initialized successfully'
    });

  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error fetching profile'
    });
  }
});

// @route   POST /api/auth/profile
// @desc    Complete or update user profile
// @access  Private
router.post('/profile', requireAuth, async (req, res) => {
  try {
    const { uid, email, name, picture } = req.user;
    // Extract only allowed fields from request body
    const { displayName, rollNumber, department, year } = req.body;

    const userRef = db.collection('users').doc(uid);
    const userDoc = await userRef.get();

    let profileData = {};

    if (!userDoc.exists) {
      // Create new profile (usually from email/password registration)
      profileData = {
        uid,
        email: email || '',
        displayName: displayName || name || '',
        photoURL: picture || null,
        role: 'student', // Enforced securely
        profileCompleted: true, // Assuming the reg form has these fields
        rollNumber: rollNumber || null,
        department: department || null,
        year: year || null,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      await userRef.set(profileData);
    } else {
      // Update existing profile (e.g. completing a Google profile)
      profileData = {
        displayName: displayName || userDoc.data().displayName,
        rollNumber: rollNumber || userDoc.data().rollNumber,
        department: department || userDoc.data().department,
        year: year || userDoc.data().year,
        profileCompleted: true, // Now completed
        updatedAt: new Date()
      };
      // We NEVER update `role` from user input
      await userRef.update(profileData);
      
      // Merge with existing data for the response
      profileData = { ...userDoc.data(), ...profileData };
    }

    return res.status(200).json({
      success: true,
      user: profileData,
      message: 'Profile saved successfully'
    });

  } catch (error) {
    console.error('Error saving user profile:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error saving profile'
    });
  }
});

export default router;
