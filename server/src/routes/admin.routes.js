import express from 'express';
import { db } from '../config/firebase.js';
import { requireAuth, requireRole } from '../middleware/auth.js';

const router = express.Router();

// @route   GET /api/admin/registrations
// @desc    Get all registrations across events with filters
// @access  Private (Admin / Lead)
router.get('/registrations', requireAuth, requireRole(['admin', 'lead']), async (req, res) => {
  try {
    const { eventId, department, year, status, search } = req.query;

    let snapshot;
    if (eventId && eventId !== 'ALL') {
      // Query specific event subcollection
      snapshot = await db.collection('events').doc(eventId).collection('registrations').get();
    } else {
      // Query collectionGroup across all events
      snapshot = await db.collectionGroup('registrations').get();
    }

    let registrations = [];
    snapshot.forEach(doc => {
      registrations.push({
        id: doc.id,
        ...doc.data()
      });
    });

    // Apply filters
    if (department && department !== 'ALL') {
      registrations = registrations.filter(r => r.department === department);
    }
    if (year && year !== 'ALL') {
      registrations = registrations.filter(r => String(r.year) === String(year));
    }
    if (status && status !== 'ALL') {
      registrations = registrations.filter(r => r.status === status);
    }
    if (search && search.trim()) {
      const q = search.toLowerCase();
      registrations = registrations.filter(r => 
        (r.studentName || '').toLowerCase().includes(q) ||
        (r.email || '').toLowerCase().includes(q) ||
        (r.rollNumber || '').toLowerCase().includes(q) ||
        (r.eventTitle || '').toLowerCase().includes(q)
      );
    }

    // Sort by registeredAt descending
    registrations.sort((a, b) => new Date(b.registeredAt || 0) - new Date(a.registeredAt || 0));

    return res.status(200).json({
      success: true,
      count: registrations.length,
      registrations
    });
  } catch (error) {
    console.error('Error fetching admin registrations:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error fetching registrations'
    });
  }
});

// @route   PATCH /api/admin/registrations/:id/status
// @desc    Update registration status by registration ID or UID
// @access  Private (Admin / Lead)
router.patch('/registrations/:id/status', requireAuth, requireRole(['admin', 'lead']), async (req, res) => {
  try {
    const { id } = req.params;
    const { status, eventId } = req.body;

    if (!['CONFIRMED', 'WAITLIST', 'CANCELLED'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status. Allowed values: CONFIRMED, WAITLIST, CANCELLED'
      });
    }

    let regRef;
    if (eventId) {
      regRef = db.collection('events').doc(eventId).collection('registrations').doc(id);
      const doc = await regRef.get();
      if (!doc.exists) {
        // Try looking up by 'id' field in this event
        const q = await db.collection('events').doc(eventId).collection('registrations').where('id', '==', id).limit(1).get();
        if (!q.empty) regRef = q.docs[0].ref;
        else return res.status(404).json({ success: false, message: 'Registration not found' });
      }
    } else {
      // Look up globally in collectionGroup
      const q = await db.collectionGroup('registrations').where('id', '==', id).limit(1).get();
      if (q.empty) {
        // Try looking up by document ID directly
        const q2 = await db.collectionGroup('registrations').where('userId', '==', id).limit(1).get();
        if (q2.empty) return res.status(404).json({ success: false, message: 'Registration not found' });
        regRef = q2.docs[0].ref;
      } else {
        regRef = q.docs[0].ref;
      }
    }

    await regRef.update({
      status,
      updatedAt: new Date().toISOString()
    });

    return res.status(200).json({
      success: true,
      message: `Registration status updated to ${status}`,
      status
    });
  } catch (error) {
    console.error('Error updating registration status:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error updating registration'
    });
  }
});

// @route   DELETE /api/admin/registrations/:id
// @desc    Delete registration by registration ID
// @access  Private (Admin only)
router.delete('/registrations/:id', requireAuth, requireRole(['admin']), async (req, res) => {
  try {
    const { id } = req.params;
    const eventId = req.query.eventId || req.body?.eventId;

    let regRef;
    let targetEventRef;

    if (eventId) {
      targetEventRef = db.collection('events').doc(eventId);
      regRef = targetEventRef.collection('registrations').doc(id);
      const doc = await regRef.get();
      if (!doc.exists) {
        const q = await targetEventRef.collection('registrations').where('id', '==', id).limit(1).get();
        if (!q.empty) regRef = q.docs[0].ref;
        else return res.status(404).json({ success: false, message: 'Registration not found' });
      }
    } else {
      const q = await db.collectionGroup('registrations').where('id', '==', id).limit(1).get();
      if (q.empty) {
        const q2 = await db.collectionGroup('registrations').where('userId', '==', id).limit(1).get();
        if (q2.empty) return res.status(404).json({ success: false, message: 'Registration not found' });
        regRef = q2.docs[0].ref;
      } else {
        regRef = q.docs[0].ref;
      }
      targetEventRef = regRef.parent.parent;
    }

    await db.runTransaction(async (t) => {
      const regDoc = await t.get(regRef);
      if (!regDoc.exists) throw { statusCode: 404, message: 'Registration not found' };

      t.delete(regRef);

      if (targetEventRef) {
        const eventDoc = await t.get(targetEventRef);
        if (eventDoc.exists) {
          const currentCount = Number(eventDoc.data().registrationCount || 1);
          t.update(targetEventRef, {
            registrationCount: Math.max(0, currentCount - 1),
            updatedAt: new Date().toISOString()
          });
        }
      }
    });

    return res.status(200).json({
      success: true,
      message: 'Registration deleted successfully'
    });
  } catch (error) {
    if (error.statusCode) return res.status(error.statusCode).json({ success: false, message: error.message });
    console.error('Error deleting registration:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error deleting registration'
    });
  }
});

// @route   GET /api/admin/members
// @desc    Get registered community members from users collection
// @access  Private (Admin / Lead)
router.get('/members', requireAuth, requireRole(['admin', 'lead']), async (req, res) => {
  try {
    const { search, department, year, status } = req.query;

    const usersSnapshot = await db.collection('users').get();
    let members = [];

    usersSnapshot.forEach(doc => {
      const data = doc.data();
      members.push({
        id: doc.id,
        uid: doc.id,
        name: data.displayName || 'Anonymous Student',
        email: data.email || '',
        rollNumber: data.rollNumber || null,
        department: data.department || 'OTHER',
        year: data.year || '1',
        role: data.role || 'student',
        status: data.status || 'ACTIVE',
        profileCompleted: data.profileCompleted || false,
        joinedAt: data.createdAt ? (data.createdAt.toDate ? data.createdAt.toDate().toISOString() : data.createdAt) : new Date().toISOString()
      });
    });

    if (department && department !== 'ALL') {
      members = members.filter(m => m.department === department);
    }
    if (year && year !== 'ALL') {
      members = members.filter(m => String(m.year) === String(year));
    }
    if (status && status !== 'ALL') {
      members = members.filter(m => m.status === status);
    }
    if (search && search.trim()) {
      const q = search.toLowerCase();
      members = members.filter(m =>
        (m.name || '').toLowerCase().includes(q) ||
        (m.email || '').toLowerCase().includes(q) ||
        (m.rollNumber || '').toLowerCase().includes(q)
      );
    }

    return res.status(200).json({
      success: true,
      count: members.length,
      members
    });
  } catch (error) {
    console.error('Error fetching members:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error fetching community members'
    });
  }
});

// @route   GET /api/admin/stats
// @desc    Compute real overview statistics dynamically from Firestore
// @access  Private (Admin / Lead)
router.get('/stats', requireAuth, requireRole(['admin', 'lead']), async (req, res) => {
  try {
    const [usersSnap, eventsSnap, registrationsSnap] = await Promise.all([
      db.collection('users').get(),
      db.collection('events').get(),
      db.collectionGroup('registrations').get()
    ]);

    const totalMembers = usersSnap.size;

    let stcEventsCount = 0;
    let internalHackathonsCount = 0;
    let externalHackathonsCount = 0;

    eventsSnap.forEach(doc => {
      const type = doc.data().type;
      if (type === 'STC_EVENT' || !type) stcEventsCount++;
      else if (type === 'INTERNAL_HACKATHON') internalHackathonsCount++;
      else if (type === 'EXTERNAL_HACKATHON') externalHackathonsCount++;
    });

    // Compute department stats
    const deptMap = {
      CSE: 0,
      ECE: 0,
      EEE: 0,
      MECH: 0,
      CIVIL: 0,
      IT: 0,
      AIDS: 0,
      AIML: 0,
      OTHER: 0
    };

    const yearMap = {
      '1': 0,
      '2': 0,
      '3': 0,
      '4': 0
    };

    usersSnap.forEach(doc => {
      const data = doc.data();
      const d = data.department || 'OTHER';
      deptMap[d] = (deptMap[d] || 0) + 1;

      const y = String(data.year || '1');
      if (yearMap[y] !== undefined) {
        yearMap[y] = (yearMap[y] || 0) + 1;
      }
    });

    let departmentStats = Object.entries(deptMap)
      .filter(([_, count]) => count > 0)
      .map(([department, count]) => ({
        department,
        count,
        percentage: totalMembers > 0 ? Math.round((count / totalMembers) * 1000) / 10 : 0
      }))
      .sort((a, b) => b.count - a.count);

    if (departmentStats.length === 0 && totalMembers > 0) {
      departmentStats = [{
        department: 'COMMUNITY',
        count: totalMembers,
        percentage: 100
      }];
    }

    const yearLabels = {
      '1': '1st Year',
      '2': '2nd Year',
      '3': '3rd Year',
      '4': '4th Year'
    };

    let yearStats = Object.entries(yearMap)
      .filter(([_, count]) => count > 0)
      .map(([yearCode, count]) => ({
        yearCode,
        year: yearLabels[yearCode] || `${yearCode}th Year`,
        count,
        percentage: totalMembers > 0 ? Math.round((count / totalMembers) * 1000) / 10 : 0
      }));

    if (yearStats.length === 0 && totalMembers > 0) {
      yearStats = [{
        yearCode: 'ALL',
        year: 'All Years',
        count: totalMembers,
        percentage: 100
      }];
    }

    // Recent registrations
    let registrations = [];
    registrationsSnap.forEach(doc => {
      const d = doc.data();
      registrations.push({
        id: doc.id,
        ...d,
        studentName: d.studentName || d.userName || 'Student',
        email: d.email || d.userEmail || '',
        eventTitle: d.eventTitle || d.eventName || 'Event',
        registeredAt: d.registeredAt ? (d.registeredAt.toDate ? d.registeredAt.toDate().toISOString() : d.registeredAt) : new Date().toISOString()
      });
    });
    registrations.sort((a, b) => new Date(b.registeredAt || 0) - new Date(a.registeredAt || 0));
    const recentRegistrations = registrations.slice(0, 5);

    return res.status(200).json({
      success: true,
      stats: {
        totalMembers,
        stcEventsCount,
        internalHackathonsCount,
        externalHackathonsCount,
        departmentStats,
        yearStats,
        recentRegistrations,
        totalRegistrations: registrations.length
      }
    });
  } catch (error) {
    console.error('Error computing admin statistics:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error computing statistics'
    });
  }
});

export default router;
