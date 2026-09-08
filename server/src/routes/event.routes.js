import express from 'express';
import { db, admin } from '../config/firebase.js';
import { requireAuth, requireRole } from '../middleware/auth.js';
import emailService from '../services/email.service.js';

const router = express.Router();

/**
 * Helper to generate human-readable registration ID: STC-REG-XXXXXX
 */
const generateRegistrationId = () => {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let result = '';
  for (let i = 0; i < 6; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `STC-REG-${result}`;
};

// @route   GET /api/events
// @desc    Get public events (or all events if admin/lead requests ?all=true)
// @access  Public (Optional auth for admin view)
router.get('/', async (req, res) => {
  try {
    const { all, type, status, search } = req.query;
    let query = db.collection('events');

    // Check if user is requesting all events (including drafts)
    let canViewDrafts = false;
    if (all === 'true' && req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
      try {
        const token = req.headers.authorization.split('Bearer ')[1];
        const decoded = await admin.auth().verifyIdToken(token);
        const userDoc = await db.collection('users').doc(decoded.uid).get();
        if (userDoc.exists) {
          const role = (userDoc.data().role || 'student').toLowerCase();
          if (role === 'admin' || role === 'lead') {
            canViewDrafts = true;
          }
        }
      } catch (authErr) {
        // Token invalid or expired; fallback to public only
        canViewDrafts = false;
      }
    }

    if (!canViewDrafts) {
      query = query.where('status', '==', 'PUBLISHED');
    } else if (status && status !== 'ALL') {
      query = query.where('status', '==', status);
    }

    if (type && type !== 'ALL') {
      query = query.where('type', '==', type);
    }

    const snapshot = await query.get();
    let events = [];
    snapshot.forEach(doc => {
      events.push({ id: doc.id, ...doc.data() });
    });

    // In-memory search filter if provided
    if (search && search.trim()) {
      const q = search.toLowerCase();
      events = events.filter(e => {
        const title = (e.title || e.name || '').toLowerCase();
        const desc = (e.description || '').toLowerCase();
        const loc = (e.location || e.venue || '').toLowerCase();
        return title.includes(q) || desc.includes(q) || loc.includes(q);
      });
    }

    return res.status(200).json({
      success: true,
      count: events.length,
      events
    });
  } catch (error) {
    console.error('Error fetching events:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error fetching events'
    });
  }
});

// @route   GET /api/events/:eventId
// @desc    Get single event by ID
// @access  Public
router.get('/:eventId', async (req, res) => {
  try {
    const { eventId } = req.params;
    const docRef = db.collection('events').doc(eventId);
    const doc = await docRef.get();

    if (!doc.exists) {
      return res.status(404).json({
        success: false,
        message: 'Event not found'
      });
    }

    const event = { id: doc.id, ...doc.data() };

    // If not published, verify user is admin or lead
    if (event.status !== 'PUBLISHED') {
      let isAuthorized = false;
      if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
        try {
          const token = req.headers.authorization.split('Bearer ')[1];
          const decoded = await admin.auth().verifyIdToken(token);
          const userDoc = await db.collection('users').doc(decoded.uid).get();
          if (userDoc.exists) {
            const role = (userDoc.data().role || 'student').toLowerCase();
            isAuthorized = (role === 'admin' || role === 'lead');
          }
        } catch (e) {
          isAuthorized = false;
        }
      }

      if (!isAuthorized) {
        return res.status(404).json({
          success: false,
          message: 'Event not found'
        });
      }
    }

    return res.status(200).json({
      success: true,
      event
    });
  } catch (error) {
    console.error('Error fetching event details:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error fetching event'
    });
  }
});

// @route   POST /api/events
// @desc    Create a new event
// @access  Private (Admin / Lead only)
router.post('/', requireAuth, requireRole(['admin', 'lead']), async (req, res) => {
  try {
    const data = req.body;
    const eventId = data.id || `event-${Date.now()}`;
    const eventRef = db.collection('events').doc(eventId);

    const newEvent = {
      ...data,
      id: eventId,
      capacity: (data.capacity && !isNaN(Number(data.capacity))) ? Number(data.capacity) : null,
      status: data.status || 'DRAFT',
      registrationStatus: data.registrationStatus || 'OPEN',
      registrationCount: 0,
      createdBy: req.user.uid,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    await eventRef.set(newEvent);

    return res.status(201).json({
      success: true,
      message: 'Event created successfully',
      event: newEvent
    });
  } catch (error) {
    console.error('Error creating event:', error);
    return res.status(500).json({
      success: false,
      message: `Failed to create event: ${error.message}`
    });
  }
});

// @route   PATCH /api/events/:eventId
// @desc    Update an existing event
// @access  Private (Admin / Lead only)
router.patch('/:eventId', requireAuth, requireRole(['admin', 'lead']), async (req, res) => {
  try {
    const { eventId } = req.params;
    const eventRef = db.collection('events').doc(eventId);
    const eventDoc = await eventRef.get();

    if (!eventDoc.exists) {
      return res.status(404).json({
        success: false,
        message: 'Event not found'
      });
    }

    const updates = {
      ...req.body,
      updatedAt: new Date().toISOString()
    };
    // Protect id, registrationCount, and createdBy from arbitrary client overwrites
    delete updates.id;
    delete updates.registrationCount;
    delete updates.createdBy;

    await eventRef.update(updates);
    const updatedDoc = await eventRef.get();

    return res.status(200).json({
      success: true,
      message: 'Event updated successfully',
      event: { id: updatedDoc.id, ...updatedDoc.data() }
    });
  } catch (error) {
    console.error('Error updating event:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error updating event'
    });
  }
});

// @route   PATCH /api/events/:eventId/status
// @desc    Toggle or set publish status (PUBLISHED <-> UNPUBLISHED)
// @access  Private (Admin / Lead only)
router.patch('/:eventId/status', requireAuth, requireRole(['admin', 'lead']), async (req, res) => {
  try {
    const { eventId } = req.params;
    const eventRef = db.collection('events').doc(eventId);
    const eventDoc = await eventRef.get();

    if (!eventDoc.exists) {
      return res.status(404).json({
        success: false,
        message: 'Event not found'
      });
    }

    const currentStatus = eventDoc.data().status;
    const nextStatus = req.body.status 
      ? req.body.status 
      : (currentStatus === 'PUBLISHED' ? 'UNPUBLISHED' : 'PUBLISHED');

    await eventRef.update({
      status: nextStatus,
      updatedAt: new Date().toISOString()
    });

    return res.status(200).json({
      success: true,
      message: `Event status updated to ${nextStatus}`,
      status: nextStatus
    });
  } catch (error) {
    console.error('Error changing event status:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error updating status'
    });
  }
});

// @route   DELETE /api/events/:eventId
// @desc    Delete an event and its registrations
// @access  Private (Admin only)
router.delete('/:eventId', requireAuth, requireRole(['admin']), async (req, res) => {
  try {
    const { eventId } = req.params;
    const eventRef = db.collection('events').doc(eventId);
    const eventDoc = await eventRef.get();

    if (!eventDoc.exists) {
      return res.status(404).json({
        success: false,
        message: 'Event not found'
      });
    }

    // Delete subcollection registrations
    const regSnapshot = await eventRef.collection('registrations').get();
    const batch = db.batch();
    regSnapshot.forEach(doc => {
      batch.delete(doc.ref);
    });
    batch.delete(eventRef);
    await batch.commit();

    return res.status(200).json({
      success: true,
      message: 'Event and associated registrations deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting event:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error deleting event'
    });
  }
});

// @route   GET /api/events/:eventId/my-registration
// @desc    Check if current student is registered for this event
// @access  Private
router.get('/:eventId/my-registration', requireAuth, async (req, res) => {
  try {
    const { eventId } = req.params;
    const regRef = db.collection('events').doc(eventId).collection('registrations').doc(req.user.uid);
    const regDoc = await regRef.get();

    if (!regDoc.exists) {
      return res.status(200).json({
        success: true,
        isRegistered: false,
        registration: null
      });
    }

    return res.status(200).json({
      success: true,
      isRegistered: true,
      registration: regDoc.data()
    });
  } catch (error) {
    console.error('Error checking registration status:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error checking registration status'
    });
  }
});

// @route   POST /api/events/:eventId/register
// @desc    Register authenticated student for an event (Concurrency-safe Firestore transaction)
// @access  Private (Authenticated)
router.post('/:eventId/register', requireAuth, async (req, res) => {
  try {
    const { eventId } = req.params;
    const uid = req.user.uid;

    const eventRef = db.collection('events').doc(eventId);
    const regRef = eventRef.collection('registrations').doc(uid);
    const userRef = db.collection('users').doc(uid);

    let transactionResult;

    try {
      transactionResult = await db.runTransaction(async (t) => {
        const [eventDoc, regDoc, userDoc] = await Promise.all([
          t.get(eventRef),
          t.get(regRef),
          t.get(userRef)
        ]);

        if (!eventDoc.exists) {
          throw { statusCode: 404, message: 'Event not found' };
        }

        const eventData = eventDoc.data();

        if (eventData.status !== 'PUBLISHED') {
          throw { statusCode: 400, message: 'Registration is not available for this event' };
        }

        if (eventData.registrationStatus === 'CLOSED') {
          throw { statusCode: 400, message: 'Registration for this event is currently closed' };
        }

        if (eventData.registrationDeadline) {
          const deadline = new Date(eventData.registrationDeadline);
          if (!isNaN(deadline.getTime()) && deadline < new Date()) {
            throw { statusCode: 400, message: 'Registration deadline has passed' };
          }
        }

        // Duplicate prevention inside transaction
        if (regDoc.exists) {
          throw {
            statusCode: 409,
            message: 'You are already registered for this event',
            registrationId: regDoc.data().registrationId
          };
        }

        // Capacity check
        const capacity = Number(eventData.capacity || eventData.maximumParticipants || 0);
        const currentCount = Number(eventData.registrationCount || 0);
        if (capacity > 0 && currentCount >= capacity) {
          throw { statusCode: 400, message: 'This event has reached maximum participant capacity' };
        }

        const userData = userDoc.exists ? userDoc.data() : {};
        const readableRegId = generateRegistrationId();

        const registrationData = {
          id: readableRegId,
          registrationId: readableRegId,
          userId: uid,
          eventId,
          eventTitle: eventData.title || eventData.name || 'STC Event',
          studentName: userData.displayName || req.user.name || req.body.studentName || 'Student',
          email: userData.email || req.user.email || req.body.email || '',
          rollNumber: userData.rollNumber || req.body.rollNumber || null,
          department: userData.department || req.body.department || null,
          year: userData.year || req.body.year || null,
          status: 'CONFIRMED',
          registeredAt: new Date().toISOString(),
          createdAt: new Date()
        };

        // Atomically write registration and increment registrationCount
        t.set(regRef, registrationData);
        t.update(eventRef, {
          registrationCount: currentCount + 1,
          updatedAt: new Date().toISOString()
        });

        return {
          registration: registrationData,
          event: eventData,
          user: userData
        };
      });
    } catch (txErr) {
      if (txErr.statusCode) {
        return res.status(txErr.statusCode).json({
          success: false,
          message: txErr.message,
          registrationId: txErr.registrationId || null
        });
      }
      throw txErr;
    }

    const { registration, event, user } = transactionResult;

    // Asynchronously trigger confirmation email outside of the transaction
    emailService.sendEventRegistrationEmail(
      {
        uid,
        displayName: registration.studentName,
        email: registration.email,
      },
      {
        id: eventId,
        name: event.title || event.name || 'STC Event',
        date: event.date || event.startDate || 'TBA',
        time: event.time || 'TBA',
        venue: event.location || event.venue || 'TBA',
        url: event.registrationUrl || '',
      },
      registration.registrationId
    ).catch(emailErr => {
      console.error('Non-fatal event registration email failure:', emailErr.message);
    });

    return res.status(201).json({
      success: true,
      message: 'Successfully registered for event',
      registration
    });

  } catch (error) {
    console.error('Error during event registration:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error completing registration'
    });
  }
});

export default router;
