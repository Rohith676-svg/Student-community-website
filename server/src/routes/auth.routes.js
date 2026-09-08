import express from 'express';
import { db } from '../config/firebase.js';
import { requireAuth } from '../middleware/auth.js';
import emailService from '../services/email.service.js';

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

    // Asynchronously send the welcome email
    emailService.sendWelcomeEmail(newProfile).catch(err => 
      console.error('Failed to trigger welcome email in background:', err)
    );

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

    // Normalize and trim optional rollNumber
    const cleanRoll = rollNumber !== undefined 
      ? (rollNumber && String(rollNumber).trim() !== '' ? String(rollNumber).trim().toUpperCase() : null)
      : undefined;

    // Check for duplicate roll number across other users
    if (cleanRoll) {
      const existingRollSnap = await db.collection('users')
        .where('rollNumber', '==', cleanRoll)
        .limit(2)
        .get();
      
      const duplicate = existingRollSnap.docs.find(d => d.id !== uid);
      if (duplicate) {
        return res.status(409).json({
          success: false,
          message: 'This roll number is already registered with another student account.'
        });
      }
    }

    let profileData = {};

    if (!userDoc.exists) {
      // Create new profile (usually from email/password registration)
      profileData = {
        uid,
        email: email ? String(email).trim().toLowerCase() : '',
        displayName: displayName ? String(displayName).trim() : (name || ''),
        photoURL: picture || null,
        role: 'student', // Enforced securely
        profileCompleted: !!(cleanRoll && department && year),
        rollNumber: cleanRoll || null,
        department: department ? String(department).trim() : null,
        year: year ? String(year).trim() : null,
        status: 'ACTIVE',
        createdAt: new Date(),
        updatedAt: new Date()
      };
      await userRef.set(profileData);

      // Asynchronously send the welcome email
      emailService.sendWelcomeEmail(profileData).catch(err => 
        console.error('Failed to trigger welcome email in background:', err)
      );
    } else {
      const existing = userDoc.data();
      const updatedRoll = cleanRoll !== undefined ? cleanRoll : (existing.rollNumber || null);
      const updatedDept = department !== undefined ? (department ? String(department).trim() : null) : (existing.department || null);
      const updatedYear = year !== undefined ? (year ? String(year).trim() : null) : (existing.year || null);
      const updatedName = displayName !== undefined ? (displayName ? String(displayName).trim() : existing.displayName) : existing.displayName;

      profileData = {
        displayName: updatedName,
        rollNumber: updatedRoll,
        department: updatedDept,
        year: updatedYear,
        profileCompleted: !!(updatedDept && updatedYear),
        updatedAt: new Date()
      };

      // We NEVER update `role` from user input
      await userRef.update(profileData);
      
      // Merge with existing data for the response
      profileData = { ...existing, ...profileData };
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
